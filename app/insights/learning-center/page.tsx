import type { Metadata } from "next";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getInsightPage } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";

type PageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

const href = "/insights/learning-center";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(href);
}

export default async function LearningCenterPage({ searchParams }: PageProps) {
  const raw = (await searchParams).page;
  const page = Math.max(1, Math.trunc(Number(Array.isArray(raw) ? raw[0] : raw)) || 1);
  const [intro, result] = await Promise.all([
    pageContent(href),
    getInsightPage("learning-center", page),
  ]);

  return (
    <>
      <InsightsIndex
        intro={intro}
        notes={result.items}
        pagination={{ basePath: href, page: result.page, pageCount: result.pageCount }}
      />
      <NewsletterCta />
    </>
  );
}
