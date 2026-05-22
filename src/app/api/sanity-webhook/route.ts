import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { SANITY_CACHE_TAG } from "@/lib/sanity/fetch-options";

/**
 * Called by Sanity when content is published.
 * Revalidates cached Sanity fetches; optionally triggers a full Vercel rebuild.
 */
export async function POST(request: Request) {
  const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;
  if (expectedSecret) {
    const headerSecret = request.headers.get("x-sanity-webhook-secret");
    const url = new URL(request.url);
    const querySecret = url.searchParams.get("secret");
    if (headerSecret !== expectedSecret && querySecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  revalidateTag(SANITY_CACHE_TAG, "max");

  let deployTriggered = false;
  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (deployHookUrl) {
    try {
      const deployResponse = await fetch(deployHookUrl, { method: "POST" });
      deployTriggered = deployResponse.ok;
    } catch {
      deployTriggered = false;
    }
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    tag: SANITY_CACHE_TAG,
    deployTriggered
  });
}
