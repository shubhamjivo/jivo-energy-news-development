import type { MetadataRoute } from "next";
import { LEAD_STORY } from "@/lib/content";
import { ROUTES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ROUTES.map((route) => ({
    url: `${SITE_URL}${route.href === "/" ? "" : route.href}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [
    ...pages,
    {
      url: `${SITE_URL}${LEAD_STORY.href}`,
      lastModified: new Date(LEAD_STORY.publishedAt),
      changeFrequency: "daily",
      priority: 0.85,
    },
  ];
}
