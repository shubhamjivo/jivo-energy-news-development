import type { MetadataRoute } from "next";
import { getArticleSitemapEntries } from "@/lib/articles";
import { getInsightSlugs } from "@/lib/cms";
import { ROUTES, SITE_INDEXABLE, SITE_URL } from "@/lib/site";

// Rebuilt at most once an hour, so new articles and insights reach search
// engines without a redeploy.
export const revalidate = 3600;

// A missing or broken CMS date would make the whole sitemap fail to render.
function date(value: string | null | undefined) {
  const parsed = value ? new Date(value) : new Date();
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!SITE_INDEXABLE) return [];

  const pages = ROUTES.map((route) => ({
    url: `${SITE_URL}${route.href === "/" ? "" : route.href}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let articles: MetadataRoute.Sitemap = [];
  try {
    const entries = await getArticleSitemapEntries();
    articles = entries.map((entry) => ({
      url: `${SITE_URL}/news/${entry.slug}`,
      lastModified: date(entry.lastModified),
      changeFrequency: "daily" as const,
      priority: 0.85,
    }));
  } catch (error) {
    console.error("Could not load article slugs for the sitemap", error);
    articles = [];
  }

  const insights = (await getInsightSlugs()).map((entry) => ({
    url: `${SITE_URL}/insights/${entry.slug}`,
    lastModified: date(entry.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...pages,
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...articles,
    ...insights,
  ];
}
