import type { Metadata } from "next";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getInsights } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";

const href = "/insights/learning-center";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(href);
}

export default async function LearningCenterPage() {
  const [intro, items] = await Promise.all([
    pageContent(href),
    getInsights({ types: ["Learning Center"] }),
  ]);

  return (
    <>
      <InsightsIndex intro={intro} notes={items} />
      <NewsletterCta />
    </>
  );
}
