import type { MetadataRoute } from "next";
import { getArticleSitemapEntries } from "@/lib/articles";
import { ROUTES, SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      lastModified: new Date(entry.lastModified),
      changeFrequency: "daily" as const,
      priority: 0.85,
    }));
  } catch {
    articles = [];
  }

  return [
    ...pages,
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...articles,
  ];
}
