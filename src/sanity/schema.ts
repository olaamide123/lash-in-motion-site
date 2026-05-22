import { defineArrayMember, defineField, defineType } from "sanity";

const linkItem = defineType({
  name: "linkItem",
  title: "Link Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Use internal paths like /work or full URLs for external links.",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "newTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href"
    }
  }
});

const ctaItem = defineType({
  name: "ctaItem",
  title: "CTA",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button text",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Leave empty if this CTA should trigger the reel lightbox instead of navigation."
    }),
    defineField({
      name: "action",
      title: "Action type",
      type: "string",
      initialValue: "link",
      options: {
        list: [
          { title: "Link", value: "link" },
          { title: "Open reel", value: "reel" }
        ],
        layout: "radio"
      }
    })
  ]
});

const imageAssetValue = defineType({
  name: "imageAssetValue",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Upload image",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "src",
      title: "Fallback or external image URL",
      type: "url",
      description: "Useful for local assets during migration or externally hosted media."
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string"
    })
  ],
  preview: {
    select: {
      title: "alt",
      media: "image"
    },
    prepare({ title, media }) {
      return {
        title: title || "Image",
        media
      };
    }
  }
});

const videoAssetValue = defineType({
  name: "videoAssetValue",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string"
    }),
    defineField({
      name: "videoFile",
      title: "Upload video file",
      type: "file",
      options: {
        accept: "video/*"
      }
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Use for local migrated assets or externally hosted MP4 links."
    }),
    defineField({
      name: "embedUrl",
      title: "Embed URL",
      type: "url",
      description: "Use for Vimeo or other embed-only pieces."
    }),
    defineField({
      name: "poster",
      title: "Poster image",
      type: "imageAssetValue"
    }),
    defineField({
      name: "fit",
      title: "Display fit",
      type: "string",
      initialValue: "contain",
      options: {
        list: [
          { title: "Contain", value: "contain" },
          { title: "Cover", value: "cover" },
          { title: "Embed", value: "embed" }
        ],
        layout: "radio"
      }
    }),
    defineField({
      name: "meta",
      title: "Meta label",
      type: "string",
      description: "Small label shown beside the video frame, like Campaign Film or Chicago."
    }),
    defineField({
      name: "label",
      title: "Inline label",
      type: "string",
      description: "Optional small label shown over the video frame."
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "videoUrl"
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Video",
        subtitle
      };
    }
  }
});

const overviewHighlight = defineType({
  name: "overviewHighlight",
  title: "Overview Highlight",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "tone",
      title: "Accent tone",
      type: "string",
      initialValue: "default",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Blue", value: "blue" },
          { title: "Yellow", value: "yellow" }
        ]
      }
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required()
    })
  ]
});

const relatedVideo = defineType({
  name: "relatedVideo",
  title: "Related Video",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Optional supporting label. Leave blank if the interface should stay minimal."
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }]
    }),
    defineField({
      name: "media",
      title: "Media",
      type: "videoAssetValue",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "sectionPlacement",
      title: "Place after section",
      type: "string",
      initialValue: "execution",
      description: "Used to drop supporting videos under the part of the case study that talks about them.",
      options: {
        list: [
          { title: "Overview", value: "overview" },
          { title: "Challenge", value: "challenge" },
          { title: "Approach", value: "approach" },
          { title: "Execution", value: "execution" },
          { title: "Outcome", value: "outcome" }
        ]
      }
    }),
    defineField({
      name: "afterParagraph",
      title: "Insert after paragraph number",
      type: "number",
      description: "Starts at 0. Leave blank to place it after the full section."
    })
  ]
});

const motionGroup = defineType({
  name: "motionGroup",
  title: "Motion Group",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      description: "Stable grouping key used by motion pieces, e.g. campaign-advocacy.",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "body",
      title: "Supporting copy",
      type: "text",
      rows: 3
    })
  ]
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" }
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      group: "brand",
      description: "Used for the browser title and general site labeling.",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "logoText",
      title: "Logo text",
      type: "string",
      group: "brand",
      description: "The text shown beside the round logo mark.",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "roundLogo",
      title: "Round logo mark",
      type: "imageAssetValue",
      group: "brand"
    }),
    defineField({
      name: "mainNavigation",
      title: "Main navigation",
      type: "array",
      of: [defineArrayMember({ type: "linkItem" })],
      group: "navigation",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "primaryCTA",
      title: "Primary CTA",
      type: "ctaItem",
      group: "navigation"
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "string",
      group: "footer"
    }),
    defineField({
      name: "footerCopyright",
      title: "Footer copyright line",
      type: "string",
      group: "footer"
    }),
    defineField({
      name: "footerWorthMakingList",
      title: "Footer WORTH MAKING list",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "footer",
      description: "Plain list items, not links."
    }),
    defineField({
      name: "footerExploreLinks",
      title: "Footer navigation links",
      type: "array",
      of: [defineArrayMember({ type: "linkItem" })],
      group: "footer"
    }),
    defineField({
      name: "footerContactEmail",
      title: "Footer contact email",
      type: "string",
      group: "footer"
    }),
    defineField({
      name: "footerContactHelperText",
      title: "Footer contact helper text",
      type: "string",
      group: "footer"
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "linkItem" })],
      group: "footer"
    })
  ]
});

const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroLabel", title: "Hero label", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "text", rows: 2 }),
    defineField({ name: "heroAccentWord", title: "Hero accent word", type: "string" }),
    defineField({ name: "heroBody", title: "Hero body", type: "text", rows: 4 }),
    defineField({ name: "heroPrimaryCTA", title: "Hero primary CTA", type: "ctaItem" }),
    defineField({ name: "mainReel", title: "Main reel", type: "videoAssetValue" }),
    defineField({ name: "mainReelButtonText", title: "Main reel button text", type: "string" }),
    defineField({ name: "selectedWorkLabel", title: "Selected work label", type: "string" }),
    defineField({ name: "selectedWorkTitle", title: "Selected work title", type: "string" }),
    defineField({ name: "selectedWorkSubtitle", title: "Selected work subtitle", type: "string" }),
    defineField({ name: "selectedWorkIntro", title: "Selected work intro", type: "text", rows: 4 }),
    defineField({
      name: "selectedCaseStudies",
      title: "Selected case studies",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "caseStudy" }] })],
      description: "These populate the homepage case study area."
    }),
    defineField({
      name: "selectedMotionPieces",
      title: "Selected motion pieces",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "motionPiece" }] })],
      description: "These populate the homepage shorter work area."
    }),
    defineField({ name: "whyThisExistsLabel", title: "Why This Exists label", type: "string" }),
    defineField({ name: "whyThisExistsTitle", title: "Why This Exists title", type: "string" }),
    defineField({
      name: "whyThisExistsBody",
      title: "Why This Exists body",
      type: "array",
      of: [{ type: "block" }]
    }),
    defineField({ name: "whatMovesLabel", title: "What Moves Here label", type: "string" }),
    defineField({ name: "whatMovesTitle", title: "What Moves Here title", type: "string" }),
    defineField({ name: "whatMovesIntro", title: "What Moves Here intro", type: "text", rows: 3 }),
    defineField({
      name: "serviceTracks",
      title: "Service tracks",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "serviceTrack" }] })]
    }),
    defineField({ name: "finalCTATitle", title: "Final CTA title", type: "string" }),
    defineField({ name: "finalCTABody", title: "Final CTA body", type: "text", rows: 3 }),
    defineField({ name: "finalCTAButtonText", title: "Final CTA button text", type: "string" })
  ]
});

const workPage = defineType({
  name: "workPage",
  title: "Work Page",
  type: "document",
  fields: [
    defineField({ name: "pageLabel", title: "Page label", type: "string" }),
    defineField({ name: "pageTitle", title: "Page title", type: "string" }),
    defineField({ name: "introCopy", title: "Intro copy", type: "text", rows: 4 }),
    defineField({ name: "caseStudiesSectionTitle", title: "Case studies section title", type: "string" }),
    defineField({ name: "caseStudiesSectionSubtitle", title: "Case studies section subtitle", type: "text", rows: 3 }),
    defineField({ name: "motionSectionTitle", title: "Motion section title", type: "string" }),
    defineField({ name: "motionSectionSubtitle", title: "Motion section subtitle", type: "text", rows: 3 }),
    defineField({
      name: "motionGroups",
      title: "Motion groups",
      type: "array",
      of: [defineArrayMember({ type: "motionGroup" })],
      description: "These headings control the grouped shorter work sections."
    }),
    defineField({
      name: "featuredCaseStudies",
      title: "Featured case studies",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "caseStudy" }] })]
    }),
    defineField({
      name: "featuredMotionPieces",
      title: "Featured motion pieces",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "motionPiece" }] })]
    })
  ]
});

const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({
      name: "role",
      title: "Role",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({ name: "heroVideo", title: "Hero video", type: "videoAssetValue" }),
    defineField({ name: "heroImage", title: "Hero image", type: "imageAssetValue" }),
    defineField({ name: "overview", title: "Overview", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "overviewHighlights",
      title: "Overview highlights",
      type: "array",
      of: [defineArrayMember({ type: "overviewHighlight" })],
      description: "Optional small overview rows like Focus or Emphasis."
    }),
    defineField({ name: "challenge", title: "Challenge", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "approach", title: "Approach", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "execution", title: "Execution", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "outcome", title: "Outcome", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "whatToNotice", title: "What to notice", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "relatedVideos",
      title: "Related videos",
      type: "array",
      of: [defineArrayMember({ type: "relatedVideo" })],
      description: "Use this for supporting clips that should appear lower on the page instead of in the hero."
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category"
    }
  }
});

const motionPiece = defineType({
  name: "motionPiece",
  title: "Motion Piece",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "videoFile", title: "Video", type: "videoAssetValue" }),
    defineField({ name: "videoUrl", title: "Direct video URL", type: "url" }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "imageAssetValue" }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "showOnHomepage", title: "Show on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({
      name: "groupKey",
      title: "Work page group",
      type: "string",
      description: "Match one of the motion group keys on the Work page, such as campaign-advocacy."
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category"
    }
  }
});

const contextPage = defineType({
  name: "contextPage",
  title: "Context Page",
  type: "document",
  fields: [
    defineField({ name: "pageLabel", title: "Page label", type: "string" }),
    defineField({ name: "pageTitle", title: "Page title", type: "string" }),
    defineField({ name: "portraitImage", title: "Portrait image", type: "imageAssetValue" }),
    defineField({ name: "personHeading", title: "Person heading", type: "string" }),
    defineField({ name: "personBody", title: "Person body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "whyHeading", title: "Why heading", type: "string" }),
    defineField({ name: "whyBody", title: "Why body", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "whyRows",
      title: "Why rows",
      type: "array",
      of: [defineArrayMember({ type: "overviewHighlight" })]
    })
  ]
});

const makeSomethingPage = defineType({
  name: "makeSomethingPage",
  title: "Make Something Page",
  type: "document",
  fields: [
    defineField({ name: "pageLabel", title: "Page label", type: "string" }),
    defineField({ name: "pageTitle", title: "Page title", type: "string" }),
    defineField({ name: "introCopy", title: "Intro copy", type: "text", rows: 3 }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "emailHelperText", title: "Email helper text", type: "string" }),
    defineField({ name: "formIntro", title: "Form intro", type: "text", rows: 4 }),
    defineField({ name: "inquiryLabel", title: "Inquiry label", type: "string" }),
    defineField({ name: "inquiryTitle", title: "Inquiry title", type: "string" }),
    defineField({ name: "bestForBody", title: "Best for copy", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "contactBody", title: "Contact helper copy", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "projectTypes",
      title: "Project types",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "budgetRanges",
      title: "Budget ranges",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "timelineOptions",
      title: "Timeline options",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({ name: "formButtonText", title: "Form button text", type: "string" })
  ]
});

const serviceTrack = defineType({
  name: "serviceTrack",
  title: "Service Track",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "accentColor",
      title: "Accent color",
      type: "string",
      options: {
        list: [
          { title: "Red", value: "red" },
          { title: "Blue", value: "blue" },
          { title: "Yellow", value: "yellow" }
        ]
      }
    }),
    defineField({ name: "order", title: "Order", type: "number" })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "label"
    }
  }
});

export const schemaTypes = [
  linkItem,
  ctaItem,
  imageAssetValue,
  videoAssetValue,
  overviewHighlight,
  relatedVideo,
  motionGroup,
  siteSettings,
  homepage,
  workPage,
  caseStudy,
  motionPiece,
  contextPage,
  makeSomethingPage,
  serviceTrack
];
