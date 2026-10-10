import { NextRequest, NextResponse } from "next/server";
import { getStrapiOrigin } from "@/lib/strapi";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Saves a Subscribe pop-up sign-up as a Subscriber entry in the CMS. The CMS
// only accepts the call with the secret it shares with this site.
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    source?: unknown;
  } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body?.source === "string" ? body.source.slice(0, 60) : "";
  if (email.length > 254 || !EMAIL.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${getStrapiOrigin()}/api/subscribers/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-website-secret": process.env.REVALIDATE_SECRET ?? "",
      },
      body: JSON.stringify({ email, source }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      throw new Error(`Strapi request failed (${response.status})`);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Could not save subscriber to Strapi", error);
    return NextResponse.json(
      { error: "Could not subscribe right now. Please try again." },
      { status: 502 },
    );
  }
}
