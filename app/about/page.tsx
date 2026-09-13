import type { Metadata } from "next";
import { EmptyMain } from "@/components/layout/EmptyMain";
import { routeByHref } from "@/lib/site";

const route = routeByHref("/about")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
  openGraph: {
    title: route.title,
    description: route.description,
    url: route.href,
  },
};

export default function AboutPage() {
  return <EmptyMain title={route.title} />;
}
