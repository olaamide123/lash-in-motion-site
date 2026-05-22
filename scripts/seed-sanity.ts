import { createClient } from "@sanity/client";

import { seedContent } from "../src/lib/seed-data";

const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("SANITY_API_WRITE_TOKEN is required to seed Sanity.");
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

const ref = (_ref: string) => ({ _type: "reference", _ref });

function isEmpty(value: unknown) {
  if (value === undefined || value === null) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}

function buildPatchSet(existing: Record<string, unknown>, seed: Record<string, unknown>) {
  const patch: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(seed)) {
    if (key === "_id" || key === "_type" || key === "_rev") continue;
    if (isEmpty(existing[key]) && !isEmpty(value)) {
      patch[key] = value;
    }
  }

  return patch;
}

async function patchOrCreate(id: string, type: string, seed: Record<string, unknown>) {
  const existing = await client.getDocument(id);

  if (!existing) {
    await client.create({
      _id: id,
      _type: type,
      ...seed
    } as never);
    console.log(`Created ${type}: ${id}`);
    return;
  }

  const patchValues = buildPatchSet(existing as Record<string, unknown>, seed);
  if (Object.keys(patchValues).length === 0) {
    console.log(`Skipped ${type}: ${id} (no missing fields)`);
    return;
  }

  await client.patch(id).set(patchValues).commit();
  console.log(`Patched ${type}: ${id} (${Object.keys(patchValues).join(", ")})`);
}

async function patchWorkDocument(id: string, type: string, seed: Record<string, unknown>) {
  const existing = await client.getDocument(id);
  const patchValues = buildPatchSet((existing || {}) as Record<string, unknown>, seed);

  const referenceFields = ["selectedCaseStudies", "selectedMotionPieces", "serviceTracks", "featuredCaseStudies", "featuredMotionPieces"] as const;

  for (const field of referenceFields) {
    if (field in seed && isEmpty(existing?.[field])) {
      patchValues[field] = seed[field];
    }
  }

  if (!existing) {
    await client.create({ _id: id, _type: type, ...seed } as never);
    console.log(`Created ${type}: ${id}`);
    return;
  }

  if (Object.keys(patchValues).length === 0) {
    console.log(`Skipped ${type}: ${id} (no missing fields)`);
    return;
  }

  await client.patch(id).set(patchValues).commit();
  console.log(`Patched ${type}: ${id} (${Object.keys(patchValues).join(", ")})`);
}

const caseStudyDocs = seedContent.caseStudies.map((study) => {
  const { slug, ...rest } = study;
  return {
    ...rest,
    _id: study._id,
    _type: "caseStudy",
    slug: {
      _type: "slug",
      current: slug
    }
  };
});

const motionPieceDocs = seedContent.motionPieces.map((piece) => {
  const { slug, ...rest } = piece;
  return {
    ...rest,
    _id: piece._id,
    _type: "motionPiece",
    slug: {
      _type: "slug",
      current: slug
    }
  };
});

const serviceTrackDocs = seedContent.serviceTracks.map((track) => ({
  ...track,
  _type: "serviceTrack"
}));

const homepageDoc = {
  _id: "homepage",
  _type: "homepage",
  ...seedContent.homepage,
  selectedCaseStudies: seedContent.homepage.selectedCaseStudies
    .map((slug) => seedContent.caseStudies.find((item) => item.slug === slug))
    .filter(Boolean)
    .map((item) => ref(item!._id)),
  selectedMotionPieces: seedContent.homepage.selectedMotionPieces
    .map((slug) => seedContent.motionPieces.find((item) => item.slug === slug))
    .filter(Boolean)
    .map((item) => ref(item!._id)),
  serviceTracks: seedContent.homepage.serviceTracks.map((id) => ref(id))
};

const workPageDoc = {
  _id: "workPage",
  _type: "workPage",
  ...seedContent.workPage,
  featuredCaseStudies: seedContent.workPage.featuredCaseStudies
    .map((slug) => seedContent.caseStudies.find((item) => item.slug === slug))
    .filter(Boolean)
    .map((item) => ref(item!._id)),
  featuredMotionPieces: seedContent.workPage.featuredMotionPieces
    .map((slug) => seedContent.motionPieces.find((item) => item.slug === slug))
    .filter(Boolean)
    .map((item) => ref(item!._id))
};

async function run() {
  for (const track of serviceTrackDocs) {
    await patchOrCreate(track._id, "serviceTrack", track as Record<string, unknown>);
  }

  for (const study of caseStudyDocs) {
    await patchOrCreate(study._id, "caseStudy", study as Record<string, unknown>);
  }

  for (const piece of motionPieceDocs) {
    await patchOrCreate(piece._id, "motionPiece", piece as Record<string, unknown>);
  }

  await patchOrCreate("siteSettings", "siteSettings", seedContent.siteSettings as unknown as Record<string, unknown>);
  await patchOrCreate("contextPage", "contextPage", seedContent.contextPage as unknown as Record<string, unknown>);
  await patchOrCreate(
    "makeSomethingPage",
    "makeSomethingPage",
    seedContent.makeSomethingPage as unknown as Record<string, unknown>
  );
  await patchWorkDocument("homepage", "homepage", homepageDoc as unknown as Record<string, unknown>);
  await patchWorkDocument("workPage", "workPage", workPageDoc as unknown as Record<string, unknown>);

  console.log("Sanity seed complete (patch-only, existing content preserved).");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
