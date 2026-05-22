import { Fragment, type ReactNode } from "react";

import { PortableText } from "@portabletext/react";

import { RelatedVideos } from "@/components/RelatedVideos";
import type { RelatedVideo, RichTextBlock, Tone } from "@/lib/types";

const inlineComponents = {
  block: {
    normal: ({ children }: { children?: ReactNode }) => <p>{children}</p>
  }
};

interface CaseStudySectionProps {
  label: string;
  body?: RichTextBlock[];
  relatedVideos?: RelatedVideo[];
  continuation?: boolean;
  tone?: Tone;
}

export function CaseStudySection({
  label,
  body = [],
  relatedVideos = [],
  continuation = false
}: CaseStudySectionProps) {
  const byParagraph = new Map<number, RelatedVideo[]>();
  const trailing: RelatedVideo[] = [];

  relatedVideos.forEach((item) => {
    if (typeof item.afterParagraph === "number") {
      const existing = byParagraph.get(item.afterParagraph) || [];
      existing.push(item);
      byParagraph.set(item.afterParagraph, existing);
    } else {
      trailing.push(item);
    }
  });

  return (
    <section className="case-section">
      <div className="container">
        <div className={`case-section-grid${continuation ? " case-section-grid--continuation" : ""}`}>
          <div className="case-section-label">
            <span className="marker"></span>
            {label}
          </div>
          <div className="case-section-content">
            {body.map((block, index) => (
              <Fragment key={block._key}>
                <PortableText value={[block]} components={inlineComponents} />
                {byParagraph.get(index)?.length ? <RelatedVideos items={byParagraph.get(index) || []} /> : null}
              </Fragment>
            ))}
          </div>
        </div>
        {trailing.length ? <RelatedVideos items={trailing} /> : null}
      </div>
    </section>
  );
}
