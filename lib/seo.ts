import "server-only";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/cms";
import type { SeoData } from "@/lib/seo-data";

export const DEFAULT_SHARE_IMAGE = "/images/lead-featured.png";

// One place builds the <head> tags of every page: the entry's "SEO & sharing"
// fields first, then its own title, summary and image, then the site defaults.
export async function buildMetadata(options: {
  seo: SeoData | null;
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  // Skip the "| Site name" suffix (home page).
  absoluteTitle?: boolean;
  article?: { publishedTime: string; modifiedTime?: string; authors?: string[] };
}): Promise<Metadata> {
  const { seo, path, article } = options;
  const settings = await getSiteSettings();
  const title = seo?.title || options.title;
  const description = seo?.description || options.description;
  const image = seo?.image || options.image || settings.shareImage || DEFAULT_SHARE_IMAGE;
  const alt = options.imageAlt || title;
  const authors = article?.authors?.filter(Boolean) ?? [];

  return {
    title: options.absoluteTitle ? { absolute: title } : title,
    description,
    // A key set to undefined would still replace the layout's default.
    ...(seo?.keywords ? { keywords: seo.keywords } : {}),
    ...(seo?.robots ? { robots: seo.robots } : {}),
    ...(authors.length > 0 ? { authors: authors.map((name) => ({ name })) } : {}),
    alternates: { canonical: seo?.canonical || path },
    openGraph: {
      type: article ? "article" : "website",
      locale: "en_GB",
      siteName: settings.siteName,
      url: path,
      title: seo?.facebook?.title || title,
      description: seo?.facebook?.description || description,
      images: [{ url: seo?.facebook?.image || image, alt }],
      ...(article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            authors: authors.length > 0 ? authors : undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: settings.twitterHandle || undefined,
      title: seo?.twitter?.title || title,
      description: seo?.twitter?.description || description,
      images: [seo?.twitter?.image || image],
    },
  };
}
