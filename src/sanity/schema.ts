import { defineArrayMember, defineField, defineType } from "sanity";

import { embedUrlValidation, mediaPathValidation, normalLinkValidation } from "./validation";

const themeColorOptions = [
  { title: "◻ Off White", value: "offWhite" },
  { title: "⬛ Black", value: "black" },
  { title: "◼ Muted Gray", value: "mutedGray" },
  { title: "🟥 Red", value: "red" },
  { title: "🟦 Blue", value: "blue" },
  { title: "🟨 Yellow", value: "yellow" },
  { title: "◾ Dark", value: "dark" },
  { title: "⬜ White", value: "white" }
];

function themeColorField(name: string, title: string, defaultColor: string, description?: string) {
  return defineField({
    name,
    title,
    type: "string",
    description: `${description ? `${description} ` : ""}Default: ${defaultColor}.`,
    options: {
      list: themeColorOptions,
      layout: "dropdown"
    }
  });
}

const portableTextBlock = defineArrayMember({
  type: "block",
  marks: {
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [
          defineField({
            name: "href",
            title: "URL",
            type: "url",
            validation: (rule) => rule.required()
          }),
          defineField({
            name: "blank",
            title: "Open in new tab",
            type: "boolean",
            initialValue: false
          })
        ]
      }
    ]
  }
});

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
      validation: (rule) => normalLinkValidation(rule.required())
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

const socialLinkItem = defineType({
  name: "socialLinkItem",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "iconLabel",
      title: "Icon label",
      type: "string",
      description: "Short label for screen readers or compact display, e.g. IG or Vimeo."
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      validation: (rule) => normalLinkValidation(rule.required())
    }),
    defineField({
      name: "newTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: true
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
      description: "Leave empty if this CTA should trigger the reel lightbox instead of navigation.",
      validation: normalLinkValidation
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
      type: "string",
      description: "Full URL (https://…) or local path (/assets/images/…). Used during migration or external hosting.",
      validation: mediaPathValidation
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
      name: "uploadedVideo",
      title: "Video file",
      type: "file",
      description: "Upload or replace the video here. This is the preferred option for new videos.",
      options: {
        accept: "video/*"
      }
    }),
    defineField({
      name: "videoUrl",
      title: "Fallback video URL or local path",
      type: "string",
      description: "Optional. Use only for old migrated files or externally hosted videos.",
      validation: mediaPathValidation
    }),
    defineField({
      name: "embedUrl",
      title: "Embed URL",
      type: "string",
      description: "Vimeo or other embed player URL (https:// only). Not for local /assets/ video files.",
      validation: embedUrlValidation
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
      uploadName: "uploadedVideo.asset.originalFilename",
      subtitle: "videoUrl"
    },
    prepare({ title, uploadName, subtitle }) {
      return {
        title: title || "Video",
        subtitle: uploadName || subtitle
      };
    }
  },
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== "object") return true;
      const video = value as {
        uploadedVideo?: unknown;
        videoUrl?: unknown;
        embedUrl?: unknown;
      };
      if (video.uploadedVideo || video.videoUrl || video.embedUrl) return true;
      return "Add a video file, fallback video URL, or embed URL.";
    })
});

const themeColors = defineType({
  name: "themeColors",
  title: "Theme Colors",
  type: "object",
  fields: [
    themeColorField("backgroundColor", "Background color", "Off White"),
    themeColorField("headingColor", "Heading color", "Black"),
    themeColorField("bodyTextColor", "Body text color", "Soft Black (#3a3833)"),
    themeColorField("mutedTextColor", "Muted text color", "Muted Gray"),
    themeColorField("primaryAccentColor", "Primary accent color", "Red"),
    themeColorField("secondaryAccentColor", "Secondary accent color", "Blue"),
    themeColorField("tertiaryAccentColor", "Tertiary accent color", "Yellow"),
    themeColorField("buttonBackgroundColor", "Button background color", "Black"),
    themeColorField("buttonTextColor", "Button text color", "Off White"),
    themeColorField("linkColor", "Link color", "Black"),
    themeColorField("borderColor", "Border color", "Black")
  ],
  description: "Choose from the approved brand palette. Leave any field empty to keep the default site color shown in its field description."
});

const whatMovesItem = defineType({
  name: "whatMovesItem",
  title: "What Moves item",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4 })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "label"
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
      of: [portableTextBlock],
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
      of: [portableTextBlock]
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

const uiLabels = defineType({
  name: "uiLabels",
  title: "Global UI Labels",
  type: "object",
  description: "Reusable button text and small labels that appear across the site.",
  fields: [
    defineField({ name: "viewCaseLabel", title: "“View Case” link text", type: "string" }),
    defineField({ name: "viewMotionLabel", title: "“View Motion” button text", type: "string" }),
    defineField({ name: "backToWorkLabel", title: "“Back to Work” link text", type: "string" }),
    defineField({ name: "nextCaseLabel", title: "“Next Case:” prefix", type: "string" }),
    defineField({ name: "makeSomethingLabel", title: "“Make Something.” button text", type: "string" }),
    defineField({ name: "viewAllCaseStudiesLabel", title: "“View All Case Studies” button text", type: "string" }),
    defineField({ name: "viewAllMotionLabel", title: "“View All Short Work” button text", type: "string" }),
    defineField({ name: "watchExternalLabel", title: "“Watch on Vimeo” link text", type: "string" }),
    defineField({ name: "hoverPreviewLabel", title: "“Hover to preview” label", type: "string" }),
    defineField({ name: "clickSoundLabel", title: "“Click for sound” label", type: "string" }),
    defineField({ name: "motionEditorialLabel", title: "“Motion + Editorial” label", type: "string" }),
    defineField({ name: "caseStudyKickerLabel", title: "Case study page kicker (default “Case Study”)", type: "string" }),
    defineField({ name: "overviewSectionLabel", title: "Case study “Overview” label", type: "string" }),
    defineField({ name: "challengeSectionLabel", title: "Case study “The Challenge” label", type: "string" }),
    defineField({ name: "approachSectionLabel", title: "Case study “The Approach” label", type: "string" }),
    defineField({ name: "executionSectionLabel", title: "Case study “The Execution” label", type: "string" }),
    defineField({ name: "outcomeSectionLabel", title: "Case study “The Outcome” label", type: "string" }),
    defineField({ name: "whatToNoticeSectionLabel", title: "Case study “What to Notice” label", type: "string" })
  ]
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "navigation", title: "Navigation" },
    { name: "labels", title: "UI Labels" },
    { name: "theme", title: "Theme Colors" },
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
      name: "footerLogo",
      title: "Footer logo",
      type: "imageAssetValue",
      group: "brand",
      description: "Full logo / wordmark shown in the footer. Upload here to replace the default."
    }),
    defineField({
      name: "themeColors",
      title: "Theme Colors",
      type: "themeColors",
      group: "theme",
      description: "Global design system colors for the site. Leave fields empty to keep the approved defaults."
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
      name: "uiLabels",
      title: "UI Labels",
      type: "uiLabels",
      group: "labels"
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
      name: "footerLocation",
      title: "Footer location",
      type: "string",
      group: "footer",
      description: "Shown under the logo in the footer, e.g. Chicago, IL."
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "socialLinkItem" })],
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
    defineField({
      name: "heroMetaLine",
      title: "Hero meta line",
      type: "string",
      description: "Small line under the hero copy, e.g. Chicago — Motion + Editorial — Reel 2026."
    }),
    defineField({ name: "heroPrimaryCTA", title: "Hero primary CTA", type: "ctaItem" }),
    defineField({ name: "mainReel", title: "Main reel", type: "videoAssetValue" }),
    defineField({ name: "mainReelButtonText", title: "Main reel button text", type: "string" }),
    defineField({ name: "selectedWorkLabel", title: "Selected work label", type: "string" }),
    defineField({ name: "selectedWorkTitle", title: "Selected work title", type: "string" }),
    defineField({ name: "selectedWorkSubtitle", title: "Selected work subtitle", type: "string" }),
    defineField({ name: "selectedWorkIntro", title: "Selected work intro", type: "text", rows: 4 }),
    defineField({ name: "caseStudiesSectionKicker", title: "Case studies kicker", type: "string" }),
    defineField({ name: "caseStudiesSectionEyebrow", title: "Case studies eyebrow", type: "string" }),
    defineField({ name: "caseStudiesSectionTitle", title: "Case studies section title", type: "string" }),
    defineField({ name: "caseStudiesSectionIntro", title: "Case studies section intro", type: "text", rows: 3 }),
    defineField({ name: "motionSectionKicker", title: "Motion section kicker", type: "string" }),
    defineField({ name: "motionSectionEyebrow", title: "Motion section eyebrow", type: "string" }),
    defineField({ name: "motionSectionTitle", title: "Motion section title", type: "string" }),
    defineField({ name: "motionSectionIntro", title: "Motion section intro", type: "text", rows: 3 }),
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
      of: [portableTextBlock]
    }),
    defineField({ name: "whatMovesLabel", title: "What Moves Here label", type: "string" }),
    defineField({ name: "whatMovesTitle", title: "What Moves Here title", type: "string" }),
    defineField({ name: "whatMovesIntro", title: "What Moves Here intro", type: "text", rows: 3 }),
    defineField({
      name: "whatMovesItems",
      title: "What Moves Here items",
      type: "array",
      of: [defineArrayMember({ type: "whatMovesItem" })]
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
    defineField({ name: "caseStudiesSectionKicker", title: "Case studies kicker (above eyebrow)", type: "string" }),
    defineField({ name: "caseStudiesSectionEyebrow", title: "Case studies eyebrow label", type: "string" }),
    defineField({ name: "caseStudiesSectionTitle", title: "Case studies section title", type: "string" }),
    defineField({ name: "caseStudiesSectionSubtitle", title: "Case studies section subtitle", type: "text", rows: 3 }),
    defineField({ name: "motionSectionKicker", title: "Motion kicker (above eyebrow)", type: "string" }),
    defineField({ name: "motionSectionEyebrow", title: "Motion eyebrow label", type: "string" }),
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
    defineField({ name: "overview", title: "Overview", type: "array", of: [portableTextBlock] }),
    defineField({
      name: "overviewHighlights",
      title: "Overview highlights",
      type: "array",
      of: [defineArrayMember({ type: "overviewHighlight" })],
      description: "Optional small overview rows like Focus or Emphasis."
    }),
    defineField({ name: "challenge", title: "Challenge", type: "array", of: [portableTextBlock] }),
    defineField({ name: "approach", title: "Approach", type: "array", of: [portableTextBlock] }),
    defineField({ name: "execution", title: "Execution", type: "array", of: [portableTextBlock] }),
    defineField({ name: "outcome", title: "Outcome", type: "array", of: [portableTextBlock] }),
    defineField({ name: "whatToNotice", title: "What to notice", type: "array", of: [portableTextBlock] }),
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
    defineField({ name: "description", title: "Description", type: "array", of: [portableTextBlock] }),
    defineField({ name: "video", title: "Video", type: "videoAssetValue" }),
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
    defineField({ name: "portraitName", title: "Portrait name", type: "string" }),
    defineField({ name: "portraitLocation", title: "Portrait location", type: "string" }),
    defineField({ name: "portraitRole", title: "Portrait role", type: "string" }),
    defineField({ name: "personHeading", title: "Person heading", type: "string" }),
    defineField({ name: "personBody", title: "Person body", type: "array", of: [portableTextBlock] }),
    defineField({ name: "whyHeading", title: "Why heading (eyebrow)", type: "string" }),
    defineField({
      name: "whyExistsTitle",
      title: "“Why This Exists.” title",
      type: "string",
      description: "Use a period at the end. The last word is italicized automatically."
    }),
    defineField({ name: "whyBody", title: "Why body", type: "array", of: [portableTextBlock] }),
    defineField({
      name: "whyRows",
      title: "Why rows",
      type: "array",
      of: [defineArrayMember({ type: "overviewHighlight" })]
    }),
    defineField({ name: "ctaEyebrow", title: "Bottom CTA eyebrow (e.g. “Next”)", type: "string" }),
    defineField({
      name: "ctaTitle",
      title: "Bottom CTA title",
      type: "string",
      description: "The last word is italicized automatically."
    }),
    defineField({ name: "ctaBody", title: "Bottom CTA body", type: "text", rows: 3 }),
    defineField({ name: "ctaButtonText", title: "Bottom CTA button text", type: "string" })
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
    defineField({ name: "bestForBody", title: "Best for copy", type: "array", of: [portableTextBlock] }),
    defineField({ name: "contactBody", title: "Contact helper copy", type: "array", of: [portableTextBlock] }),
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

export const schemaTypes = [
  linkItem,
  socialLinkItem,
  ctaItem,
  imageAssetValue,
  videoAssetValue,
  themeColors,
  whatMovesItem,
  overviewHighlight,
  relatedVideo,
  motionGroup,
  uiLabels,
  siteSettings,
  homepage,
  workPage,
  caseStudy,
  motionPiece,
  contextPage,
  makeSomethingPage
];
