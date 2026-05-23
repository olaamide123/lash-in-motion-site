import { NextRequest, NextResponse } from "next/server";

const REVIEW_COOKIE = "lim_review";
const REVIEW_COOKIE_VALUE = "granted";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/review-access")) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(REVIEW_COOKIE);
  if (cookie?.value === REVIEW_COOKIE_VALUE) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/review-access";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|studio|_next|assets|favicon.ico|robots.txt|sitemap.xml).*)"
  ]
};
