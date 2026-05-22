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
export type ColorStyle = "default" | "muted" | "red" | "blue" | "yellow" | "black" | "white";

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

export interface SiteSettings {
  siteTitle: string;
  logoText: string;
  roundLogo: ImageAssetValue;
  defaultAccentColor?: ColorStyle;
  mainNavigation: LinkItem[];
  primaryCTA: CTAItem;
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
  accentColor?: ColorStyle;
}

export interface HomepageSeed {
  heroLabel: string;
  heroHeadline: string;
  heroAccentWord: string;
  heroAccentColor?: ColorStyle;
  heroBody: string;
  heroMetaLine?: string;
  heroPrimaryCTA: CTAItem;
  mainReel: VideoAssetValue;
  mainReelButtonText: string;
  selectedWorkLabel: string;
  selectedWorkEyebrowColor?: ColorStyle;
  selectedWorkTitle: string;
  selectedWorkSubtitle: string;
  selectedWorkIntro: string;
  selectedCaseStudies: string[];
  selectedMotionPieces: string[];
  caseStudiesSectionKicker?: string;
  caseStudiesSectionEyebrow?: string;
  caseStudiesSectionAccentColor?: ColorStyle;
  caseStudiesSectionTitle?: string;
  caseStudiesSectionIntro?: string;
  motionSectionKicker?: string;
  motionSectionEyebrow?: string;
  motionSectionAccentColor?: ColorStyle;
  motionSectionTitle?: string;
  motionSectionIntro?: string;
  whyThisExistsLabel: string;
  whyThisExistsAccentColor?: ColorStyle;
  whyThisExistsTitle: string;
  whyThisExistsBody: RichTextBlock[];
  whatMovesLabel: string;
  whatMovesAccentColor?: ColorStyle;
  whatMovesTitle: string;
  whatMovesIntro: string;
  whatMovesItems: WhatMovesItem[];
  finalCTATitle: string;
  finalCTABody: string;
  finalCTAButtonText: string;
  finalCTAAccentColor?: ColorStyle;
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
  pageAccentColor?: ColorStyle;
  pageTitle: string;
  introCopy: string;
  caseStudiesSectionAccentColor?: ColorStyle;
  caseStudiesSectionTitle: string;
  caseStudiesSectionSubtitle: string;
  motionSectionAccentColor?: ColorStyle;
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
  pageAccentColor?: ColorStyle;
  pageTitle: string;
  portraitImage: ImageAssetValue;
  portraitName?: string;
  portraitLocation?: string;
  portraitRole?: string;
  personHeading: string;
  personAccentColor?: ColorStyle;
  personBody: RichTextBlock[];
  whyHeading: string;
  whyAccentColor?: ColorStyle;
  whyBody: RichTextBlock[];
  whyRows: OverviewHighlight[];
}

export interface MakeSomethingPage {
  pageLabel: string;
  pageAccentColor?: ColorStyle;
  pageTitle: string;
  introCopy: string;
  contactEmail: string;
  emailHelperText: string;
  formIntro: string;
  projectTypes: string[];
  budgetRanges: string[];
  timelineOptions: string[];
  inquiryLabel: string;
  contactAccentColor?: ColorStyle;
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
