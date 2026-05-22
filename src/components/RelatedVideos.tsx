import type { RelatedVideo } from "@/lib/types";
import { VideoFigure } from "@/components/VideoFigure";

interface RelatedVideosProps {
  items: RelatedVideo[];
}

export function RelatedVideos({ items }: RelatedVideosProps) {
  if (!items.length) return null;

  return (
    <div
      className={`case-section-media ${items.length === 1 ? "case-section-media--single" : ""}`}
    >
      <div className="archive-grid">
        {items.map((item) => (
          <article className="archive-item" key={`${item.title}-${item.afterParagraph ?? "end"}`}>
            <VideoFigure
              className="vid video-scale video-scale--center"
              media={item.media}
              topLabel={item.title}
              bottomRight={item.media.meta || item.subtitle}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
