import type { Metadata } from "next";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { NewsIndex } from "@/components/news/NewsIndex";
import { NEWS_FILTER_KEYS, type NewsFilters } from "@/lib/news-url";
import { pageContent, pageMetadata } from "@/lib/page-meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/news");
}

type PageProps = {
  searchParams: Promise<{
    topic?: string | string[];
    country?: string | string[];
    project?: string | string[];
    page?: string | string[];
  }>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = Object.fromEntries(
    NEWS_FILTER_KEYS.map((key) => {
      const value = firstParam(params[key])?.trim() ?? "";
      return [key, /^[a-z0-9-]{1,100}$/.test(value) ? value : ""];
    }),
  ) as NewsFilters;
  const page = Math.max(
    1,
    Math.trunc(Number(firstParam(params.page) ?? "1")) || 1,
  );

  const intro = await pageContent("/news");

  return (
    <>
      <NewsIndex page={page} filters={filters} intro={intro} />
      <NewsletterCta />
    </>
  );
}
