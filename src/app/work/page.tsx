import { SiteFrame } from "@/components/SiteFrame";
import { VideoFigure } from "@/components/VideoFigure";
import { splitPageTitleLines } from "@/lib/cms-helpers";
import { resolveMotionVideo } from "@/lib/media";
import { getWorkPage } from "@/lib/sanity/fetch";
import type { MotionPiece } from "@/lib/types";

function linkedVideoCount(study: { relatedVideos?: unknown[]; heroVideo?: unknown }) {
  return (study.heroVideo ? 1 : 0) + (study.relatedVideos?.length || 0);
}

export default async function WorkPage() {
  const workPage = await getWorkPage();
  const [titleLineOne, titleLineTwo] = splitPageTitleLines(workPage.pageTitle || "Selected Work.");

  const piecesByGroup = workPage.motionGroups.map((group) => ({
    ...group,
    items: workPage.featuredMotionPieces
      .filter((piece) => piece.groupKey === group.key)
      .sort((a, b) => a.order - b.order)
  }));

  return (
    <SiteFrame currentPath="/work">
      <main id="top" className="page-work">
        <section className="page-hero page-hero--work">
          <div className="container">
            <div className="page-hero-inner">
              <div>
                <div className="page-kicker">
                  <span className="red-square"></span>
                  <span className="mono">{workPage.pageLabel}</span>
                </div>
                <h1 className="page-title">
                  <span className="page-title-line">{titleLineOne}</span>
                  {titleLineTwo ? <span className="page-title-line">{titleLineTwo}</span> : null}
                </h1>
              </div>
              <div className="page-meta-stack">
                <p className="page-intro">{workPage.introCopy}</p>
                <div className="archive-meta">
                  <span>
                    <span className="sq-red"></span>Motion + Editorial
                  </span>
                  <span>
                    <span className="sq-blue"></span>Hover to preview
                  </span>
                  <span>
                    <span className="sq-yellow"></span>Click for sound
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section page-section--tight-top" id="work-archive">
          <div className="container">
            <div className="work-tabs" role="tablist" aria-label="Filter Work Archive">
              <span className="work-tabs-label">View</span>
              <button className="work-tab" role="tab" data-tab="studies" aria-selected="true">
                Case Studies <span className="count">{String(workPage.featuredCaseStudies.length).padStart(2, "0")}</span>
              </button>
              <button className="work-tab" role="tab" data-tab="motion" aria-selected="false">
                Shorter Work <span className="count">{String(workPage.featuredMotionPieces.length).padStart(2, "0")}</span>
              </button>
            </div>

            <div className="work-section" data-section="studies">
              <div className="section-head">
                <div className="section-stack">
                  <div className="section-kicker">The Full Story.</div>
                  <div className="section-eyebrow">
                    <span className="red-square"></span>
                    <span className="mono">Case Studies</span>
                  </div>
                  <h2 className="section-title">{workPage.caseStudiesSectionTitle}</h2>
                </div>
                <p className="section-intro">{workPage.caseStudiesSectionSubtitle}</p>
              </div>

              <div className="case-card-grid case-card-grid--editorial" id="case-studies">
                {workPage.featuredCaseStudies.map((study, index) => (
                  <article
                    key={study.slug}
                    className={
                      index === 0
                        ? "case-card case-card--featured"
                        : index === 1
                          ? "case-card case-card--stacked"
                          : "case-card case-card--stacked case-card--offset"
                    }
                  >
                    <VideoFigure
                      className="case-card-visual vid video-scale video-scale--center"
                      media={study.heroVideo}
                      topLabel={study.title}
                      bottomRight={study.title}
                    />
                    <div className="case-card-copy">
                      <h3 className="case-card-title">{study.title}</h3>
                      <div className="case-meta">
                        <span>{study.category}</span>
                        <span>{linkedVideoCount(study)} linked videos</span>
                      </div>
                      <p className="page-body">{study.summary}</p>
                      <a className="link-arrow" href={`/case-studies/${study.slug}`}>
                        <span className="red-square"></span>View Case
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="work-section" data-section="motion">
              <div className="section-head">
                <div className="section-stack">
                  <div className="section-kicker">Shorter Work.</div>
                  <div className="section-eyebrow">
                    <span className="brand-swatches sm" aria-hidden="true">
                      <i className="r"></i>
                      <i className="b"></i>
                      <i className="y"></i>
                    </span>
                    <span className="mono">Standalone Pieces</span>
                  </div>
                  <h2 className="section-title">{workPage.motionSectionTitle}</h2>
                </div>
                <p className="section-intro">{workPage.motionSectionSubtitle}</p>
              </div>

              <div className="motion-groups" id="motion">
                {piecesByGroup.map((group) => (
                  <section className="motion-group" aria-labelledby={`motion-group-${group.key}`} key={group.key}>
                    <div className="motion-group-head">
                      <div>
                        <p className="motion-group-label">{group.label}</p>
                        <h3 className="motion-group-title" id={`motion-group-${group.key}`}>
                          {group.title}
                        </h3>
                      </div>
                      <p className="motion-group-copy">{group.body}</p>
                    </div>

                    <div className="archive-grid motion-gallery">
                      {group.items.map((piece, index) => (
                        <MotionArchiveItem key={piece.slug} piece={piece} index={index} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

function MotionArchiveItem({ piece, index }: { piece: MotionPiece; index: number }) {
  const media = resolveMotionVideo(piece);
  const layoutClass =
    index === 0
      ? "archive-item archive-item--feature is-wide"
      : index === 1
        ? "archive-item archive-item--tall is-narrow"
        : index === 2
          ? "archive-item archive-item--compact is-narrow"
          : index === 3
            ? "archive-item is-wide"
            : index === 4
              ? "archive-item archive-item--compact is-narrow"
              : index === 5
                ? "archive-item archive-item--wide-shift is-wide"
                : "archive-item archive-item--feature-alt is-wide";

  const externalUrl = piece.videoFile?.videoUrl || piece.videoUrl || piece.resolvedVideoUrl;

  return (
    <article className={layoutClass}>
      <VideoFigure
        className="vid video-scale video-scale--center"
        media={media}
        topLabel={piece.title}
        bottomRight={piece.videoFile?.meta || piece.subtitle}
      />
      <div className="archive-caption">
        <h3 className={`archive-title${index === 1 || index === 2 || index === 4 ? " small" : ""}`}>
          {piece.title}
        </h3>
        <div className="archive-meta">
          <span>{piece.subtitle}</span>
          <span>{piece.category}</span>
          {piece.year ? <span>{piece.year}</span> : null}
          {piece.duration ? <span>{piece.duration}</span> : null}
        </div>
        {piece.description.map((block) => (
          <p className="page-body" key={block._key}>
            {block.children.map((child) => child.text).join("")}
          </p>
        ))}
        {media?.embedUrl && externalUrl ? (
          <a className="link-arrow" href={externalUrl} target="_blank" rel="noreferrer">
            <span className="red-square"></span>Watch on Vimeo
          </a>
        ) : null}
      </div>
    </article>
  );
}
