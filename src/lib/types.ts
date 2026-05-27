export type RichTextBlock = {
  _type: "block";
  _key: string;
  style?: string;
  markDefs?: Array<{
    _key?: string;
    _type: "link";
    href?: string;
    blank?: boolean;
  }>;
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks: string[];
  }>;
};

export type Tone = "default" | "blue" | "yellow";
export type VideoFit = "contain" | "cover" | "embed";
export type ThemeColorToken = "offWhite" | "black" | "mutedGray" | "red" | "blue" | "yellow" | "dark" | "white";

export interface SanityAssetRef {
  asset?: {
    _ref?: string;
    url?: string;
  };
}

export interface SanityFileAssetRef {
  asset?: {
    _ref?: string;
    url?: string;
    originalFilename?: string;
    mimeType?: string;
    size?: number;
  };
}

export interface ImageAssetValue {
  src?: string;
  alt?: string;
  image?: SanityAssetRef;
}

export interface VideoAssetValue {
  title?: string;
  uploadedVideo?: SanityFileAssetRef;
  videoUrl?: string;
  videoUrlOrPath?: string;
  embedUrl?: string;
  poster?: ImageAssetValue;
  fit?: VideoFit;
  meta?: string;
  label?: string;
}

export interface LinkItem {
  _key?: string;
  label: string;
  href: string;
  newTab?: boolean;
}

export interface CTAItem {
  label: string;
  href?: string;
  action?: "link" | "reel";
}

export interface FooterSocialLink {
  _key?: string;
  label: string;
  href: string;
  iconLabel?: string;
  newTab?: boolean;
}

export interface ThemeColors {
  backgroundColor?: ThemeColorToken;
  headingColor?: ThemeColorToken;
  bodyTextColor?: ThemeColorToken;
  mutedTextColor?: ThemeColorToken;
  primaryAccentColor?: ThemeColorToken;
  secondaryAccentColor?: ThemeColorToken;
  tertiaryAccentColor?: ThemeColorToken;
  buttonBackgroundColor?: ThemeColorToken;
  buttonTextColor?: ThemeColorToken;
  linkColor?: ThemeColorToken;
  borderColor?: ThemeColorToken;
}

export interface UILabels {
  viewCaseLabel?: string;
  viewMotionLabel?: string;
  backToWorkLabel?: string;
  nextCaseLabel?: string;
  makeSomethingLabel?: string;
  viewAllCaseStudiesLabel?: string;
  viewAllMotionLabel?: string;
  watchExternalLabel?: string;
  hoverPreviewLabel?: string;
  clickSoundLabel?: string;
  motionEditorialLabel?: string;
  caseStudyKickerLabel?: string;
  overviewSectionLabel?: string;
  challengeSectionLabel?: string;
  approachSectionLabel?: string;
  executionSectionLabel?: string;
  outcomeSectionLabel?: string;
  whatToNoticeSectionLabel?: string;
}

export interface SiteSettings {
  siteTitle: string;
  logoText: string;
  roundLogo: ImageAssetValue;
  footerLogo?: ImageAssetValue;
  themeColors?: ThemeColors;
  mainNavigation: LinkItem[];
  primaryCTA: CTAItem;
  uiLabels?: UILabels;
  footerTagline: string;
  footerCopyright: string;
  footerWorthMakingList: string[];
  footerExploreLinks: LinkItem[];
  footerContactEmail: string;
  footerContactHelperText: string;
  footerLocation?: string;
  socialLinks: FooterSocialLink[];
}

export interface WhatMovesItem {
  _key?: string;
  label?: string;
  title: string;
  body?: string;
}

export interface HomepageSeed {
  heroLabel: string;
  heroHeadline: string;
  heroAccentWord: string;
  heroBody: string;
  heroMetaLine?: string;
  heroPrimaryCTA: CTAItem;
  mainReel: VideoAssetValue;
  mainReelButtonText: string;
  selectedWorkLabel: string;
  selectedWorkTitle: string;
  selectedWorkSubtitle: string;
  selectedWorkIntro: string;
  selectedCaseStudies: string[];
  selectedMotionPieces: string[];
  caseStudiesSectionKicker?: string;
  caseStudiesSectionEyebrow?: string;
  caseStudiesSectionTitle?: string;
  caseStudiesSectionIntro?: string;
  motionSectionKicker?: string;
  motionSectionEyebrow?: string;
  motionSectionTitle?: string;
  motionSectionIntro?: string;
  whyThisExistsLabel: string;
  whyThisExistsTitle: string;
  whyThisExistsBody: RichTextBlock[];
  whatMovesLabel: string;
  whatMovesTitle: string;
  whatMovesIntro: string;
  whatMovesItems: WhatMovesItem[];
  finalCTATitle: string;
  finalCTABody: string;
  finalCTAButtonText: string;
}

export interface Homepage extends Omit<HomepageSeed, "selectedCaseStudies" | "selectedMotionPieces"> {
  selectedCaseStudies: CaseStudy[];
  selectedMotionPieces: MotionPiece[];
}

export interface MotionGroup {
  _key?: string;
  key: string;
  label: string;
  title: string;
  body: string;
}

export interface WorkPageSeed {
  pageLabel: string;
  pageTitle: string;
  introCopy: string;
  caseStudiesSectionKicker?: string;
  caseStudiesSectionEyebrow?: string;
  caseStudiesSectionTitle: string;
  caseStudiesSectionSubtitle: string;
  motionSectionKicker?: string;
  motionSectionEyebrow?: string;
  motionSectionTitle: string;
  motionSectionSubtitle: string;
  featuredCaseStudies: string[];
  featuredMotionPieces: string[];
  motionGroups: MotionGroup[];
}

export interface WorkPage extends Omit<WorkPageSeed, "featuredCaseStudies" | "featuredMotionPieces"> {
  featuredCaseStudies: CaseStudy[];
  featuredMotionPieces: MotionPiece[];
}

export interface OverviewHighlight {
  _key?: string;
  label: string;
  tone?: Tone;
  body: RichTextBlock[];
}

export interface RelatedVideo {
  _key?: string;
  title: string;
  subtitle?: string;
  description?: RichTextBlock[];
  media: VideoAssetValue;
  afterParagraph?: number;
  sectionPlacement?: "overview" | "challenge" | "approach" | "execution" | "outcome";
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  summary: string;
  client?: string;
  year?: string;
  role: string[];
  services: string[];
  heroVideo?: VideoAssetValue;
  heroImage?: ImageAssetValue;
  overview: RichTextBlock[];
  overviewHighlights?: OverviewHighlight[];
  challenge: RichTextBlock[];
  approach: RichTextBlock[];
  execution: RichTextBlock[];
  outcome: RichTextBlock[];
  whatToNotice?: RichTextBlock[];
  relatedVideos?: RelatedVideo[];
  featured: boolean;
  order: number;
  seoTitle: string;
  seoDescription: string;
}

export interface MotionPiece {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  description: RichTextBlock[];
  video?: VideoAssetValue;
  videoFile?: VideoAssetValue;
  videoUrl?: string;
  resolvedVideoUrl?: string;
  thumbnail?: ImageAssetValue;
  client?: string;
  year?: string;
  duration?: string;
  featured: boolean;
  showOnHomepage: boolean;
  order: number;
  groupKey: string;
}

export interface ContextPage {
  pageLabel: string;
  pageTitle: string;
  portraitImage: ImageAssetValue;
  portraitName?: string;
  portraitLocation?: string;
  portraitRole?: string;
  personHeading: string;
  personBody: RichTextBlock[];
  whyHeading: string;
  whyExistsTitle?: string;
  whyBody: RichTextBlock[];
  whyRows: OverviewHighlight[];
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaBody?: string;
  ctaButtonText?: string;
}

export interface MakeSomethingPage {
  pageLabel: string;
  pageTitle: string;
  introCopy: string;
  contactEmail: string;
  emailHelperText: string;
  formIntro: string;
  projectTypes: string[];
  budgetRanges: string[];
  timelineOptions: string[];
  inquiryLabel: string;
  inquiryTitle: string;
  bestForBody: RichTextBlock[];
  contactBody: RichTextBlock[];
  formButtonText: string;
}

export interface SeedContent {
  siteSettings: SiteSettings;
  homepage: HomepageSeed;
  workPage: WorkPageSeed;
  caseStudies: CaseStudy[];
  motionPieces: MotionPiece[];
  contextPage: ContextPage;
  makeSomethingPage: MakeSomethingPage;
}
