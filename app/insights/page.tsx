import type { Metadata } from "next";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getInsights } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/insights");
}

export default async function InsightsPage() {
  const [intro, reports, longReads] = await Promise.all([
    pageContent("/insights"),
    getInsights({ types: ["Report"], limit: 4 }),
    getInsights({ types: ["Analysis", "Opinion", "Interview", "Technology"], limit: 7 }),
  ]);
  // "The great read": the newest piece with a pull quote.
  const featured = longReads.find((item) => item.pullQuote) ?? null;
  const notes = longReads.filter((item) => item !== featured).slice(0, 6);

  return (
    <>
      <InsightsIndex intro={intro} featured={featured} reports={reports} notes={notes} />
      <NewsletterCta />
    </>
  );
}
