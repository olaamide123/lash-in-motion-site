import type { ImageAssetValue, MotionPiece, VideoAssetValue } from "@/lib/types";
import { imageBuilder } from "@/lib/sanity/client";

export type SanityImageAsset = ImageAssetValue & {
  image?: { asset?: { _ref?: string; url?: string } };
};

export type SanityVideoAsset = VideoAssetValue & {
  videoFile?: { asset?: { url?: string } };
};

export function resolveImageSrc(image?: SanityImageAsset) {
  if (!image) return undefined;
  if (image.image?.asset) {
    try {
      const asset = image.image.asset;
      if ("url" in asset && asset.url) return asset.url;
      return imageBuilder.image(image.image).url();
    } catch {
      return image.src;
    }
  }
  return image.src;
}

export function resolvePosterSrc(poster?: SanityImageAsset) {
  return resolveImageSrc(poster);
}

export function resolveVideoSrc(video?: SanityVideoAsset) {
  if (!video) return undefined;
  return video.videoFile?.asset?.url || video.videoUrl;
}

export function resolveMotionVideo(piece?: Pick<MotionPiece, "videoFile" | "videoUrl" | "title">) {
  if (!piece) return undefined;
  if (piece.videoFile) {
    return {
      ...piece.videoFile,
      videoUrl: piece.videoFile.videoUrl || piece.videoUrl,
      title: piece.videoFile.title || piece.title
    } satisfies VideoAssetValue & SanityVideoAsset;
  }
  if (piece.videoUrl) {
    return {
      videoUrl: piece.videoUrl,
      title: piece.title
    } satisfies VideoAssetValue;
  }
  return undefined;
}
