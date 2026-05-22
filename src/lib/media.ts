import { isValidMediaPath } from "@/sanity/validation";
import type { ImageAssetValue, MotionPiece, VideoAssetValue } from "@/lib/types";
import { imageBuilder } from "@/lib/sanity/client";

export type SanityImageAsset = ImageAssetValue & {
  image?: { asset?: { _ref?: string; url?: string } };
};

export type SanityVideoAsset = VideoAssetValue & {
  /** Sanity `file` upload on videoAssetValue */
  videoFile?: { asset?: { url?: string } };
};

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

/** Resolved URL from Sanity file upload, external URL, or local /assets/ path */
export function resolveVideoSrc(video?: SanityVideoAsset) {
  if (!video) return undefined;

  const uploadedFileUrl = video.videoFile?.asset?.url;
  if (uploadedFileUrl) return uploadedFileUrl;

  return normalizeMediaPath(video.videoUrl);
}

export function resolveMotionVideo(
  piece?: Pick<MotionPiece, "videoFile" | "videoUrl" | "resolvedVideoUrl" | "title">
) {
  if (!piece) return undefined;

  const rootUrl = normalizeMediaPath(piece.resolvedVideoUrl || piece.videoUrl);

  if (piece.videoFile) {
    const nested: SanityVideoAsset = {
      ...piece.videoFile,
      videoUrl: piece.videoFile.videoUrl || rootUrl
    };
    const resolved = resolveVideoSrc(nested);
    return {
      ...piece.videoFile,
      videoUrl: resolved || rootUrl,
      title: piece.videoFile.title || piece.title
    } satisfies VideoAssetValue & SanityVideoAsset;
  }

  if (rootUrl) {
    return {
      videoUrl: rootUrl,
      title: piece.title
    } satisfies VideoAssetValue;
  }

  return undefined;
}
