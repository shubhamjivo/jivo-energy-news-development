import { NextRequest, NextResponse } from "next/server";
import { directusAsset } from "@/lib/directus";

const ASSET_ID_RE =
  /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(?:\.[a-z0-9]+)?$/i;

function parsePositiveInt(value: string | null) {
  if (!value || !/^\d+$/.test(value)) return null;
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0 || n > 4000) return null;
  return n;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id: rawId } = await context.params;
  const match = ASSET_ID_RE.exec(rawId);
  if (!match) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const id = match[1];

  const width = parsePositiveInt(request.nextUrl.searchParams.get("width"));
  const height = parsePositiveInt(request.nextUrl.searchParams.get("height"));
  const quality = parsePositiveInt(request.nextUrl.searchParams.get("quality"));
  const params = new URLSearchParams();
  if (width) params.set("width", String(width));
  if (height) params.set("height", String(height));
  if (quality) params.set("quality", String(quality));
  const search = params.size > 0 ? `?${params.toString()}` : "";

  try {
    const upstream = await directusAsset(id, search);
    const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
    const body = await upstream.arrayBuffer();

    return new NextResponse(body, {
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
