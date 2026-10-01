import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { STRAPI_CACHE_TAG } from "@/lib/strapi";

function secretMatches(given: string | null) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Called by the Strapi CMS after content is published, updated or deleted.
export async function POST(request: NextRequest) {
  if (!secretMatches(request.headers.get("x-revalidate-secret"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Editors expect the next page load to show their change, so don't serve
  // stale content while revalidating.
  revalidateTag(STRAPI_CACHE_TAG, { expire: 0 });
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
