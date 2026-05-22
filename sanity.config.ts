import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schema";
import { studioStructure } from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: "Lash In Motion Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1cee5byk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool({ structure: studioStructure }),
    visionTool()
  ],
  schema: {
    types: schemaTypes
  }
});
