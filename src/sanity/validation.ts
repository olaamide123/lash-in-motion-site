import type { StringRule } from "sanity";

/** External http(s):// URLs or root-relative local assets under /assets/ */
export const MEDIA_PATH_PATTERN = /^(?:\/assets\/.+|https?:\/\/.+)$/;

export function isValidMediaPath(value: unknown) {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return true;
  return MEDIA_PATH_PATTERN.test(trimmed);
}

/** Fallback image/video paths and external media URLs */
export const mediaPathValidation = (rule: StringRule) =>
  rule.custom((value) => {
    if (!isValidMediaPath(value)) {
      return 'Use http:// or https://, or a local path starting with /assets/ (e.g. /assets/videos/file.mp4).';
    }
    return true;
  });

/** Embed players (Vimeo, etc.) — external https only, not local /assets/ paths */
const EMBED_URL_PATTERN = /^https?:\/\//;

export const embedUrlValidation = (rule: StringRule) =>
  rule.custom((value) => {
    if (value === undefined || value === null || value === "") return true;
    if (typeof value !== "string") {
      return "Embed URL must start with http:// or https:// (e.g. a Vimeo player URL).";
    }
    const trimmed = value.trim();
    if (!trimmed) return true;
    if (EMBED_URL_PATTERN.test(trimmed)) return true;
    return "Embed URL must start with http:// or https:// (e.g. a Vimeo player URL).";
  });
