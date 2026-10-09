import type { SeoData } from "@/lib/seo-data";

export type ArticleCard = {
  id: number;
  title: string;
  slug: string;
  href: string;
  kicker: string;
  categorySlug: string;
  markets: string;
  dek: string;
  image: string;
  imageAlt: string;
  thumbnail: string;
  byline: string;
  meta: string;
  publishedAt: string;
};

export type FaqItem = { question: string; answer: string };

export type CmsArticle = {
  id: number;
  title: string;
  slug: string;
  href: string;
  kicker: string;
  categorySlug: string;
  markets: string;
  dek: string;
  byline: string;
  author: string;
  coAuthors: string;
  source: string;
  readTime: number | null;
  publishedAt: string;
  updatedAt: string | null;
  seo: SeoData;
  image: string;
  caption: string;
  gallery: {
    src: string;
    alt: string;
    caption: string;
  }[];
  contentHtml: string;
  headings: string[];
  faqs: FaqItem[];
  relatedNewsIds: number[];
  related: ArticleCard[];
};
