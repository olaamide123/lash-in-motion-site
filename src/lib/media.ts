import { isValidMediaPath } from "@/sanity/validation";
import type { ImageAssetValue, MotionPiece, VideoAssetValue } from "@/lib/types";
import { imageBuilder } from "@/lib/sanity/client";

export type SanityImageAsset = ImageAssetValue & {
  image?: { asset?: { _ref?: string; url?: string } };
};

export type SanityVideoAsset = VideoAssetValue;

function normalizeMediaPath(value?: string) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed || !isValidMediaPath(trimmed)) return undefined;
  return trimmed;
}

export function resolveImageSrc(image?: SanityImageAsset) {
  if (!image) return undefined;

  if (image.image?.asset) {
    try {
      const asset = image.image.asset;
      if ("url" in asset && asset.url) return asset.url;
      return imageBuilder.image(image.image).url();
    } catch {
      return normalizeMediaPath(image.src);
    }
  }

  return normalizeMediaPath(image.src);
}

export function resolvePosterSrc(poster?: SanityImageAsset) {
  return resolveImageSrc(poster);
}

/** Resolved URL from external URL or local /assets/ path */
export function resolveVideoSrc(video?: SanityVideoAsset) {
  if (!video) return undefined;
  return normalizeMediaPath(video.videoUrlOrPath);
}

export function resolveMotionVideo(
  piece?: Pick<MotionPiece, "video" | "title">
) {
  if (!piece) return undefined;

  if (piece.video) {
    const resolved = resolveVideoSrc(piece.video);
    return {
      ...piece.video,
      videoUrlOrPath: resolved || piece.video.videoUrlOrPath,
      title: piece.video.title || piece.title
    } satisfies VideoAssetValue;
  }

  return undefined;
}
