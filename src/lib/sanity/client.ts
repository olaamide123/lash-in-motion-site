import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1cee5byk";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-22";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true
});

export const imageBuilder = imageUrlBuilder(sanityClient);

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion
};
