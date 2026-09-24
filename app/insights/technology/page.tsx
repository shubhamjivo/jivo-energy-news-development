import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { pageMetadata } from "@/lib/page-meta";
import { routeByHref } from "@/lib/site";

const href = "/insights/technology";
const route = routeByHref(href);

export const metadata = pageMetadata(href);

export default function TechnologyPage() {
  return (
    <>
      <InsightsIndex
        kicker="ANALYSIS"
        title={route.title}
        dek={route.description}
        variant="notes"
      />
      <NewsletterCta />
    </>
  );
}
