import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { pageMetadata } from "@/lib/page-meta";
import { routeByHref } from "@/lib/site";

const href = "/insights/reports";
const route = routeByHref(href);

export const metadata = pageMetadata(href);

export default function ReportsPage() {
  return (
    <>
      <InsightsIndex
        kicker="ANALYSIS"
        title={route.title}
        dek={route.description}
        variant="reports"
      />
      <NewsletterCta />
    </>
  );
}
