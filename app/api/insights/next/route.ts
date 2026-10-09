import { NextRequest, NextResponse } from "next/server";
import { getNextInsights } from "@/lib/cms";
import { parseIdList } from "@/lib/ids";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const excludeIds = parseIdList(searchParams.get("exclude"));
  const requestedLimit = Number(searchParams.get("limit") ?? "1");
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(3, Math.max(1, Math.trunc(requestedLimit)))
    : 1;

  try {
    return NextResponse.json(await getNextInsights({ excludeIds, limit }));
  } catch {
    return NextResponse.json(
      { error: "Could not load the next insight." },
      { status: 502 },
    );
  }
}
