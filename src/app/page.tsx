import { CtaControl } from "@/components/CtaControl";
import { SiteFrame } from "@/components/SiteFrame";
import { VideoFigure } from "@/components/VideoFigure";
import {
  getMarkerColorClass,
  getTextColorClass,
  homeCaseClass,
  homeMotionClass,
  joinClasses,
  renderFinalCtaTitle,
  splitPageTitleLines
} from "@/lib/cms-helpers";
import { resolveMotionVideo } from "@/lib/media";
import { getHomepage } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const homepage = await getHomepage();
  const selectedCaseStudies = homepage.selectedCaseStudies ?? [];
  const selectedMotionPieces = homepage.selectedMotionPieces ?? [];
  const whyThisExistsBody = homepage.whyThisExistsBody ?? [];
  const whatMovesItems = homepage.whatMovesItems ?? [];
  const finalTitle = renderFinalCtaTitle(homepage.finalCTATitle || "Have something worth moving?");
  const heroMeta = homepage.heroMetaLine || "Chicago — Motion + Editorial — Reel 2026";
  const [whatMovesLead, whatMovesAccent] = splitPageTitleLines(homepage.whatMovesTitle || "What Moves Here.");
  return (
    <SiteFrame currentPath="/">
      <main id="top">
        <section className="hero" id="reel">
          <span className="geo geo--hero-circle b circle" aria-hidden="true"></span>
          <span className="brand-playhead hero-playhead" aria-hidden="true">
            <span className="brand-square"></span>
          </span>
          <span className="dot-grid hero-dotgrid" aria-hidden="true"></span>
          <span className="motion-path hero-path" aria-hidden="true">
            <svg width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 80 Q 90 -10 178 30" stroke="#121111" strokeWidth="0.9" fill="none" />
              <rect x="86" y="9" width="6" height="6" transform="rotate(45 89 12)" fill="#121111" />
            </svg>
          </span>
          <div className="container">
            <div className="hero-grid">
              <div className="hero-copy">
                <h1 className="h-display">
                  {homepage.heroHeadline.split("\n").map((line, index, lines) => (
                    <span key={`${line}-${index}`}>
                      {line}
                      {index === lines.length - 1 ? (
                        <>
                          {" "}
                          <span
                            className={joinClasses("ed-italic", getTextColorClass(homepage.heroAccentColor))}
                          >
                            {homepage.heroAccentWord}
                          </span>
                        </>
                      ) : (
                        <br />
                      )}
                    </span>
                  ))}
                </h1>
                <p className="hero-sub">{homepage.heroBody}</p>
                <div className="hero-cta-row">
                  <CtaControl cta={homepage.heroPrimaryCTA} className="btn-primary" />
                </div>
                <div className="hero-meta-markers" aria-hidden="true">
                  <span className="swatches">
                    <i className="r"></i>
                    <i className="b"></i>
                    <i className="y"></i>
                  </span>
                  <span>{heroMeta}</span>
                </div>
              </div>

              <VideoFigure
                className="vid hero-vid"
                media={homepage.mainReel}
                topLabel={homepage.heroLabel}
                bottomRight={homepage.mainReel.meta || "Chicago"}
              />
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <span className="geo geo--work-yrect y" aria-hidden="true"></span>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  <span className={joinClasses("red-square", getMarkerColorClass(homepage.selectedWorkEyebrowColor))}></span>
                  <span className={joinClasses("mono", getTextColorClass(homepage.selectedWorkEyebrowColor))}>
                    {homepage.selectedWorkLabel}
                  </span>
                </div>
                <h2 className={joinClasses("section-title", getTextColorClass(homepage.selectedWorkEyebrowColor))}>
                  {homepage.selectedWorkTitle}
                </h2>
                {homepage.selectedWorkSubtitle ? (
                  <p className="section-subtitle">{homepage.selectedWorkSubtitle}</p>
                ) : null}
              </div>
              <div>
                <p className="section-intro">{homepage.selectedWorkIntro}</p>
              </div>
            </div>

            <div className="work-tabs" role="tablist" aria-label="Filter Selected Work">
              <span className="work-tabs-label">View</span>
              <button className="work-tab" role="tab" data-tab="all" aria-selected="true">
                All{" "}
                <span className="count">
                  {String(selectedCaseStudies.length + selectedMotionPieces.length).padStart(2, "0")}
                </span>
              </button>
              <button className="work-tab" role="tab" data-tab="studies" aria-selected="false">
                Case Studies <span className="count">{String(selectedCaseStudies.length).padStart(2, "0")}</span>
              </button>
              <button className="work-tab" role="tab" data-tab="motion" aria-selected="false">
                Shorter Work <span className="count">{String(selectedMotionPieces.length).padStart(2, "0")}</span>
              </button>
            </div>

            <div className="work-section" data-section="studies">
              <div className="work-section-head">
                <div className="section-stack">
                  <div className={joinClasses("section-kicker", getTextColorClass(homepage.caseStudiesSectionAccentColor))}>
                    {homepage.caseStudiesSectionKicker || "The Full Story."}
                  </div>
                  <div className="work-section-eyebrow">
                    <span className={joinClasses("red-square", getMarkerColorClass(homepage.caseStudiesSectionAccentColor))}></span>
                    <span className={joinClasses("mono", getTextColorClass(homepage.caseStudiesSectionAccentColor))}>
                      {homepage.caseStudiesSectionEyebrow || "Case Studies"}
                    </span>
                  </div>
                  <h3 className={joinClasses("work-section-title", getTextColorClass(homepage.caseStudiesSectionAccentColor))}>
                    {homepage.caseStudiesSectionTitle || "Projects That Made the Cut."}
                  </h3>
                </div>
                <p className="work-section-intro">
                  {homepage.caseStudiesSectionIntro || "Some projects benefit from a little more context."}
                </p>
              </div>

              <div className="works">
                {selectedCaseStudies.map((study, index) => (
                  <article key={study.slug} className={homeCaseClass(study.slug, index)}>
                    {index === 0 ? (
                      <>
                        <VideoFigure
                          className="vid video-scale video-scale--left"
                          media={study.heroVideo}
                          topLabel={study.category}
                          bottomRight={study.title}
                        />
                        <div className="work-caption">
                          <h3 className="work-title">{study.title}</h3>
                          <span className="work-cat">
                            <i className={index === 0 ? "sq-red" : "sq-blue"}></i> {study.category}
                          </span>
                          <p className="work-desc">{study.summary}</p>
                          <a className="work-link" href={`/case-studies/${study.slug}`}>
                            <span className="red-square"></span>View Case ↗
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="work-caption">
                          <h3 className="work-title">{study.title}</h3>
                          <span className="work-cat">
                            <i className="sq-blue"></i> {study.category}
                          </span>
                          <p className="work-desc">{study.summary}</p>
                          <a className="work-link" href={`/case-studies/${study.slug}`}>
                            <span className="red-square"></span>View Case ↗
                          </a>
                        </div>
                        <VideoFigure
                          className="vid video-scale video-scale--right"
                          media={study.heroVideo}
                          topLabel={study.title}
                          bottomRight={study.title}
                        />
                      </>
                    )}
                  </article>
                ))}
              </div>

              <div className="view-all-row view-all-row--prominent">
                <a className="btn-primary" href="/work#case-studies">
                  View All Case Studies <span className="arrow">→</span>
                </a>
              </div>
            </div>

            <div className="work-section" data-section="motion">
              <div className="work-section-head">
                <div className="section-stack">
                  <div className={joinClasses("section-kicker", getTextColorClass(homepage.motionSectionAccentColor))}>
                    {homepage.motionSectionKicker || "Shorter Work."}
                  </div>
                  <div className="work-section-eyebrow">
                    <span className="brand-swatches sm" aria-hidden="true">
                      <i className="r"></i>
                      <i className="b"></i>
                      <i className="y"></i>
                    </span>
                    <span className={joinClasses("mono", getTextColorClass(homepage.motionSectionAccentColor))}>
                      {homepage.motionSectionEyebrow || "Standalone Pieces"}
                    </span>
                  </div>
                  <h3 className={joinClasses("work-section-title", getTextColorClass(homepage.motionSectionAccentColor))}>
                    {homepage.motionSectionTitle || "Motion, spots, and standalone pieces."}
                  </h3>
                </div>
                <p className="work-section-intro">
                  {homepage.motionSectionIntro ||
                    "Shorter work that still carries the same attention to pace, clarity, and editorial shape."}
                </p>
              </div>

              <div className="works works--motion">
                {selectedMotionPieces.map((piece, index) => (
                  <article className={homeMotionClass(piece.slug, index)} key={piece.slug}>
                    <div className="work-caption">
                      <h3 className="work-title">{piece.title}</h3>
                      <span className="work-cat">
                        <i className="sq-red"></i> {piece.subtitle}
                      </span>
                      {piece.description.slice(0, 2).map((block) => (
                        <p key={block._key} className="work-desc">
                          {block.children.map((child) => child.text).join("")}
                        </p>
                      ))}
                      <span className="work-link" aria-hidden="true">
                        <span className="red-square"></span>Shorter Work
                      </span>
                    </div>
                    <VideoFigure
                      className={`vid ${index % 2 === 0 ? "video-scale video-scale--left" : "video-scale video-scale--right"}`}
                      media={resolveMotionVideo(piece)}
                      topLabel={piece.video?.label || piece.videoFile?.label || piece.title}
                      bottomRight={piece.category}
                    />
                  </article>
                ))}
              </div>

              <div className="view-all-row view-all-row--prominent">
                <a className="btn-primary" href="/work#motion">
                  View All Short Work <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="why">
          <span className="why-mark" aria-hidden="true"></span>
          <div className="container">
            <div className="section-eyebrow">
              <span className={joinClasses("red-square", getMarkerColorClass(homepage.whyThisExistsAccentColor))}></span>
              <span className={joinClasses("mono", getTextColorClass(homepage.whyThisExistsAccentColor))}>
                {homepage.whyThisExistsLabel}
              </span>
            </div>
            <div className="why-grid">
              <div className="why-body">
                <p>{whyThisExistsBody[0]?.children.map((child) => child.text).join("")}</p>
              </div>
              <div className="why-body">
                {whyThisExistsBody.slice(1).map((block) => (
                  <p key={block._key}>{block.children.map((child) => child.text).join("")}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section moves-section" id="services">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  <span className={joinClasses("red-square", getMarkerColorClass(homepage.whatMovesAccentColor))}></span>
                  <span className={joinClasses("mono", getTextColorClass(homepage.whatMovesAccentColor))}>
                    {homepage.whatMovesLabel}
                  </span>
                </div>
                <h2 className="section-title">
                  {whatMovesLead}
                  {whatMovesAccent ? (
                    <>
                      {" "}
                      <span className={getTextColorClass(homepage.whatMovesAccentColor)}>{whatMovesAccent}</span>
                    </>
                  ) : null}
                </h2>
              </div>
              <div>
                <p className="section-intro">{homepage.whatMovesIntro}</p>
              </div>
            </div>

            <div className="moves-timeline">
              <span className="moves-playhead" aria-hidden="true">
                <span className="ph-square"></span>
              </span>

              {whatMovesItems.map((item, index) => (
                <div
                  className="moves-track"
                  data-color={item.accentColor === "default" ? undefined : item.accentColor}
                  key={`${item.title}-${index}`}
                >
                  <span className="moves-track-marker" aria-hidden="true"></span>
                  <div className="moves-track-num">{item.label || `Track ${String(index + 1).padStart(2, "0")}`}</div>
                  <h3 className="moves-name">{item.title}</h3>
                  <p className="moves-desc">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <span className="brand-playhead contact-playhead" aria-hidden="true">
            <span className="brand-square"></span>
          </span>
          <div className="container">
            <div className="contact-inner">
              <div>
                <h2>
                  {typeof finalTitle === "string" ? (
                    finalTitle
                  ) : (
                    <>
                      {finalTitle.lead}
                      <span
                        className={joinClasses("italic ed-italic", getTextColorClass(homepage.finalCTAAccentColor))}
                      >
                        {finalTitle.accent}
                      </span>
                    </>
                  )}
                </h2>
              </div>
              <div>
                <p className="body">{homepage.finalCTABody}</p>
                <div className="contact-cta-row">
                  <button type="button" className="btn-ghost js-open-reel">
                    <span className={joinClasses("red-square", getMarkerColorClass(homepage.finalCTAAccentColor))}></span>{" "}
                    {homepage.finalCTAButtonText || homepage.mainReelButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
