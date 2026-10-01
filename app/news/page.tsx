import type { Metadata } from "next";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { NewsIndex } from "@/components/news/NewsIndex";
import { pageContent, pageMetadata } from "@/lib/page-meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/news");
}

type PageProps = {
  searchParams: Promise<{
    topic?: string | string[];
    page?: string | string[];
  }>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const topic = firstParam(params.topic)?.trim() ?? "";
  const page = Math.max(
    1,
    Math.trunc(Number(firstParam(params.page) ?? "1")) || 1,
  );

  const intro = await pageContent("/news");

  return (
    <>
      <NewsIndex page={page} topic={topic} intro={intro} />
      <NewsletterCta />
    </>
  );
}
