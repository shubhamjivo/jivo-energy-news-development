import type { Metadata } from "next";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getInsights } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";
import { INSIGHTS_LINKS } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/insights");
}

export default async function InsightsPage() {
  const [intro, insights] = await Promise.all([pageContent("/insights"), getInsights()]);
  const tagged = (tag: string) => insights.filter((item) => item.tags.includes(tag));

  // "The great read": the newest long read with a pull quote.
  const featured =
    insights.find(
      (item) =>
        item.pullQuote &&
        ["analysis", "opinion", "interviews"].some((tag) => item.tags.includes(tag)),
    ) ?? null;

  // One block per Insights sub-page, newest four stories each, linking through
  // to the page. Analysis has no page of its own, so it stays a list below.
  const sections = INSIGHTS_LINKS.map(({ label, href }) => ({
    label,
    href,
    items: tagged(href.split("/").pop() ?? "")
      .filter((item) => item !== featured)
      .slice(0, 4),
  }));
  const notes = tagged("analysis")
    .filter((item) => item !== featured)
    .slice(0, 6);

  return (
    <>
      <InsightsIndex
        intro={intro}
        featured={featured}
        sections={sections}
        notes={notes}
        notesHeading="Analysis & briefing notes"
      />
      <NewsletterCta />
    </>
  );
}
