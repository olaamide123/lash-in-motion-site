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

const caseStudyDocs = seedContent.caseStudies.map((study) => ({
  ...study,
  _type: "caseStudy",
  slug: {
    _type: "slug",
    current: study.slug
  }
}));

const motionPieceDocs = seedContent.motionPieces.map((piece) => ({
  ...piece,
  _type: "motionPiece",
  slug: {
    _type: "slug",
    current: piece.slug
  }
}));

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

const docs: Array<Record<string, unknown>> = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    ...seedContent.siteSettings
  },
  {
    _id: "contextPage",
    _type: "contextPage",
    ...seedContent.contextPage
  },
  {
    _id: "makeSomethingPage",
    _type: "makeSomethingPage",
    ...seedContent.makeSomethingPage
  },
  ...serviceTrackDocs,
  ...caseStudyDocs,
  ...motionPieceDocs,
  homepageDoc,
  workPageDoc
];

async function run() {
  for (const doc of docs) {
    await client.createOrReplace(doc as never);
    console.log(`Seeded ${doc._type}: ${doc._id}`);
  }

  console.log("Sanity seed complete.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
