export type RichTextBlock = {
  _type: "block";
  _key: string;
  style: "normal";
  markDefs: [];
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks: string[];
  }>;
};

export type Tone = "default" | "blue" | "yellow";
export type VideoFit = "contain" | "cover" | "embed";

export interface ImageAssetValue {
  src?: string;
  alt?: string;
}

export interface VideoAssetValue {
  title?: string;
  videoUrl?: string;
  embedUrl?: string;
  poster?: ImageAssetValue;
  fit?: VideoFit;
  meta?: string;
  label?: string;
}

export interface LinkItem {
  label: string;
  href: string;
  newTab?: boolean;
}

export interface CTAItem {
  label: string;
  href?: string;
  action?: "link" | "reel";
}

export interface FooterSocialLink extends LinkItem {
  iconLabel?: string;
}

export interface SiteSettings {
  siteTitle: string;
  logoText: string;
  roundLogo: ImageAssetValue;
  mainNavigation: LinkItem[];
  primaryCTA: CTAItem;
  footerTagline: string;
  footerCopyright: string;
  footerWorthMakingList: string[];
  footerExploreLinks: LinkItem[];
  footerContactEmail: string;
  footerContactHelperText: string;
  socialLinks: FooterSocialLink[];
}

export interface ServiceTrack {
  _id: string;
  title: string;
  label: string;
  description: string;
  accentColor: "red" | "blue" | "yellow";
  order: number;
}

export interface Homepage {
  heroLabel: string;
  heroHeadline: string;
  heroAccentWord: string;
  heroBody: string;
  heroPrimaryCTA: CTAItem;
  mainReel: VideoAssetValue;
  mainReelButtonText: string;
  selectedWorkLabel: string;
  selectedWorkTitle: string;
  selectedWorkSubtitle: string;
  selectedWorkIntro: string;
  selectedCaseStudies: string[];
  selectedMotionPieces: string[];
  whyThisExistsLabel: string;
  whyThisExistsTitle: string;
  whyThisExistsBody: RichTextBlock[];
  whatMovesLabel: string;
  whatMovesTitle: string;
  whatMovesIntro: string;
  serviceTracks: string[];
  finalCTATitle: string;
  finalCTABody: string;
  finalCTAButtonText: string;
}

export interface MotionGroup {
  key: string;
  label: string;
  title: string;
  body: string;
}

export interface WorkPage {
  pageLabel: string;
  pageTitle: string;
  introCopy: string;
  caseStudiesSectionTitle: string;
  caseStudiesSectionSubtitle: string;
  motionSectionTitle: string;
  motionSectionSubtitle: string;
  featuredCaseStudies: string[];
  featuredMotionPieces: string[];
  motionGroups: MotionGroup[];
}

export interface OverviewHighlight {
  label: string;
  tone?: Tone;
  body: RichTextBlock[];
}

export interface RelatedVideo {
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
  videoFile?: VideoAssetValue;
  videoUrl?: string;
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
  personHeading: string;
  personBody: RichTextBlock[];
  whyHeading: string;
  whyBody: RichTextBlock[];
  whyRows: OverviewHighlight[];
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
  homepage: Homepage;
  workPage: WorkPage;
  caseStudies: CaseStudy[];
  motionPieces: MotionPiece[];
  contextPage: ContextPage;
  makeSomethingPage: MakeSomethingPage;
  serviceTracks: ServiceTrack[];
}
