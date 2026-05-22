import type {
  CaseStudy,
  ContextPage,
  HomepageSeed,
  MakeSomethingPage,
  MotionPiece,
  RichTextBlock,
  SeedContent,
  WhatMovesItem,
  SiteSettings,
  WorkPageSeed
} from "@/lib/types";

let keyIndex = 0;

function nextKey(prefix: string) {
  keyIndex += 1;
  return `${prefix}-${keyIndex}`;
}

function keyPart(value: string) {
  const normalized = value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || nextKey("item");
}

function withKey<const T extends Record<string, unknown>>(prefix: string, value: string, item: T): T & { _key: string } {
  return {
    _key: `${prefix}-${keyPart(value)}`,
    ...item
  };
}

export function pt(paragraphs: string[]): RichTextBlock[] {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: nextKey("block"),
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: nextKey("span"),
        text,
        marks: []
      }
    ]
  }));
}

export const siteSettings: SiteSettings = {
  siteTitle: "Lash In Motion",
  logoText: "Lash in Motion",
  themeColors: {
    backgroundColor: "offWhite",
    headingColor: "black",
    mutedTextColor: "mutedGray",
    primaryAccentColor: "red",
    secondaryAccentColor: "blue",
    tertiaryAccentColor: "yellow",
    buttonBackgroundColor: "black",
    buttonTextColor: "offWhite",
    linkColor: "black",
    borderColor: "black"
  },
  roundLogo: {
    src: "/assets/images/lim-round-mark.png",
    alt: "Lash in Motion round mark"
  },
  mainNavigation: [
    withKey("nav", "home", { label: "Home", href: "/" }),
    withKey("nav", "work", { label: "Work", href: "/work" }),
    withKey("nav", "context", { label: "Context", href: "/context" }),
    withKey("nav", "make-something", { label: "Make Something.", href: "/make-something" })
  ],
  primaryCTA: {
    label: "Make Something.",
    href: "/make-something",
    action: "link"
  },
  footerTagline: "Motion that knows what to leave out.",
  footerCopyright: "© 2026 Lash in Motion LLC. Made with care. Rights reserved.",
  footerWorthMakingList: [
    "Campaign films",
    "Editorial work",
    "Brand motion",
    "Political & advocacy",
    "Explainers & education"
  ],
  footerExploreLinks: [
    withKey("footer-link", "home", { label: "Home", href: "/" }),
    withKey("footer-link", "work", { label: "Work", href: "/work" }),
    withKey("footer-link", "context", { label: "Context", href: "/context" }),
    withKey("footer-link", "make-something", { label: "Make Something.", href: "/make-something" })
  ],
  footerContactEmail: "create@lashinmotion.com",
  footerContactHelperText: "Usually the fastest way.",
  footerLocation: "Chicago, IL",
  socialLinks: []
};

export const whatMovesItems: WhatMovesItem[] = [
  withKey("what-moves", "motion-design", {
    title: "Motion Design",
    label: "Track 01",
    body: "Animation, typography, compositing, explainers, and visual systems designed to communicate clearly and move with purpose."
  }),
  withKey("what-moves", "editing-and-storytelling", {
    title: "Editing & Storytelling",
    label: "Track 02",
    body: "Projects shaped through pacing, structure, sound, and editorial decisions that help ideas land the way they are meant to."
  }),
  withKey("what-moves", "campaign-and-advocacy", {
    title: "Campaign & Advocacy",
    label: "Track 03",
    body: "Political, nonprofit, and purpose-driven work built to connect with people, simplify complexity, and create momentum."
  })
];

export const homepage: HomepageSeed = {
  heroLabel: "Reel 2026",
  heroHeadline: "Motion that knows\nwhat to",
  heroAccentWord: "leave out.",
  heroBody: "Motion design, editing, and storytelling built with clarity, rhythm, and enough restraint to know when less is doing more.",
  heroMetaLine: "Chicago — Motion + Editorial — Reel 2026",
  heroPrimaryCTA: {
    label: "Make Something.",
    href: "/make-something",
    action: "link"
  },
  mainReel: {
    title: "Reel 2026",
    videoUrl: "/assets/Reel/GregLashReel_2026_update.mp4",
    meta: "Chicago",
    fit: "contain"
  },
  mainReelButtonText: "See It.",
  selectedWorkLabel: "Selected Work",
  selectedWorkTitle: "Selected Work.",
  selectedWorkSubtitle: "Selected Work.",
  selectedWorkIntro: "A selection of motion, editing, and visual storytelling projects shaped through research, rhythm, and a healthy amount of problem solving. Case studies first. Shorter pieces below.",
  caseStudiesSectionKicker: "The Full Story.",
  caseStudiesSectionEyebrow: "Case Studies",
  caseStudiesSectionTitle: "Projects That Made the Cut.",
  caseStudiesSectionIntro: "Some projects benefit from a little more context.",
  motionSectionKicker: "Shorter Work.",
  motionSectionEyebrow: "Standalone Pieces",
  motionSectionTitle: "Motion, spots, and standalone pieces.",
  motionSectionIntro:
    "Shorter work that still carries the same attention to pace, clarity, and editorial shape.",
  selectedCaseStudies: ["move", "carrum-health-patient-guide"],
  selectedMotionPieces: ["adge-ai", "caymall", "hcg-smores", "dirt-road"],
  whyThisExistsLabel: "Why This Exists.",
  whyThisExistsTitle: "Why This Exists.",
  whyThisExistsBody: pt([
    "No one is ever going to care more about a project than the people behind it. If the energy is not there, it shows. Creative work has a way of showing exactly where people stopped paying attention.",
    "The best results tend to happen when ideas are met with curiosity, enthusiasm, and a willingness to stay engaged in the process. Projects are developed from concept through final delivery with a hands-on approach that keeps momentum intact from beginning to end. Sometimes that means solving problems before they become problems. Sometimes it means figuring things out in real time.",
    "The goal is never just to make something polished. Plenty of polished things still miss the point. The goal is to make something thoughtful, clear, and worth paying attention to."
  ]),
  whatMovesLabel: "Three Tracks",
  whatMovesTitle: "What Moves Here.",
  whatMovesIntro: "Projects can begin in any of them and usually end somewhere between all three.",
  whatMovesItems,
  finalCTATitle: "Have something worth moving?",
  finalCTABody: "For campaign films, motion, editorial work, and projects where getting it right actually matters.",
  finalCTAButtonText: "See It."
};

export const workPage: WorkPageSeed = {
  pageLabel: "Work",
  pageTitle: "Selected Work.",
  introCopy: "A selection of motion, editing, and visual storytelling projects shaped through research, rhythm, and a healthy amount of problem solving. Case studies first. Shorter pieces below.",
  caseStudiesSectionTitle: "Projects That Made the Cut.",
  caseStudiesSectionSubtitle: "Some projects benefit from a little more context.",
  motionSectionTitle: "Motion, spots, and standalone pieces.",
  motionSectionSubtitle: "Shorter work that still carries the same attention to pace, clarity, and editorial shape.",
  featuredCaseStudies: ["move", "carrum-health-patient-guide", "volley"],
  featuredMotionPieces: [
    "dirt-road",
    "focus",
    "coward",
    "twice",
    "public-lands",
    "adge-ai",
    "maestro-maintenance",
    "caymall",
    "hcg-smores",
    "sexy-fun-world",
    "carrum-executive-summit-recap",
    "league-of-play",
    "infinite-roar"
  ],
  motionGroups: [
    withKey("motion-group", "campaign-advocacy", {
      key: "campaign-advocacy",
      label: "Campaign & Advocacy",
      title: "Campaign spots, persuasion work, and advocacy pieces.",
      body: "Political and public-interest work grouped together so the shorter campaign films read like a deliberate body of work instead of scattered single-offs."
    }),
    withKey("motion-group", "explainers-product", {
      key: "explainers-product",
      label: "Explainers & Product",
      title: "Explainers, product storytelling, and education-focused pieces.",
      body: "The more informational work sits together here so the page reads with a clearer rhythm between advocacy, explanation, and brand-facing storytelling."
    }),
    withKey("motion-group", "brand-launch-editorial", {
      key: "brand-launch-editorial",
      label: "Brand, Launch & Editorial",
      title: "Launch films, brand motion, social work, and editorial recaps.",
      body: "The brand-facing and editorial pieces now sit together, which makes it easier to scan the archive by intent instead of bouncing between unrelated formats."
    })
  ]
};

export const caseStudies: CaseStudy[] = [
  {
    _id: "case-study-move",
    title: "MOVE",
    slug: "move",
    subtitle: "Evolving a Civic Anthem",
    category: "Campaign & Advocacy",
    summary: "A campaign anthem built around civic participation, urgency, and a sense of collective momentum.",
    client: "MOVE",
    year: "2024–2026",
    role: ["Research", "Scripting", "Editorial", "Motion"],
    services: ["Research", "Scripting", "Editorial", "Motion"],
    heroVideo: {
      title: "MOVE",
      videoUrl: "/assets/videos/Case studies/Move Case study/MOVE_v4.mp4",
      poster: {
        src: "/assets/videos/MOVE Case Study.png",
        alt: "MOVE poster"
      },
      meta: "Campaign Anthem",
      fit: "contain"
    },
    overview: pt([
      "MOVE set out to build something ambitious: a civic platform designed to help everyday people feel heard by their elected representatives."
    ]),
    overviewHighlights: [
      withKey("overview-highlight", "move-focus", {
        label: "Focus",
        body: pt([
          "A civic message that could evolve with the political moment without becoming part of the noise."
        ])
      })
    ],
    challenge: pt([
      "MOVE (Make Our Voices Equal) set out to build something ambitious: a civic platform designed to help everyday people feel heard by their elected representatives.",
      "The original ask was a high energy anthem video built around emotional momentum and modern political footage. At the time, that approach made sense. Then the political climate changed quickly and dramatically. What felt energizing one month suddenly felt combustible the next.",
      "The challenge shifted from simply making a compelling video to helping navigate a larger brand question: how do you encourage civic engagement without becoming part of the noise?"
    ]),
    approach: pt([
      "The process started with research, story structure, and a fair amount of listening.",
      "Hundreds of hours of news footage, historical material, speeches, and bipartisan moments were reviewed to better understand where common ground still existed. Early versions leaned heavily into urgency and emotion. As the political temperature changed, the work changed with it.",
      "Instead of amplifying division, the narrative pivoted toward something more durable: the idea that meaningful civic action does not begin with politicians. It begins with people. The camera moved away from podiums and headlines and back toward everyday citizens.",
      "Because sometimes the loudest message is not necessarily the clearest one."
    ]),
    execution: pt([
      "The visual language evolved alongside the organization itself.",
      "Early phases used textured graphics, fast editorial pacing, archival footage, and high contrast visuals designed to create momentum and urgency. As the brand matured, those same systems were gradually reshaped to feel less reactive and more enduring. Less protest. More participation.",
      "For the launch of MOVE’s flagship platform, later renamed Align, the approach shifted again. Using AI assisted workflows, a diverse group of everyday people spoke directly to camera about frustration, hope, and participation in a way that felt personal rather than performative. Product visuals and interface animation grounded the larger civic message in something tangible and useful.",
      "The challenge was not simply evolving the look. It was helping the organization evolve how it wanted to be understood."
    ]),
    relatedVideos: [
      withKey("related-video", "move-campaign-update", {
        title: "MOVE",
        subtitle: "Campaign Update",
        media: {
          title: "MOVE",
          videoUrl: "/assets/videos/Case studies/Move Case study/MOVE 2025_v2 (1).mp4",
          meta: "Campaign Update",
          fit: "contain"
        },
        sectionPlacement: "execution",
        afterParagraph: 1,
        description: pt(["A later campaign update kept the same civic message while reflecting a changed political climate."])
      })
    ],
    outcome: pt([
      "From research and scripting to visual development, AI generation, editorial structure, and motion design, the result was a flexible system of launch content capable of evolving alongside the organization itself.",
      "Just as importantly, the work helped MOVE transition from a reactive political identity toward something broader, steadier, and more accessible. Civic engagement is difficult enough. The message did not need to make it harder."
    ]),
    whatToNotice: pt([
      "The anthem evolved with the political moment without losing its civic center of gravity."
    ]),
    featured: true,
    order: 1,
    seoTitle: "MOVE — Lash In Motion",
    seoDescription: "MOVE case study — campaign motion shaped through urgency, clarity, and momentum."
  },
  {
    _id: "case-study-carrum-health-patient-guide",
    title: "Carrum Health – Patient Guide",
    slug: "carrum-health-patient-guide",
    subtitle: "Explainer & Education",
    category: "Explainer & Education",
    summary: "Complex healthcare topics translated into approachable motion built for clarity, trust, and a more human kind of communication.",
    client: "Carrum Health",
    year: "2023–2025",
    role: ["Scripting", "Concept Development", "Motion"],
    services: ["Scripting", "Concept Development", "Motion"],
    heroVideo: {
      title: "Carrum Health – Patient Guide",
      videoUrl: "/assets/videos/Case studies/Carrum Health case study/Hysterectomy_v4b.mp4",
      meta: "Explainer & Education",
      fit: "contain"
    },
    overview: pt([
      "Carrum Health needed a way to communicate everything from highly sensitive surgical benefits, including cancer care and hysterectomies, to everyday wellness topics in a way that felt reassuring rather than clinical."
    ]),
    overviewHighlights: [
      withKey("overview-highlight", "carrum-focus", {
        label: "Focus",
        body: pt([
          "Make healthcare information feel approachable without losing accuracy."
        ])
      })
    ],
    challenge: pt([
      "Healthcare information is rarely short on detail. The harder part is making it feel understandable and human.",
      "Carrum Health needed a way to communicate everything from highly sensitive surgical benefits, including cancer care and hysterectomies, to everyday wellness topics in a way that felt reassuring rather than clinical. The challenge was not simply explaining the information. It was creating a consistent experience around it.",
      "Medical language has a way of becoming intimidating quickly. The goal was to make it feel approachable without losing accuracy."
    ]),
    approach: pt([
      "Starting from clinical information and foundational ideas, the process began with story and structure.",
      "Dense medical terminology was translated into conversational scripts designed to feel clear, calm, and empathetic. Early on, it became obvious that not every subject should look or feel the same. Sensitive medical procedures called for warmth and care. Everyday wellness topics needed a little more energy and relatability.",
      "In other words, not every message benefits from the same visual volume."
    ]),
    execution: pt([
      "For the Hysterectomy and Cancer Care explainers, a textured illustrated approach helped create distance from the clinical nature of the subject matter while still feeling grounded and reassuring. Soft color palettes and fluid transitions connected complicated procedures back to something more human and approachable.",
      "For wellness topics like Mindful Eating and Fun in the Sun, the visual language shifted. A mixed media approach blending motion graphics with live action footage created something lighter and more immediate while still maintaining a consistent Carrum identity.",
      "The challenge was less about making each piece identical and more about making them feel like they belonged in the same conversation."
    ]),
    relatedVideos: [
      withKey("related-video", "cancer-care-overview", {
        title: "Cancer Care Overview",
        subtitle: "Illustration System",
        media: {
          title: "Cancer Care Overview",
          videoUrl: "/assets/videos/Case studies/Carrum Health case study/CC_Illustration_v5.mp4",
          meta: "Illustration System",
          fit: "contain"
        },
        sectionPlacement: "execution",
        afterParagraph: 0
      }),
      withKey("related-video", "fun-in-the-sun", {
        title: "Fun in the Sun",
        subtitle: "Seasonal Spot",
        media: {
          title: "Fun in the Sun",
          videoUrl: "/assets/videos/Case studies/Carrum Health case study/FunInTheSun_v2.mp4",
          meta: "Seasonal Spot",
          fit: "contain"
        },
        sectionPlacement: "execution",
        afterParagraph: 1
      }),
      withKey("related-video", "mindful-eating", {
        title: "Mindful Eating",
        subtitle: "Wellness Story",
        media: {
          title: "Mindful Eating",
          videoUrl: "/assets/videos/Case studies/Carrum Health case study/CH_Mindful Eating_v2.mp4",
          meta: "Wellness Story",
          fit: "contain"
        },
        sectionPlacement: "execution",
        afterParagraph: 1
      })
    ],
    outcome: pt([
      "From scripting and concept development through art direction, storyboarding, animation, and final delivery, the result was a cohesive library of content built to scale.",
      "Just as importantly, the work helped shift the tone from something that felt closer to corporate insurance toward something more approachable, reassuring, and human. Because healthcare information is already complicated enough."
    ]),
    whatToNotice: pt([
      "Each explainer uses a visual language matched to the sensitivity of the subject, not a one-size template."
    ]),
    featured: true,
    order: 2,
    seoTitle: "Carrum Health – Patient Guide — Lash In Motion",
    seoDescription: "Carrum Health – Patient Guide case study — explainer and education motion built for clarity, trust, and patient understanding."
  },
  {
    _id: "case-study-volley",
    title: "Volley",
    slug: "volley",
    subtitle: "Building the Future Before It Existed",
    category: "Launch Film",
    summary: "A future-facing launch film focused on rhythm, restraint, and making a lean visual toolkit feel bigger than it is.",
    client: "Volley",
    year: "2024",
    role: ["Scripting", "Creative Direction", "Motion"],
    services: ["Scripting", "Creative Direction", "Motion"],
    heroVideo: {
      title: "Volley",
      videoUrl: "/assets/videos/Case studies/Volley Assessment_FINAL_VO and Music.mp4",
      meta: "Launch Film",
      fit: "contain"
    },
    overview: pt([
      "Volley needed a launch video for a smart athletic training platform built around performance tracking, analytics, and real time feedback."
    ]),
    overviewHighlights: [
      withKey("overview-highlight", "volley-focus", {
        label: "Focus",
        body: pt([
          "Build a believable version of the future before the product fully existed on screen."
        ])
      }),
      withKey("overview-highlight", "volley-emphasis", {
        label: "Emphasis",
        tone: "blue",
        body: pt([
          "Editorial structure, AI assisted visuals, interface graphics, and motion tracking."
        ])
      })
    ],
    challenge: pt([
      "Volley needed a launch video for a smart athletic training platform built around performance tracking, analytics, and real time feedback.",
      "There was one problem. Actually, a few.",
      "The available footage only told part of the story, the mobile app was still being developed, and much of the product experience did not fully exist yet in a visual form. The challenge was not simply making a commercial. It was building a believable version of the future with enough clarity and momentum to make people want to be part of it.",
      "Or, put more simply, making missing pieces feel intentional."
    ]),
    approach: pt([
      "Starting from a loose concept, the process quickly expanded into scripting, creative direction, editorial structure, and figuring out how to make limited ingredients feel considerably larger than they were.",
      "The script was written to focus on Volley’s core idea: turning athletic performance into useful, actionable information. Because live action footage was limited, the visual strategy became a blend of original material, carefully selected stock footage, AI assisted visuals, and a consistent layer of motion graphics designed to tie everything together.",
      "The goal was not to hide the seams. The goal was to make them disappear."
    ]),
    execution: pt([
      "A large part of the work centered around creating a visual language that made the platform feel intelligent without becoming overly technical.",
      "Custom interface graphics were designed and tracked directly into footage to visualize performance data, shot placement, body movement, and real time feedback. Standard sports footage became something more cinematic and data driven, helping viewers understand the product without needing it explained twice.",
      "The unfinished mobile app presented another challenge. Since the final interface did not yet exist, placeholder screens were designed with flexibility in mind, allowing the client to seamlessly swap in the finished UI later without rebuilding the piece from scratch.",
      "Sometimes the most useful production tool is planning for the version of the project that does not exist yet."
    ]),
    outcome: pt([
      "From scripting and editorial structure to AI assisted workflows, motion tracking, UI design, and final animation, the result was a launch video that felt considerably bigger than the available materials suggested.",
      "More importantly, the work helped position Volley as more than a training device. It framed the platform as something smarter, more forward looking, and built around measurable progress. Which, in fairness, is exactly what the product was trying to do."
    ]),
    whatToNotice: pt([
      "Interface graphics and tracked data sell the product before the finished app exists on screen."
    ]),
    featured: true,
    order: 3,
    seoTitle: "Volley — Lash In Motion",
    seoDescription: "Volley case study — launch motion built through rhythm, restraint, and clear future-facing storytelling."
  }
];

export const motionPieces: MotionPiece[] = [
  {
    _id: "motion-piece-dirt-road",
    title: "Dirt Road",
    slug: "dirt-road",
    subtitle: "Jaime Harrison Campaign Spot",
    category: "Campaign Film",
    description: pt([
      "A campaign film built around story, memory, and the idea that where people come from still shapes what they fight for. Textured graphics, archival imagery, and symbolic visual moments were used to turn a personal history into something broader: a message about community, progress, and who gets remembered along the way."
    ]),
    video: {
      title: "Dirt Road",
      videoUrl: "/assets/videos/additional-spots/dirt-road.mp4",
      meta: "Campaign Film",
      fit: "contain"
    },
    client: "Jaime Harrison Campaign",
    year: "2020",
    duration: "60s",
    featured: true,
    showOnHomepage: true,
    order: 1,
    groupKey: "campaign-advocacy"
  },
  {
    _id: "motion-piece-focus",
    title: "Focus",
    slug: "focus",
    subtitle: "Paloma Aguirre Campaign",
    category: "Campaign Film",
    description: pt([
      "A warmer, more optimistic campaign piece designed to build trust and reinforce a record of local results. Clean pacing, thoughtful composition, and a lighter visual touch helped the message feel approachable without losing focus."
    ]),
    video: {
      title: "Focus",
      videoUrl: "/assets/videos/additional-spots/focus-paloma-aguirre.mp4",
      meta: "Campaign Film",
      fit: "contain"
    },
    client: "Paloma Aguirre Campaign",
    featured: true,
    showOnHomepage: false,
    order: 2,
    groupKey: "campaign-advocacy"
  },
  {
    _id: "motion-piece-coward",
    title: "Coward",
    slug: "coward",
    subtitle: "Political Persuasion Spot",
    category: "Campaign & Advocacy",
    description: pt([
      "A fast moving political spot built to make an argument quickly and leave very little room for ambiguity.",
      "Using historical evidence, archival material, and carefully structured pacing, the challenge was turning information into momentum without losing clarity somewhere along the way."
    ]),
    video: {
      title: "Coward",
      videoUrl: "/assets/videos/additional-spots/coward-persuasion-spot.mp4",
      meta: "Political Persuasion Spot",
      fit: "contain"
    },
    featured: true,
    showOnHomepage: false,
    order: 3,
    groupKey: "campaign-advocacy"
  },
  {
    _id: "motion-piece-twice",
    title: "Twice",
    slug: "twice",
    subtitle: "Independent Expenditure for Angie Craig",
    category: "Campaign & Advocacy",
    description: pt([
      "A campaign spot built around contrast and repetition to sharpen the choice in front of voters. The challenge was balancing urgency with credibility, allowing critique to land without losing the sense of steadiness the campaign wanted to project."
    ]),
    video: {
      title: "Twice",
      videoUrl: "/assets/videos/additional-spots/twice-angie-craig.mp4",
      meta: "Independent Expenditure",
      fit: "contain"
    },
    client: "Angie Craig",
    featured: true,
    showOnHomepage: false,
    order: 4,
    groupKey: "campaign-advocacy"
  },
  {
    _id: "motion-piece-public-lands",
    title: "Public Lands",
    slug: "public-lands",
    subtitle: "Issue Advocacy Spot",
    category: "Campaign & Advocacy",
    description: pt([
      "An advocacy piece built around scale, urgency, and emotional clarity. Large landscapes and carefully paced messaging worked together to reinforce what was at stake without losing sight of the people connected to it."
    ]),
    video: {
      title: "Public Lands",
      videoUrl: "/assets/videos/additional-spots/public-lands.mp4",
      meta: "Issue Advocacy Spot",
      fit: "contain"
    },
    featured: true,
    showOnHomepage: false,
    order: 5,
    groupKey: "campaign-advocacy"
  },
  {
    _id: "motion-piece-adge-ai",
    title: "Adge.AI",
    slug: "adge-ai",
    subtitle: "Product Sizzle",
    category: "Marketing Intelligence",
    description: pt([
      "A fast-moving product film designed to introduce a complex data platform without making it feel overly technical.",
      "The challenge was connecting abstract ideas, analytics, and marketing intelligence to something people could quickly understand and actually care about. Geometric motion, kinetic layouts, and fluid transitions helped turn large amounts of information into something more visual, intuitive, and considerably easier to follow.",
      "Because data tends to work a little harder when it does not feel like homework."
    ]),
    video: {
      title: "Adge.AI",
      videoUrl: "/assets/videos/ADGE AI_Sizzle_v1.mp4",
      poster: {
        src: "/assets/videos/Adidas Case Study.png",
        alt: "Adge.AI poster"
      },
      meta: "Product Sizzle",
      fit: "contain"
    },
    featured: true,
    showOnHomepage: true,
    order: 6,
    groupKey: "explainers-product"
  },
  {
    _id: "motion-piece-maestro-maintenance",
    title: "Maestro Maintenance",
    slug: "maestro-maintenance",
    subtitle: "Product Explainer",
    category: "Explainer & Education",
    description: pt([
      "A straightforward explainer designed to make a complicated service feel simple, approachable, and easy to understand in under a minute. Sometimes clarity does most of the heavy lifting."
    ]),
    video: {
      title: "Maestro Maintenance",
      videoUrl: "/assets/videos/additional-spots/maestro-maintenance.mp4",
      meta: "Product Explainer",
      fit: "contain"
    },
    featured: true,
    showOnHomepage: false,
    order: 7,
    groupKey: "explainers-product"
  },
  {
    _id: "motion-piece-caymall",
    title: "CayMall – E-Commerce Launch",
    slug: "caymall",
    subtitle: "Communication & Story",
    category: "E-Commerce Launch Video",
    description: pt([
      "A launch film built to introduce a regional online marketplace by connecting customer shopping, merchant tools, and local business into one approachable, easy-to-follow story."
    ]),
    video: {
      title: "CayMall – E-Commerce Launch",
      videoUrl: "/assets/videos/CayMall Promo_60s_v2.mp4",
      meta: "Communication & Story",
      fit: "cover"
    },
    featured: true,
    showOnHomepage: true,
    order: 8,
    groupKey: "brand-launch-editorial"
  },
  {
    _id: "motion-piece-hcg-smores",
    title: "Ho-Chunk Gaming – S'More Camping Adventure",
    slug: "hcg-smores",
    subtitle: "Seasonal Campaign",
    category: "Live Action + 3D",
    description: pt([
      "A promotional campaign spot built around campfires, scratch-offs, and the general idea that marshmallows can apparently become recurring characters.",
      "Blending 3D characters with live action storytelling, the challenge was creating something energetic, memorable, and just whimsical enough to stand out without losing sight of the promotion underneath."
    ]),
    video: {
      title: "HCG S'MORES — Seasonal Campaign",
      videoUrl: "/assets/videos/HCG_SmoresAdventure.mp4",
      meta: "Seasonal Campaign",
      fit: "contain"
    },
    featured: true,
    showOnHomepage: true,
    order: 9,
    groupKey: "brand-launch-editorial"
  },
  {
    _id: "motion-piece-sexy-fun-world",
    title: "Sexy Fun World",
    slug: "sexy-fun-world",
    subtitle: "DTC Social Campaign",
    category: "Brand Motion",
    description: pt([
      "Some projects ask for subtlety. This was not one of them. Built for fast scrolling and short attention spans, this social campaign leaned into bold visuals, quick pacing, and just enough visual chaos to make stopping feel like the easier option."
    ]),
    video: {
      title: "Sexy Fun World",
      videoUrl: "/assets/videos/additional-spots/sexy-fun-world.mp4",
      meta: "DTC Social Campaign",
      fit: "contain"
    },
    featured: true,
    showOnHomepage: false,
    order: 10,
    groupKey: "brand-launch-editorial"
  },
  {
    _id: "motion-piece-carrum-executive-summit-recap",
    title: "Carrum Health – Executive Summit Recap",
    slug: "carrum-executive-summit-recap",
    subtitle: "Executive Summit Recap",
    category: "Editorial Work",
    description: pt([
      "A documentary style event recap designed to capture the tone of a high level healthcare summit without making it feel overly corporate. Real conversations, executive perspectives, and carefully shaped visuals helped turn a conference into something that felt considerably more human."
    ]),
    video: {
      title: "Carrum Health – Executive Summit Recap",
      videoUrl: "/assets/videos/additional-spots/carrum-executive-summit.mp4",
      meta: "Executive Summit Recap",
      fit: "contain"
    },
    client: "Carrum Health",
    featured: true,
    showOnHomepage: false,
    order: 11,
    groupKey: "brand-launch-editorial"
  },
  {
    _id: "motion-piece-league-of-play",
    title: "League of Play",
    slug: "league-of-play",
    subtitle: "Investor Pitch Film",
    category: "Communication & Story",
    description: pt([
      "A presentation built to make an ambitious idea feel tangible. Complex business goals, product features, and growth opportunities were translated into a fast moving visual story designed to hold attention and make the bigger picture easier to understand."
    ]),
    video: {
      title: "League of Play",
      videoUrl: "/assets/videos/additional-spots/league-of-play.mp4",
      meta: "Investor Pitch Film",
      fit: "contain"
    },
    featured: true,
    showOnHomepage: false,
    order: 12,
    groupKey: "brand-launch-editorial"
  },
  {
    _id: "motion-piece-infinite-roar",
    title: "Infinite Roar",
    slug: "infinite-roar",
    subtitle: "Launch Manifesto",
    category: "Hosted on Vimeo",
    description: pt([
      "A launch film designed to introduce a new brand with confidence and a clear sense of ambition.",
      "Built around cinematic pacing, typography, and carefully layered visuals, the goal was to create momentum without simply turning the volume up. Strong brands tend to know who they are. The challenge was making sure that confidence translated onscreen.",
      "There were, admittedly, quite a few lions."
    ]),
    video: {
      title: "Infinite Roar",
      embedUrl: "https://player.vimeo.com/video/1119917202?title=0&byline=0&portrait=0",
      videoUrl: "https://vimeo.com/1119917202",
      meta: "Hosted on Vimeo",
      fit: "embed"
    },
    featured: true,
    showOnHomepage: false,
    order: 13,
    groupKey: "brand-launch-editorial"
  }
];

export const contextPage: ContextPage = {
  pageLabel: "Context",
  pageTitle: "The Person Behind It",
  portraitImage: {
    src: "/assets/images/Greg_Green.jpeg",
    alt: "Portrait of Greg Green"
  },
  portraitName: "Greg Green",
  portraitLocation: "Chicago",
  portraitRole: "Motion + Editorial",
  personHeading: "The Person Behind It",
  personBody: pt([
    "More than a decade in motion design has meant working across a wide range of creative challenges, industries, timelines, and expectations. Some carefully planned. Some held together by deadlines and determination.",
    "Projects have ranged from political campaigns and advocacy efforts to restaurant advertising, educational content, explainers, presentations, promos, and commercial work with very little time and very high expectations. Some projects need energy and momentum. Others need restraint, clarity, or the discipline to simplify something complicated without making it feel simplistic. And then there are some that simply need to be forgotten.",
    "That range has shaped an approach that is both practical and collaborative. Sometimes a project needs support inside an existing team. Sometimes it needs someone who can help shape an idea, solve problems along the way, and carry the work through final delivery. Motion graphics, editing, sound, scripting, and finishing are often part of the same conversation. Occasionally all at once.",
    "The strongest work tends to come from projects where people are genuinely invested in the outcome. Creative work benefits from clear communication, honest feedback, and people who care enough to push for better instead of simply checking the box. Not every project calls for that level of involvement. The ones that do are usually the interesting ones."
  ]),
  whyHeading: "Why This Exists.",
  whyBody: pt([
    "No one is ever going to care more about a project than the people behind it. If the energy is not there, it shows. Creative work has a way of showing exactly where people stopped paying attention.",
    "The best results tend to happen when ideas are met with curiosity, enthusiasm, and a willingness to stay engaged in the process. Projects are developed from concept through final delivery with a hands-on approach that keeps momentum intact from beginning to end. Sometimes that means solving problems before they become problems. Sometimes it means figuring things out in real time.",
    "The goal is never just to make something polished. Plenty of polished things still miss the point. The goal is to make something thoughtful, clear, and worth paying attention to."
  ]),
  whyRows: [
    withKey("why-row", "premise", {
      label: "Premise",
      body: pt([
        "No one is ever going to care more about a project than the people behind it. If the energy is not there, it shows. Creative work has a way of showing exactly where people stopped paying attention."
      ])
    }),
    withKey("why-row", "process", {
      label: "Process",
      tone: "blue",
      body: pt([
        "The best results tend to happen when ideas are met with curiosity, enthusiasm, and a willingness to stay engaged in the process. Projects are developed from concept through final delivery with a hands-on approach that keeps momentum intact from beginning to end. Sometimes that means solving problems before they become problems. Sometimes it means figuring things out in real time."
      ])
    }),
    withKey("why-row", "goal", {
      label: "Goal",
      tone: "yellow",
      body: pt([
        "The goal is never just to make something polished. Plenty of polished things still miss the point. The goal is to make something thoughtful, clear, and worth paying attention to."
      ])
    })
  ]
};

export const makeSomethingPage: MakeSomethingPage = {
  pageLabel: "Make Something.",
  pageTitle: "Have something worth moving?",
  introCopy: "For campaign films, brand motion, editorial pieces, and projects that need clarity from concept to final delivery.",
  contactEmail: "create@lashinmotion.com",
  emailHelperText: "Usually the fastest way.",
  formIntro: "Share the shape of the project, what stage it is in, and what kind of support would be most useful. The form is set up for Web3Forms and can also be swapped to Formspree if needed.",
  projectTypes: [
    "Motion Design",
    "Editing & Storytelling",
    "Campaign & Advocacy",
    "Brand Film",
    "Explainer",
    "Other"
  ],
  budgetRanges: [
    "Under $5k",
    "$5k to $10k",
    "$10k to $25k",
    "$25k+",
    "Not sure yet"
  ],
  timelineOptions: [
    "ASAP",
    "This month",
    "Next 1 to 3 months",
    "Flexible"
  ],
  inquiryLabel: "Inquiry",
  inquiryTitle: "Tell me what needs to move.",
  bestForBody: pt([
    "Campaign films, motion systems, launch pieces, explainers, and editorial projects that need more than surface polish."
  ]),
  contactBody: pt([
    "If email is easier, use create@lashinmotion.com. The form remains the main intake so it can connect cleanly to a simple service."
  ]),
  formButtonText: "Send Inquiry"
};

export const seedContent: SeedContent = {
  siteSettings,
  homepage,
  workPage,
  caseStudies,
  motionPieces,
  contextPage,
  makeSomethingPage
};
