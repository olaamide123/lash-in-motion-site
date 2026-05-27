import groq from "groq";

const linkFields = `
  label,
  href,
  newTab
`;

const socialLinkFields = `
  label,
  iconLabel,
  href,
  newTab
`;

const themeFields = `
  backgroundColor,
  headingColor,
  bodyTextColor,
  mutedTextColor,
  primaryAccentColor,
  secondaryAccentColor,
  tertiaryAccentColor,
  buttonBackgroundColor,
  buttonTextColor,
  linkColor,
  borderColor
`;

const imageFields = `
  alt,
  src,
  image{
    asset->
  }
`;

const videoFields = `
  title,
  uploadedVideo{
    asset->{
      url,
      originalFilename,
      mimeType,
      size
    }
  },
  "videoUrl": coalesce(videoUrl, videoUrlOrPath, videoFile.videoUrl),
  embedUrl,
  fit,
  meta,
  label,
  poster{
    ${imageFields}
  }
`;

const portableTextFields = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      href,
      blank
    }
  }
`;

const overviewHighlightFields = `
  label,
  tone,
  body[]{
    ${portableTextFields}
  }
`;

const relatedVideoFields = `
  title,
  subtitle,
  afterParagraph,
  sectionPlacement,
  description[]{
    ${portableTextFields}
  },
  media{
    ${videoFields}
  }
`;

const whatMovesItemFields = `
  label,
  title,
  body
`;

export const motionPieceFields = `
  _id,
  title,
  "slug": slug.current,
  subtitle,
  category,
  description[]{
    ${portableTextFields}
  },
  "video": select(
    defined(video) => video{
      ${videoFields}
    },
    defined(videoFile) => videoFile{
      ${videoFields}
    },
    defined(videoUrl) || defined(resolvedVideoUrl) => {
      "videoUrl": coalesce(videoUrl, resolvedVideoUrl)
    }
  ),
  videoFile{
    ${videoFields}
  },
  videoUrl,
  resolvedVideoUrl,
  thumbnail{
    ${imageFields}
  },
  client,
  year,
  duration,
  featured,
  showOnHomepage,
  order,
  groupKey
`;

export const caseStudyFields = `
  _id,
  title,
  "slug": slug.current,
  subtitle,
  category,
  summary,
  client,
  year,
  role,
  services,
  heroVideo{
    ${videoFields}
  },
  heroImage{
    ${imageFields}
  },
  overview[]{
    ${portableTextFields}
  },
  overviewHighlights[]{
    ${overviewHighlightFields}
  },
  challenge[]{
    ${portableTextFields}
  },
  approach[]{
    ${portableTextFields}
  },
  execution[]{
    ${portableTextFields}
  },
  outcome[]{
    ${portableTextFields}
  },
  whatToNotice[]{
    ${portableTextFields}
  },
  relatedVideos[]{
    ${relatedVideoFields}
  },
  featured,
  order,
  seoTitle,
  seoDescription
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteTitle,
    logoText,
    themeColors{
      ${themeFields}
    },
    roundLogo{
      ${imageFields}
    },
    footerLogo{
      ${imageFields}
    },
    mainNavigation[]{
      ${linkFields}
    },
    primaryCTA{
      label,
      href,
      action
    },
    uiLabels{
      viewCaseLabel,
      viewMotionLabel,
      backToWorkLabel,
      nextCaseLabel,
      makeSomethingLabel,
      viewAllCaseStudiesLabel,
      viewAllMotionLabel,
      watchExternalLabel,
      hoverPreviewLabel,
      clickSoundLabel,
      motionEditorialLabel,
      caseStudyKickerLabel,
      overviewSectionLabel,
      challengeSectionLabel,
      approachSectionLabel,
      executionSectionLabel,
      outcomeSectionLabel,
      whatToNoticeSectionLabel
    },
    footerTagline,
    footerCopyright,
    footerWorthMakingList,
    footerExploreLinks[]{
      ${linkFields}
    },
    footerContactEmail,
    footerContactHelperText,
    footerLocation,
    socialLinks[]{
      ${socialLinkFields}
    }
  }
`;

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    heroLabel,
    heroHeadline,
    heroAccentWord,
    heroBody,
    heroMetaLine,
    heroPrimaryCTA{
      label,
      href,
      action
    },
    mainReel{
      ${videoFields}
    },
    mainReelButtonText,
    selectedWorkLabel,
    selectedWorkTitle,
    selectedWorkSubtitle,
    selectedWorkIntro,
    caseStudiesSectionKicker,
    caseStudiesSectionEyebrow,
    caseStudiesSectionTitle,
    caseStudiesSectionIntro,
    motionSectionKicker,
    motionSectionEyebrow,
    motionSectionTitle,
    motionSectionIntro,
    selectedCaseStudies[]->{
      ${caseStudyFields}
    },
    selectedMotionPieces[]->{
      ${motionPieceFields}
    },
    whyThisExistsLabel,
    whyThisExistsTitle,
    whyThisExistsBody[]{
      ${portableTextFields}
    },
    whatMovesLabel,
    whatMovesTitle,
    whatMovesIntro,
    whatMovesItems[]{
      ${whatMovesItemFields}
    },
    finalCTATitle,
    finalCTABody,
    finalCTAButtonText
  }
`;

export const workPageQuery = groq`
  *[_type == "workPage"][0]{
    pageLabel,
    pageTitle,
    introCopy,
    caseStudiesSectionKicker,
    caseStudiesSectionEyebrow,
    caseStudiesSectionTitle,
    caseStudiesSectionSubtitle,
    motionSectionKicker,
    motionSectionEyebrow,
    motionSectionTitle,
    motionSectionSubtitle,
    motionGroups[]{
      key,
      label,
      title,
      body
    },
    featuredCaseStudies[]->{
      ${caseStudyFields}
    },
    featuredMotionPieces[]->{
      ${motionPieceFields}
    }
  }
`;

export const contextPageQuery = groq`
  *[_type == "contextPage"][0]{
    pageLabel,
    pageTitle,
    portraitImage{
      ${imageFields}
    },
    portraitName,
    portraitLocation,
    portraitRole,
    personHeading,
    personBody[]{
      ${portableTextFields}
    },
    whyHeading,
    whyExistsTitle,
    whyBody[]{
      ${portableTextFields}
    },
    whyRows[]{
      ${overviewHighlightFields}
    },
    ctaEyebrow,
    ctaTitle,
    ctaBody,
    ctaButtonText
  }
`;

export const makeSomethingPageQuery = groq`
  *[_type == "makeSomethingPage"][0]{
    pageLabel,
    pageTitle,
    introCopy,
    contactEmail,
    emailHelperText,
    formIntro,
    projectTypes,
    budgetRanges,
    timelineOptions,
    inquiryLabel,
    inquiryTitle,
    bestForBody[]{
      ${portableTextFields}
    },
    contactBody[]{
      ${portableTextFields}
    },
    formButtonText
  }
`;

export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(order asc){
    ${caseStudyFields}
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    ${caseStudyFields}
  }
`;

export const motionPiecesQuery = groq`
  *[_type == "motionPiece"] | order(order asc){
    ${motionPieceFields}
  }
`;
