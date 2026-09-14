import { EmptyMain } from "@/components/layout/EmptyMain";
import { pageMetadata } from "@/lib/page-meta";
import { routeByHref } from "@/lib/site";

const href = "/insights/reports";

export const metadata = pageMetadata(href);

export default function ReportsPage() {
  return <EmptyMain title={routeByHref(href).title} />;
}
