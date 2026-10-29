import type { Metadata } from "next";
import { getPage, pageIntro } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { routeByHref } from "@/lib/site";

// Page slug in the CMS (for SEO) and the design's intro text per route; the
// title, and the intro where none is set here, come from the route list.
const PAGES: Record<string, { slug: string; kicker: string; intro?: string }> = {
  "/news": {
    slug: "news",
    kicker: "THE NEWSROOM",
    intro: "Dispatches from the African energy beat — markets, policy, projects and capital.",
  },
  "/projects": {
    slug: "projects",
    kicker: "THE PROJECT FILE",
    intro: "Utility-scale assets moving from announcement to financial close and execution.",
  },
  "/countries": {
    slug: "countries",
    kicker: "THE MAP",
    intro: "Market-by-market intelligence across the continent’s energy transition.",
  },
  "/insights": {
    slug: "insights",
    kicker: "ANALYSIS",
    intro: "Long-form reporting, data notes and the outlooks our newsroom publishes.",
  },
  "/insights/learning-center": { slug: "learning-center", kicker: "ANALYSIS" },
  "/insights/technology": { slug: "technology", kicker: "ANALYSIS" },
  "/insights/reports": { slug: "reports", kicker: "ANALYSIS" },
  "/insights/opinion": { slug: "opinion", kicker: "ANALYSIS" },
  "/insights/interviews": { slug: "interviews", kicker: "ANALYSIS" },
  "/events": {
    slug: "events",
    kicker: "THE DIARY",
    intro: "Forums, tenders and briefings on the Africa energy calendar.",
  },
};

export async function pageContent(href: string) {
  const route = routeByHref(href);
  const { slug, kicker, intro } = PAGES[href];
  return pageIntro(await getPage(slug), {
    kicker,
    title: route.title,
    intro: intro ?? route.description,
  });
}

// "?page=2" of a listing, as a whole number from 1.
export function pageNumber(raw: string | string[] | undefined) {
  return Math.max(1, Math.trunc(Number(Array.isArray(raw) ? raw[0] : raw)) || 1);
}

// Later pages of a listing keep their own canonical URL and title, so search
// engines index them (and the older stories they link to) rather than folding
// them into page 1 as duplicates.
export async function pageMetadata(href: string, page = 1): Promise<Metadata> {
  const content = await pageContent(href);
  const route = routeByHref(href);
  return buildMetadata({
    seo: content.seo,
    title: page > 1 ? `${route.title} — Page ${page}` : route.title,
    description: route.description,
    path: page > 1 ? `${href}?page=${page}` : href,
  });
}
