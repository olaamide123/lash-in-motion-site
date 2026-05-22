import type { CTAItem, ColorStyle, RelatedVideo } from "@/lib/types";

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

export function getTextColorClass(colorStyle?: ColorStyle) {
  switch (colorStyle) {
    case "muted":
      return "text-muted";
    case "red":
      return "text-red";
    case "blue":
      return "text-blue";
    case "yellow":
      return "text-yellow";
    case "black":
      return "text-black";
    case "white":
      return "text-white";
    default:
      return "";
  }
}

export function getMarkerColorClass(colorStyle?: ColorStyle) {
  return colorStyle && colorStyle !== "default" ? `marker-${colorStyle}` : "";
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
