import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudySection } from "@/components/CaseStudySection";
import { RichTextContent } from "@/components/RichTextContent";
import { SiteFrame } from "@/components/SiteFrame";
import { VideoFigure } from "@/components/VideoFigure";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/sanity/fetch";

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
      title: "Case Study — Lash In Motion"
    };
  }

  return {
    title: study.seoTitle || `${study.title} — Lash In Motion`,
    description: study.seoDescription || study.summary
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  const allStudies = await getCaseStudies();

  if (!study) notFound();

  const nextStudy = allStudies
    .sort((a, b) => a.order - b.order)
    .find((item) => item.order > study.order);

  const sectionVideos = (section: string) =>
    (study.relatedVideos || []).filter((item) => (item.sectionPlacement || "execution") === section);

  return (
    <SiteFrame currentPath="/work">
      <main>
        <section className="case-hero">
          <div className="container">
            <div className="case-hero-grid">
              <div>
                <div className="page-kicker">
                  <span className="red-square"></span>
                  <span className="mono">Case Study</span>
                </div>
                <h1 className="page-title">{study.title}</h1>
                <p className="case-summary">{study.subtitle}</p>
                <div className="case-actions" style={{ marginTop: 20 }}>
                  <a className="btn-primary" href="#main-video">
                    View Motion <span className="arrow">→</span>
                  </a>
                  <a className="btn-ghost" href="/work#case-studies">
                    <span className="red-square"></span>Back to Work
                  </a>
                </div>
              </div>
              <div className="case-stat-grid">
                <div className="case-stat">
                  <span className="case-stat-label">Role</span>
                  <span className="case-stat-value">{study.role.join(", ")}</span>
                </div>
                <div className="case-stat">
                  <span className="case-stat-label">Category</span>
                  <span className="case-stat-value">{study.category}</span>
                </div>
                <div className="case-stat">
                  <span className="case-stat-label">Videos</span>
                  <span className="case-stat-value">
                    {(study.heroVideo ? 1 : 0) + (study.relatedVideos?.length || 0)}
                  </span>
                </div>
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
        ) : null}

        <section className="page-section">
          <div className="container">
            <div className="case-overview-grid">
              <div className="info-panel">
                <div className="section-eyebrow">
                  <span className="red-square"></span>
                  <span className="mono">Overview</span>
                </div>
                <RichTextContent value={study.overview} className="overview-copy" />
              </div>
              <div className="timeline-list">
                {(study.overviewHighlights || []).map((row) => (
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
          </div>
        </section>

        <CaseStudySection label="The Challenge" body={study.challenge} relatedVideos={sectionVideos("challenge")} />
        <CaseStudySection label="The Approach" body={study.approach} relatedVideos={sectionVideos("approach")} />
        <CaseStudySection label="The Execution" body={study.execution} relatedVideos={sectionVideos("execution")} />
        <CaseStudySection label="The Outcome" body={study.outcome} relatedVideos={sectionVideos("outcome")} />

        <section className="page-section">
          <div className="container">
            <div className="back-row">
              <a className="link-arrow" href="/work#case-studies">
                <span className="red-square"></span>Back to Work
              </a>
              {nextStudy ? (
                <a className="link-arrow" href={`/case-studies/${nextStudy.slug}`}>
                  <span className="red-square"></span>Next Case: {nextStudy.title}
                </a>
              ) : (
                <a className="link-arrow" href="/make-something">
                  <span className="red-square"></span>Make Something.
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
