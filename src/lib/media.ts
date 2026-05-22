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
  const uploadedUrl = video.uploadedVideo?.asset?.url;
  if (uploadedUrl) return uploadedUrl;
  return normalizeMediaPath(video.videoUrl || video.videoUrlOrPath);
}

export function resolveMotionVideo(
  piece?: Pick<MotionPiece, "video" | "videoFile" | "videoUrl" | "resolvedVideoUrl" | "title">
) {
  if (!piece) return undefined;

  if (piece.video) {
    const resolved = resolveVideoSrc(piece.video);
    return {
      ...piece.video,
      videoUrl: resolved || piece.video.videoUrl || piece.video.videoUrlOrPath,
      title: piece.video.title || piece.title
    } satisfies VideoAssetValue;
  }

  if (piece.videoFile) {
    const resolved = resolveVideoSrc(piece.videoFile);
    return {
      ...piece.videoFile,
      videoUrl: resolved || piece.videoFile.videoUrl || piece.videoFile.videoUrlOrPath,
      title: piece.videoFile.title || piece.title
    } satisfies VideoAssetValue;
  }

  if (piece.videoUrl || piece.resolvedVideoUrl) {
    return {
      title: piece.title,
      videoUrl: normalizeMediaPath(piece.videoUrl || piece.resolvedVideoUrl)
    } satisfies VideoAssetValue;
  }

  return undefined;
}
