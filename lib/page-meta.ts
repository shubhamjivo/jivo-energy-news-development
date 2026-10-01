import type { Metadata } from "next";
import { getPageContent, type SitePage } from "@/lib/cms";
import { routeByHref } from "@/lib/site";

// Which CMS "Page" entry drives each route, plus the kicker shown when the
// entry has none.
const PAGES: Record<string, { sitePage: SitePage; kicker: string }> = {
  "/": { sitePage: "Home", kicker: "" },
  "/news": { sitePage: "News", kicker: "THE NEWSROOM" },
  "/projects": { sitePage: "Projects", kicker: "THE PROJECT FILE" },
  "/companies": { sitePage: "Companies", kicker: "THE DIRECTORY" },
  "/countries": { sitePage: "Countries", kicker: "THE MAP" },
  "/insights": { sitePage: "Insights", kicker: "ANALYSIS" },
  "/insights/learning-center": { sitePage: "Learning Center", kicker: "ANALYSIS" },
  "/insights/technology": { sitePage: "Technology", kicker: "ANALYSIS" },
  "/insights/reports": { sitePage: "Reports", kicker: "ANALYSIS" },
  "/insights/opinion": { sitePage: "Opinion", kicker: "ANALYSIS" },
  "/insights/interviews": { sitePage: "Interviews", kicker: "ANALYSIS" },
  "/events": { sitePage: "Events", kicker: "THE DIARY" },
};

export async function pageContent(href: string) {
  const route = routeByHref(href);
  const page = PAGES[href];
  return getPageContent(page.sitePage, {
    kicker: page.kicker,
    title: route.title,
    intro: route.description,
  });
}

export async function pageMetadata(href: string): Promise<Metadata> {
  const content = await pageContent(href);
  const title = content.seoTitle || content.title;
  const description = content.seoDescription || content.intro;
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
