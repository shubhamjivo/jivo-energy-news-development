import type { Metadata } from "next";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getInsights } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";

const href = "/insights/interviews";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(href);
}

export default async function InterviewsPage() {
  const [intro, items] = await Promise.all([
    pageContent(href),
    getInsights({ tags: ["interviews"] }),
  ]);

  return (
    <>
      <InsightsIndex intro={intro} notes={items} />
      <NewsletterCta />
    </>
  );
}
