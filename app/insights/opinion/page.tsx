import type { Metadata } from "next";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getInsightPage } from "@/lib/cms";
import { pageContent, pageMetadata, pageNumber } from "@/lib/page-meta";

type PageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

const href = "/insights/opinion";

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return pageMetadata(href, pageNumber((await searchParams).page));
}

export default async function OpinionPage({ searchParams }: PageProps) {
  const page = pageNumber((await searchParams).page);
  const [intro, result] = await Promise.all([
    pageContent(href),
    getInsightPage("opinion", page),
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
