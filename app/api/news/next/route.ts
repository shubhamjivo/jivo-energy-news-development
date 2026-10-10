import { NextRequest, NextResponse } from "next/server";
import { getNextFeedArticles } from "@/lib/articles";
import { parseIdList } from "@/lib/ids";

// TEMPORARY: caching is off so CMS edits show instantly. Delete these two
// lines to restore the 5-minute cache. `fetchCache` is the one that matters:
// `force-dynamic` alone leaves fetches with their own `revalidate` cached.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const excludeIds = parseIdList(searchParams.get("exclude"));
  const rawCategory = searchParams.get("category") ?? "";
  const category = /^[a-z0-9-]{1,100}$/.test(rawCategory) ? rawCategory : "";
  const latestShown = searchParams.get("latest") === "shown";
  const requestedLimit = Number(searchParams.get("limit") ?? "1");
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(3, Math.max(1, Math.trunc(requestedLimit)))
    : 1;

  try {
    const result = await getNextFeedArticles({
      excludeIds,
      category,
      latestShown,
      limit,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Could not load the next article." },
      { status: 502 },
    );
  }
}
