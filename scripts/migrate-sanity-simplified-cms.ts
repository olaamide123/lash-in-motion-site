import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("SANITY_API_WRITE_TOKEN is required to migrate Sanity content.");
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1cee5byk";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-22";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

type RecordValue = Record<string, unknown>;

function isRecord(value: unknown): value is RecordValue {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeVideoObject(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeVideoObject);
  }

  if (!isRecord(value)) {
    return value;
  }

  const next: RecordValue = {};

  for (const [key, child] of Object.entries(value)) {
    if (key === "videoFile") continue;
    next[key] = normalizeVideoObject(child);
  }

  if (typeof value.videoUrl === "string" && typeof next.videoUrlOrPath !== "string") {
    next.videoUrlOrPath = value.videoUrl;
  }

  if (!("video" in next) && value.videoFile) {
    next.video = normalizeVideoObject(value.videoFile);
  }

  return next;
}

function sameJson(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

async function migrateHomepage() {
  const homepage = await client.fetch<{
    _id: string;
    mainReel?: RecordValue;
    whatMovesItems?: Array<{ label?: string; title?: string; body?: string }>;
    serviceTracks?: Array<{ label?: string; title?: string; description?: string }>;
  } | null>(`*[_type == "homepage" && _id == "homepage"][0]{
    _id,
    mainReel,
    whatMovesItems,
    serviceTracks[]->{
      label,
      title,
      description
    }
  }`);

  if (!homepage?._id) return;

  const patch: RecordValue = {};
  const normalizedMainReel = normalizeVideoObject(homepage.mainReel);

  if (!sameJson(normalizedMainReel, homepage.mainReel)) {
    patch.mainReel = normalizedMainReel;
  }

  if ((!homepage.whatMovesItems || homepage.whatMovesItems.length === 0) && homepage.serviceTracks?.length) {
    patch.whatMovesItems = homepage.serviceTracks.map((item) => ({
      label: item.label,
      title: item.title || "Track",
      body: item.description
    }));
  }

  if (Object.keys(patch).length === 0) return;

  await client.patch(homepage._id).set(patch).commit();
  console.log(`Migrated homepage (${Object.keys(patch).join(", ")})`);
}

async function migrateCaseStudies() {
  const studies = await client.fetch<
    Array<{
      _id: string;
      heroVideo?: RecordValue;
      relatedVideos?: Array<RecordValue>;
    }>
  >(`*[_type == "caseStudy"]{
    _id,
    heroVideo,
    relatedVideos
  }`);

  for (const study of studies) {
    const patch: RecordValue = {};
    const normalizedHeroVideo = normalizeVideoObject(study.heroVideo);
    const normalizedRelatedVideos = normalizeVideoObject(study.relatedVideos);

    if (!sameJson(normalizedHeroVideo, study.heroVideo)) {
      patch.heroVideo = normalizedHeroVideo;
    }

    if (!sameJson(normalizedRelatedVideos, study.relatedVideos)) {
      patch.relatedVideos = normalizedRelatedVideos;
    }

    if (Object.keys(patch).length === 0) continue;

    await client.patch(study._id).set(patch).commit();
    console.log(`Migrated caseStudy ${study._id} (${Object.keys(patch).join(", ")})`);
  }
}

async function migrateMotionPieces() {
  const pieces = await client.fetch<
    Array<{
      _id: string;
      video?: RecordValue;
      videoFile?: RecordValue;
    }>
  >(`*[_type == "motionPiece"]{
    _id,
    video,
    videoFile
  }`);

  for (const piece of pieces) {
    const patch: RecordValue = {};
    const legacyVideo = piece.video || piece.videoFile;
    const normalizedVideo = normalizeVideoObject(legacyVideo);

    if (!sameJson(normalizedVideo, piece.video)) {
      patch.video = normalizedVideo;
    }

    if (Object.keys(patch).length === 0) continue;

    await client.patch(piece._id).set(patch).commit();
    console.log(`Migrated motionPiece ${piece._id} (${Object.keys(patch).join(", ")})`);
  }
}

async function run() {
  await migrateHomepage();
  await migrateCaseStudies();
  await migrateMotionPieces();
  console.log("Sanity CMS migration complete.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
