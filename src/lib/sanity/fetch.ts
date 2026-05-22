import { seedContent } from "@/lib/seed-data";
import type {
  CaseStudy,
  ContextPage,
  Homepage,
  MakeSomethingPage,
  MotionPiece,
  ServiceTrack,
  SiteSettings,
  WorkPage
} from "@/lib/types";
import { sanityClient } from "@/lib/sanity/client";
import {
  caseStudiesQuery,
  caseStudyBySlugQuery,
  contextPageQuery,
  homepageQuery,
  makeSomethingPageQuery,
  motionPiecesQuery,
  serviceTracksQuery,
  siteSettingsQuery,
  workPageQuery
} from "@/lib/sanity/queries";

async function fetchWithFallback<T>(query: string, fallback: T, params?: Record<string, unknown>) {
  try {
    const data = await sanityClient.fetch<T | null>(query, params as never);
    if (data == null) return fallback;
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchWithFallback(siteSettingsQuery, seedContent.siteSettings);
}

export async function getHomepage(): Promise<Homepage> {
  const fallback = {
    ...seedContent.homepage,
    selectedCaseStudies: seedContent.caseStudies.filter((item) =>
      seedContent.homepage.selectedCaseStudies.includes(item.slug)
    ),
    selectedMotionPieces: seedContent.motionPieces.filter((item) =>
      seedContent.homepage.selectedMotionPieces.includes(item.slug)
    ),
    serviceTracks: seedContent.serviceTracks
  };
  return fetchWithFallback(homepageQuery, fallback);
}

export async function getWorkPage(): Promise<WorkPage> {
  const fallback = {
    ...seedContent.workPage,
    featuredCaseStudies: seedContent.caseStudies.filter((item) =>
      seedContent.workPage.featuredCaseStudies.includes(item.slug)
    ),
    featuredMotionPieces: seedContent.motionPieces.filter((item) =>
      seedContent.workPage.featuredMotionPieces.includes(item.slug)
    )
  };
  return fetchWithFallback(workPageQuery, fallback);
}

export async function getContextPage(): Promise<ContextPage> {
  return fetchWithFallback(contextPageQuery, seedContent.contextPage);
}

export async function getMakeSomethingPage(): Promise<MakeSomethingPage> {
  return fetchWithFallback(makeSomethingPageQuery, seedContent.makeSomethingPage);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return fetchWithFallback(caseStudiesQuery, seedContent.caseStudies);
}

export async function getMotionPieces(): Promise<MotionPiece[]> {
  return fetchWithFallback(motionPiecesQuery, seedContent.motionPieces);
}

export async function getServiceTracks(): Promise<ServiceTrack[]> {
  return fetchWithFallback(serviceTracksQuery, seedContent.serviceTracks);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const data = await sanityClient.fetch<CaseStudy | null>(caseStudyBySlugQuery, { slug });
    if (data) return data;
  } catch {
    // Fall back below.
  }

  return seedContent.caseStudies.find((item) => item.slug === slug) ?? null;
}
