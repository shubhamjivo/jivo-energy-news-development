import type { Metadata } from "next";
import { getPage, pageIntro } from "@/lib/pages";
import { routeByHref } from "@/lib/site";

import type { Stat } from "@/lib/cms";

// Page slug in the CMS (for SEO) and the design's intro text per route; the
// title, and the intro where none is set here, come from the route list.
const PAGES: Record<string, { slug: string; kicker: string; intro?: string; stats?: Stat[] }> = {
  "/news": {
    slug: "news",
    kicker: "THE NEWSROOM",
    intro: "Dispatches from the African energy beat — markets, policy, projects and capital.",
  },
  "/projects": {
    slug: "projects",
    kicker: "THE PROJECT FILE",
    intro: "Utility-scale assets moving from announcement to financial close and execution.",
    stats: [
      { value: "186 GW", label: "Tracked pipeline" },
      { value: "42", label: "FIDs year to date" },
      { value: "14", label: "Priority markets" },
      { value: "$12.4bn", label: "Capital closed YTD" },
    ],
  },
  "/companies": {
    slug: "companies",
    kicker: "THE DIRECTORY",
    intro: "IPPs, DFIs, utilities and offtakers shaping Africa’s energy markets.",
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
  const { slug, kicker, intro, stats } = PAGES[href];
  return pageIntro(await getPage(slug), {
    kicker,
    title: route.title,
    intro: intro ?? route.description,
    stats,
  });
}

export async function pageMetadata(href: string): Promise<Metadata> {
  const content = await pageContent(href);
  const route = routeByHref(href);
  const title = content.seoTitle || route.title;
  const description = content.seoDescription || route.description;
  return {
    title,
    description,
    alternates: { canonical: href },
    openGraph: {
      title,
      description,
      url: href,
      images: content.seoImage ? [content.seoImage] : undefined,
    },
  };
}
