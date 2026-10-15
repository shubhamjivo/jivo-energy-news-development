import { mediaSrc } from "@/lib/media";
import type { StrapiSeo } from "@/lib/strapi";

// The "SEO & sharing" fields of an article, insight or page. Empty values
// fall back to the entry's own title, summary and image.
export type SeoData = {
  title: string;
  description: string;
  image: string;
  keywords: string;
  noIndex: boolean;
  canonical: string;
};

export function mapSeo(seo: StrapiSeo | null | undefined): SeoData {
  return {
    title: seo?.metaTitle?.trim() ?? "",
    description: seo?.metaDescription?.trim() ?? "",
    image: mediaSrc(seo?.metaImage),
    keywords: seo?.keywords?.trim() ?? "",
    noIndex: seo?.noIndex === true,
    canonical: seo?.canonicalURL?.trim() ?? "",
  };
}
