import { NextRequest, NextResponse } from "next/server";
import { getNextFeedArticles } from "@/lib/articles";
import { parseIdList } from "@/lib/ids";

// TEMPORARY: caching is off so CMS edits show instantly. Delete this line to
// restore the 5-minute cache.
export const dynamic = "force-dynamic";

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
