import type { VideoAssetValue } from "@/lib/types";
import { resolveVideoSrc } from "@/lib/media";

interface VideoFigureProps {
  media?: VideoAssetValue & { videoFile?: { asset?: { url?: string } } };
  className?: string;
  frameClassName?: string;
  topLabel?: string;
  bottomRight?: string;
}

export function VideoFigure({
  media,
  className,
  frameClassName,
  topLabel,
  bottomRight
}: VideoFigureProps) {
  if (!media) return null;

  const source = resolveVideoSrc(media);
  const fitClass =
    media.fit === "cover"
      ? "vid-frame--cover"
      : media.fit === "embed"
        ? "vid-frame--embed"
        : "vid-frame--contain";

  const frameClasses = ["vid-frame", fitClass, frameClassName].filter(Boolean).join(" ");
  const label = topLabel || media.label || media.title;
  const meta = bottomRight || media.meta;

  return (
    <figure className={className}>
      {media.embedUrl ? (
        <div className={frameClasses}>
          <span className="crops" aria-hidden="true">
            <i></i>
            <i></i>
          </span>
          <div className="vid-frame__inner">
            <iframe
              src={media.embedUrl}
              title={media.title || "Embedded video"}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {label ? <span className="vid-label tl">{label}</span> : null}
        </div>
      ) : source ? (
        <div className={`${frameClasses} js-video`} data-src={source} data-title={media.title || label || "Video"}>
          <span className="crops" aria-hidden="true">
            <i></i>
            <i></i>
          </span>
          <div className="vid-frame__inner">
            <video
              muted
              loop
              playsInline
              preload="metadata"
              poster={media.poster?.src}
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
            >
              <source src={source} type="video/mp4" />
            </video>
          </div>
          {label ? <span className="vid-label tl">{label}</span> : null}
          <div className="v-play">
            <div className="ring">
              <div className="tri"></div>
            </div>
          </div>
          <span className="vid-hint">
            <span className="dot"></span>
            <span data-hint>Hover to preview</span>
          </span>
          <span className="vid-click" data-click>
            Click for sound
          </span>
          <div className="v-progress">
            <div className="ticks"></div>
            <div className="bar"></div>
            <div className="marker"></div>
          </div>
        </div>
      ) : null}
      {meta ? (
        <div className="vid-bot">
          <div className="vid-bot__left"></div>
          <div className="vid-bot__right">
            <span>{meta}</span>
          </div>
        </div>
      ) : null}
    </figure>
  );
}
