import groq from "groq";

const linkFields = `
  label,
  href,
  newTab
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
  videoUrl,
  embedUrl,
  fit,
  meta,
  label,
  videoFile{
    asset->
  },
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

export const serviceTrackFields = `
  _id,
  title,
  label,
  description,
  accentColor,
  order
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
  videoFile{
    ${videoFields}
  },
  videoUrl,
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
    roundLogo{
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
    footerTagline,
    footerCopyright,
    footerWorthMakingList,
    footerExploreLinks[]{
      ${linkFields}
    },
    footerContactEmail,
    footerContactHelperText,
    socialLinks[]{
      ${linkFields}
    }
  }
`;

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    heroLabel,
    heroHeadline,
    heroAccentWord,
    heroBody,
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
    serviceTracks[]->{
      ${serviceTrackFields}
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
    caseStudiesSectionTitle,
    caseStudiesSectionSubtitle,
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
    personHeading,
    personBody[]{
      ${portableTextFields}
    },
    whyHeading,
    whyBody[]{
      ${portableTextFields}
    },
    whyRows[]{
      ${overviewHighlightFields}
    }
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

export const serviceTracksQuery = groq`
  *[_type == "serviceTrack"] | order(order asc){
    ${serviceTrackFields}
  }
`;
