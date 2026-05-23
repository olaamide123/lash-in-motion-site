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

function normalizeVideoLeaf(value: unknown): RecordValue | undefined {
  if (!isRecord(value)) return undefined;

  const next: RecordValue = {};

  for (const [key, child] of Object.entries(value)) {
    if (key === "videoFile" || key === "videoUrlOrPath") continue;
    next[key] = child;
  }

  const nestedVideoFile = isRecord(value.videoFile) ? value.videoFile : undefined;
  const finalVideoUrl =
    (typeof value.videoUrl === "string" && value.videoUrl) ||
    (typeof value.videoUrlOrPath === "string" && value.videoUrlOrPath) ||
    (nestedVideoFile && typeof nestedVideoFile.videoUrl === "string" ? nestedVideoFile.videoUrl : undefined) ||
    (nestedVideoFile && typeof nestedVideoFile.videoUrlOrPath === "string" ? nestedVideoFile.videoUrlOrPath : undefined);

  if (finalVideoUrl && typeof next.videoUrl !== "string") {
    next.videoUrl = finalVideoUrl;
  }

  if (nestedVideoFile) {
    for (const [key, child] of Object.entries(nestedVideoFile)) {
      if ((key === "videoUrl" || key === "videoUrlOrPath") && typeof next.videoUrl !== "string") {
        next.videoUrl = child;
        continue;
      }

      if (!(key in next)) {
        next[key] = child;
      }
    }
  }

  return next;
}

function normalizeRelatedVideos(value: unknown): unknown {
  if (!Array.isArray(value)) return value;

  return value.map((item) => {
    if (!isRecord(item)) return item;
    const next = { ...item };
    if (next.media) {
      const normalizedMedia = normalizeVideoLeaf(next.media);
      if (normalizedMedia) {
        next.media = normalizedMedia;
      }
    }
    return next;
  });
}

function hasAnyKey(value: RecordValue | undefined, keys: string[]) {
  if (!value) return false;
  return keys.some((key) => key in value);
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
  const unsetPaths: string[] = [];
  const normalizedMainReel = normalizeVideoLeaf(homepage.mainReel);

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

  if (homepage.serviceTracks && homepage.serviceTracks.length > 0) {
    unsetPaths.push("serviceTracks");
  }

  if (hasAnyKey(homepage.mainReel, ["videoUrlOrPath", "videoFile"])) {
    unsetPaths.push("mainReel.videoUrlOrPath", "mainReel.videoFile");
  }

  if (Object.keys(patch).length === 0 && unsetPaths.length === 0) return;

  let mutation = client.patch(homepage._id);
  if (Object.keys(patch).length > 0) {
    mutation = mutation.set(patch);
  }
  if (unsetPaths.length > 0) {
    mutation = mutation.unset(unsetPaths);
  }

  await mutation.commit();
  console.log(
    `Migrated homepage (${[...Object.keys(patch), ...(unsetPaths.length ? [`unset ${unsetPaths.join(", ")}`] : [])].join(", ")})`
  );
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
    const unsetPaths: string[] = [];
    const normalizedHeroVideo = normalizeVideoLeaf(study.heroVideo);
    const normalizedRelatedVideos = normalizeRelatedVideos(study.relatedVideos);

    if (!sameJson(normalizedHeroVideo, study.heroVideo)) {
      patch.heroVideo = normalizedHeroVideo;
    }

    if (!sameJson(normalizedRelatedVideos, study.relatedVideos)) {
      patch.relatedVideos = normalizedRelatedVideos;
    }

    if (hasAnyKey(study.heroVideo, ["videoUrlOrPath", "videoFile"])) {
      unsetPaths.push("heroVideo.videoUrlOrPath", "heroVideo.videoFile");
    }

    study.relatedVideos?.forEach((item, index) => {
      const media = isRecord(item.media) ? item.media : undefined;
      if (hasAnyKey(media, ["videoUrlOrPath", "videoFile"])) {
        unsetPaths.push(`relatedVideos[${index}].media.videoUrlOrPath`, `relatedVideos[${index}].media.videoFile`);
      }
    });

    if (Object.keys(patch).length === 0 && unsetPaths.length === 0) continue;

    let mutation = client.patch(study._id);
    if (Object.keys(patch).length > 0) {
      mutation = mutation.set(patch);
    }
    if (unsetPaths.length > 0) {
      mutation = mutation.unset(unsetPaths);
    }

    await mutation.commit();
    console.log(
      `Migrated caseStudy ${study._id} (${[...Object.keys(patch), ...(unsetPaths.length ? [`unset ${unsetPaths.join(", ")}`] : [])].join(", ")})`
    );
  }
}

async function migrateMotionPieces() {
  const pieces = await client.fetch<
    Array<{
      _id: string;
      video?: RecordValue;
      videoFile?: RecordValue;
      videoUrl?: string;
      resolvedVideoUrl?: string;
    }>
  >(`*[_type == "motionPiece"]{
    _id,
    video,
    videoFile,
    videoUrl,
    resolvedVideoUrl
  }`);

  for (const piece of pieces) {
    const patch: RecordValue = {};
    const legacyVideo =
      piece.video ||
      piece.videoFile ||
      (piece.videoUrl || piece.resolvedVideoUrl ? { videoUrl: piece.videoUrl || piece.resolvedVideoUrl } : undefined);
    const normalizedVideo = normalizeVideoLeaf(legacyVideo);

    if (!sameJson(normalizedVideo, piece.video)) {
      patch.video = normalizedVideo;
    }

    const shouldUnsetLegacy =
      !!normalizedVideo &&
      (piece.videoFile || piece.videoUrl || piece.resolvedVideoUrl || hasAnyKey(piece.video, ["videoUrlOrPath"]));

    if (Object.keys(patch).length === 0 && !shouldUnsetLegacy) continue;

    let mutation = client.patch(piece._id);
    if (Object.keys(patch).length > 0) {
      mutation = mutation.set(patch);
    }
    if (shouldUnsetLegacy) {
      mutation = mutation.unset(["videoFile", "videoUrl", "resolvedVideoUrl", "video.videoUrlOrPath", "video.videoFile"]);
    }

    await mutation.commit();
    console.log(`Migrated motionPiece ${piece._id} (${[...Object.keys(patch), ...(shouldUnsetLegacy ? ["unset legacy video fields"] : [])].join(", ")})`);
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
