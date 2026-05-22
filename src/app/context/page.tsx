import { RichTextContent } from "@/components/RichTextContent";
import { SiteFrame } from "@/components/SiteFrame";
import { getMarkerColorClass, getTextColorClass, joinClasses } from "@/lib/cms-helpers";
import { getContextPage } from "@/lib/sanity/fetch";
import { resolveImageSrc } from "@/lib/media";

export default async function ContextPage() {
  const context = await getContextPage();
  const personBody = context.personBody ?? [];
  const whyBody = context.whyBody ?? [];
  const whyRows = context.whyRows ?? [];
  const portraitSrc = resolveImageSrc(context.portraitImage);
  const portraitName = context.portraitName || "Greg Green";
  const portraitLocation = context.portraitLocation || "Chicago";
  const portraitRole = context.portraitRole || "Motion + Editorial";
  const showWhyBody = whyBody.length > 0 && whyRows.length === 0;

  return (
    <SiteFrame currentPath="/context">
      <main id="top">
        <section className="page-hero page-hero--context">
          <div className="container">
            <div className="page-hero-inner">
              <div>
                <div className="page-kicker">
                  <span className={joinClasses("red-square", getMarkerColorClass(context.pageAccentColor))}></span>
                  <span className={joinClasses("mono", getTextColorClass(context.pageAccentColor))}>
                    {context.pageLabel}
                  </span>
                </div>
              </div>
              <div className="page-meta-stack">
                <div className="archive-meta">
                  <span>
                    <span className="sq-red"></span>Motion + Editorial
                  </span>
                  <span>
                    <span className="sq-blue"></span>{context.whyHeading}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section page-section--tight-top">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  <span className={joinClasses("red-square", getMarkerColorClass(context.personAccentColor))}></span>
                  <span className={joinClasses("mono", getTextColorClass(context.personAccentColor))}>
                    {context.personHeading}
                  </span>
                </div>
                <h2 className={joinClasses("section-title", getTextColorClass(context.personAccentColor))}>
                  {context.pageTitle || context.personHeading}
                </h2>
              </div>
            </div>

            <div className="context-layout">
              <RichTextContent value={personBody} className="prose-stack" />

              <div className="portrait-card">
                <div className={`portrait-frame${portraitSrc ? "" : " is-missing"}`}>
                  {portraitSrc ? (
                    <img src={portraitSrc} alt={context.portraitImage.alt || portraitName} loading="lazy" />
                  ) : null}
                  {!portraitSrc ? <span className="portrait-fallback">Add portrait image</span> : null}
                </div>
                <div className="archive-caption">
                  <div className="archive-meta">
                    <span>{portraitName}</span>
                    <span>{portraitLocation}</span>
                    <span>{portraitRole}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section">
          <span className="why-mark" aria-hidden="true"></span>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  <span className={joinClasses("red-square", getMarkerColorClass(context.whyAccentColor))}></span>
                  <span className={joinClasses("mono", getTextColorClass(context.whyAccentColor))}>
                    {context.whyHeading}
                  </span>
                </div>
                <h2 className={joinClasses("section-title", getTextColorClass(context.whyAccentColor))}>
                  Why This <span className="ed-italic">Exists.</span>
                </h2>
              </div>
            </div>

            {showWhyBody ? <RichTextContent value={whyBody} className="prose-stack" /> : null}

            <div className="timeline-list">
              {whyRows.map((row) => (
                <div className="timeline-row" data-tone={row.tone === "default" ? undefined : row.tone} key={row.label}>
                  <div className="timeline-row-label">
                    <span className="marker"></span>
                    {row.label}
                  </div>
                  <RichTextContent value={row.body} className="prose-stack" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-cta">
          <div className="container">
            <div className="page-cta-grid">
              <div>
                <div className="section-eyebrow">
                  <span className="red-square"></span>
                  <span className="mono">Next</span>
                </div>
                <h2 className="section-title">
                  If the project matters, the process should <span className="ed-italic">too.</span>
                </h2>
              </div>
              <div className="section-actions">
                <p className="page-body">For campaign films, brand motion, editorial pieces, and projects that need clarity from concept to final delivery.</p>
                <a className="btn-primary" href="/make-something">
                  Make Something. <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
