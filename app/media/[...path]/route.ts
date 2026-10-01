import { NextRequest, NextResponse } from "next/server";
import { strapiMedia } from "@/lib/strapi";

// Strapi upload file names: hash-based names plus generated format prefixes
// (thumbnail_, small_, ...). No directories or traversal.
const FILE_RE = /^[a-z0-9_-]+\.[a-z0-9]+$/i;

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  if (path.length !== 1 || !FILE_RE.test(path[0])) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const upstream = await strapiMedia(path[0]);
    const contentType =
      upstream.headers.get("content-type") ?? "application/octet-stream";
    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
