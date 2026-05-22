import type { CTAItem, RelatedVideo, ThemeColorToken, ThemeColors } from "@/lib/types";

export function isReelCta(cta?: CTAItem) {
  if (!cta) return false;
  return cta.action === "reel" || (!cta.href && cta.action !== "link");
}

export function splitPageTitleLines(title: string) {
  const trimmed = title.trim();
  if (!trimmed) return ["", ""];
  const words = trimmed.replace(/\.$/, "").split(/\s+/);
  if (words.length <= 1) return [trimmed, ""];
  const lastWord = words.pop() || "";
  return [words.join(" "), `${lastWord}.`];
}

export function renderFinalCtaTitle(title: string) {
  const match = title.match(/^(.*?)(worth moving\??)$/i);
  if (!match) return title;
  return { lead: match[1], accent: match[2] };
}

export const HOME_CASE_CLASS: Record<string, string> = {
  move: "work work--move",
  "carrum-health-patient-guide": "work work--volley",
  volley: "work work--volley"
};

export const HOME_MOTION_CLASS: Record<string, string> = {
  "adge-ai": "work work--motion work--motion-a",
  caymall: "work work--motion work--motion-b",
  "hcg-smores": "work work--motion work--motion-c",
  "dirt-road": "work work--motion work--motion-d"
};

export function homeCaseClass(slug: string, index: number) {
  return HOME_CASE_CLASS[slug] || (index % 2 === 0 ? "work work--move" : "work work--volley");
}

export function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const themeTokenValues: Record<ThemeColorToken, string> = {
  offWhite: "#f4efe4",
  black: "#121111",
  mutedGray: "#8a847b",
  red: "#FF2D20",
  blue: "#0057D9",
  yellow: "#FFD400",
  dark: "#0c0a08",
  white: "#ffffff"
};

const defaultThemeColors: Required<ThemeColors> = {
  backgroundColor: "offWhite",
  surfaceColor: "offWhite",
  headingColor: "black",
  bodyTextColor: "black",
  mutedTextColor: "mutedGray",
  primaryAccentColor: "red",
  secondaryAccentColor: "blue",
  tertiaryAccentColor: "yellow",
  buttonBackgroundColor: "black",
  buttonTextColor: "offWhite",
  linkColor: "black",
  borderColor: "black",
  darkSectionBackground: "dark",
  darkSectionTextColor: "offWhite"
};

function resolveThemeToken(token: ThemeColorToken | undefined, fallback: ThemeColorToken) {
  return themeTokenValues[token || fallback];
}

export function getThemeColorValues(themeColors?: ThemeColors) {
  const merged = {
    ...defaultThemeColors,
    ...themeColors
  };

  return {
    "--color-background": resolveThemeToken(merged.backgroundColor, "offWhite"),
    "--color-surface": resolveThemeToken(merged.surfaceColor, "offWhite"),
    "--color-heading": resolveThemeToken(merged.headingColor, "black"),
    "--color-body": resolveThemeToken(merged.bodyTextColor, "black"),
    "--color-muted": resolveThemeToken(merged.mutedTextColor, "mutedGray"),
    "--color-accent-primary": resolveThemeToken(merged.primaryAccentColor, "red"),
    "--color-accent-secondary": resolveThemeToken(merged.secondaryAccentColor, "blue"),
    "--color-accent-tertiary": resolveThemeToken(merged.tertiaryAccentColor, "yellow"),
    "--color-button-bg": resolveThemeToken(merged.buttonBackgroundColor, "black"),
    "--color-button-text": resolveThemeToken(merged.buttonTextColor, "offWhite"),
    "--color-link": resolveThemeToken(merged.linkColor, "black"),
    "--color-border": resolveThemeToken(merged.borderColor, "black"),
    "--color-dark-bg": resolveThemeToken(merged.darkSectionBackground, "dark"),
    "--color-dark-text": resolveThemeToken(merged.darkSectionTextColor, "offWhite")
  };
}

export function groupRelatedVideos(videos: RelatedVideo[]) {
  const byParagraph = new Map<number, RelatedVideo[]>();
  const trailing: RelatedVideo[] = [];

  videos.forEach((item) => {
    if (typeof item.afterParagraph === "number") {
      const existing = byParagraph.get(item.afterParagraph) || [];
      existing.push(item);
      byParagraph.set(item.afterParagraph, existing);
    } else {
      trailing.push(item);
    }
  });

  return { byParagraph, trailing };
}

export function homeMotionClass(slug: string, index: number) {
  const motionClasses = [
    "work work--motion work--motion-a",
    "work work--motion work--motion-b",
    "work work--motion work--motion-c",
    "work work--motion work--motion-d"
  ];
  return HOME_MOTION_CLASS[slug] || motionClasses[index] || "work work--motion";
}
