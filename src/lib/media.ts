import type { ImageAssetValue, VideoAssetValue } from "@/lib/types";
import { imageBuilder } from "@/lib/sanity/client";

export function resolveImageSrc(image?: ImageAssetValue & { image?: { asset?: unknown } }) {
  if (!image) return undefined;
  if (image.image?.asset) {
    try {
      return imageBuilder.image(image.image).url();
    } catch {
      return image.src;
    }
  }
  return image.src;
}

export function resolveVideoSrc(video?: VideoAssetValue & { videoFile?: { asset?: { url?: string } } }) {
  if (!video) return undefined;
  return video.videoFile?.asset?.url || video.videoUrl;
}
