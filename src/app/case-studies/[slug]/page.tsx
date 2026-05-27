import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";

import { CaseStudySection } from "@/components/CaseStudySection";
import { RelatedVideos } from "@/components/RelatedVideos";
import { RichTextContent } from "@/components/RichTextContent";
import { SiteFrame } from "@/components/SiteFrame";
import { VideoFigure } from "@/components/VideoFigure";
import { groupRelatedVideos } from "@/lib/cms-helpers";
import { resolveImageSrc } from "@/lib/media";
import { getCaseStudies, getCaseStudyBySlug, getSiteSettings } from "@/lib/sanity/fetch";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({
    slug: study.slug
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study"
    };
  }

  return {
    title: study.seoTitle || study.title,
    description: study.seoDescription || study.summary
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [study, allStudies, settings] = await Promise.all([
    getCaseStudyBySlug(slug),
    getCaseStudies(),
    getSiteSettings()
  ]);
  const labels = settings.uiLabels ?? {};

  if (!study) notFound();

  const role = study.role ?? [];
  const services = study.services ?? [];
  const overview = study.overview ?? [];
  const challenge = study.challenge ?? [];
  const approach = study.approach ?? [];
  const execution = study.execution ?? [];
  const outcome = study.outcome ?? [];
  const overviewHighlights = study.overviewHighlights ?? [];
  const nextStudy = allStudies
    .sort((a, b) => a.order - b.order)
    .find((item) => item.order > study.order);

  const sectionVideos = (section: string) =>
    (study.relatedVideos || []).filter((item) => (item.sectionPlacement || "execution") === section);

  const overviewVideos = sectionVideos("overview");
  const { byParagraph: overviewByParagraph, trailing: overviewTrailing } = groupRelatedVideos(overviewVideos);
  const heroImageSrc = resolveImageSrc(study.heroImage);
  const servicesLabel =
    services.length && services.join(", ") !== role.join(", ")
      ? services.join(", ")
      : null;

  return (
    <SiteFrame currentPath="/work">
      <main>
        <section className="case-hero">
          <div className="container">
            <div className="case-hero-grid">
              <div>
                <div className="page-kicker">
                  <span className="red-square"></span>
                  <span className="mono">{labels.caseStudyKickerLabel || "Case Study"}</span>
                </div>
                <h1 className="page-title">{study.title}</h1>
                <p className="case-summary">{study.subtitle}</p>
                {study.summary ? <p className="page-body">{study.summary}</p> : null}
                <div className="case-actions" style={{ marginTop: 20 }}>
                  <a className="btn-primary" href="#main-video">
                    {labels.viewMotionLabel || "View Motion"} <span className="arrow">→</span>
                  </a>
                  <a className="btn-ghost" href="/work#case-studies">
                    <span className="red-square"></span>{labels.backToWorkLabel || "Back to Work"}
                  </a>
                </div>
              </div>
              <div className="case-stat-grid">
                {study.client ? (
                  <div className="case-stat">
                    <span className="case-stat-label">Client</span>
                    <span className="case-stat-value">{study.client}</span>
                  </div>
                ) : null}
                {study.year ? (
                  <div className="case-stat">
                    <span className="case-stat-label">Year</span>
                    <span className="case-stat-value">{study.year}</span>
                  </div>
                ) : null}
                <div className="case-stat">
                  <span className="case-stat-label">Role</span>
                  <span className="case-stat-value">{role.join(", ")}</span>
                </div>
                {servicesLabel ? (
                  <div className="case-stat">
                    <span className="case-stat-label">Services</span>
                    <span className="case-stat-value">{servicesLabel}</span>
                  </div>
                ) : (
                  <div className="case-stat">
                    <span className="case-stat-label">Category</span>
                    <span className="case-stat-value">{study.category}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {study.heroVideo ? (
          <section className="page-section page-section--tight-top case-main-media" id="main-video">
            <div className="container">
              <VideoFigure
                className="vid video-scale video-scale--center"
                media={study.heroVideo}
                topLabel={study.title}
                bottomRight={study.heroVideo.meta || study.category}
              />
            </div>
          </section>
        ) : heroImageSrc ? (
          <section className="page-section page-section--tight-top case-main-media" id="main-video">
            <div className="container">
              <figure className="vid video-scale video-scale--center">
                <img src={heroImageSrc} alt={study.heroImage?.alt || study.title} loading="lazy" />
              </figure>
            </div>
          </section>
        ) : null}

        <section className="page-section">
          <div className="container">
            <div className="case-overview-grid">
              <div className="info-panel">
                <div className="section-eyebrow">
                  <span className="red-square"></span>
                  <span className="mono">{labels.overviewSectionLabel || "Overview"}</span>
                </div>
                {overview.map((block, index) => (
                  <Fragment key={block._key}>
                    <RichTextContent value={[block]} className="overview-copy" />
                    {overviewByParagraph.get(index)?.length ? (
                      <RelatedVideos items={overviewByParagraph.get(index) || []} />
                    ) : null}
                  </Fragment>
                ))}
              </div>
              <div className="timeline-list">
                {overviewHighlights.map((row) => (
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
            {overviewTrailing.length ? <RelatedVideos items={overviewTrailing} /> : null}
          </div>
        </section>

        <CaseStudySection label={labels.challengeSectionLabel || "The Challenge"} body={challenge} relatedVideos={sectionVideos("challenge")} />
        <CaseStudySection label={labels.approachSectionLabel || "The Approach"} body={approach} relatedVideos={sectionVideos("approach")} />
        <CaseStudySection label={labels.executionSectionLabel || "The Execution"} body={execution} relatedVideos={sectionVideos("execution")} />
        <CaseStudySection label={labels.outcomeSectionLabel || "The Outcome"} body={outcome} relatedVideos={sectionVideos("outcome")} />

        {study.whatToNotice?.length ? (
          <CaseStudySection label={labels.whatToNoticeSectionLabel || "What to Notice"} body={study.whatToNotice} />
        ) : null}

        <section className="page-section">
          <div className="container">
            <div className="back-row">
              <a className="link-arrow" href="/work#case-studies">
                <span className="red-square"></span>{labels.backToWorkLabel || "Back to Work"}
              </a>
              {nextStudy ? (
                <a className="link-arrow" href={`/case-studies/${nextStudy.slug}`}>
                  <span className="red-square"></span>{labels.nextCaseLabel || "Next Case:"} {nextStudy.title}
                </a>
              ) : (
                <a className="link-arrow" href="/make-something">
                  <span className="red-square"></span>{labels.makeSomethingLabel || "Make Something."}
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
