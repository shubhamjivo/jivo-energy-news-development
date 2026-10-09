import { mediaSrc } from "@/lib/media";
import type { StrapiSeo } from "@/lib/strapi";

export type SocialSeo = { title: string; description: string; image: string };

// The "SEO & sharing" fields of an article, insight or page. Empty values
// fall back to the entry's own title, summary and image.
export type SeoData = {
  title: string;
  description: string;
  image: string;
  keywords: string;
  robots: string;
  canonical: string;
  facebook: SocialSeo | null;
  twitter: SocialSeo | null;
  structuredData: unknown;
};

export function mapSeo(seo: StrapiSeo | null | undefined): SeoData {
  const social = (network: "Facebook" | "Twitter"): SocialSeo | null => {
    const entry = seo?.metaSocial?.find((item) => item.socialNetwork === network);
    return entry
      ? {
          title: entry.title?.trim() ?? "",
          description: entry.description?.trim() ?? "",
          image: mediaSrc(entry.image),
        }
      : null;
  };

  return {
    title: seo?.metaTitle?.trim() ?? "",
    description: seo?.metaDescription?.trim() ?? "",
    image: mediaSrc(seo?.metaImage),
    keywords: seo?.keywords?.trim() ?? "",
    robots: seo?.metaRobots?.trim() ?? "",
    canonical: seo?.canonicalURL?.trim() ?? "",
    facebook: social("Facebook"),
    twitter: social("Twitter"),
    structuredData: seo?.structuredData ?? null,
  };
}
