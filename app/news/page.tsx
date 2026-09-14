import type { Metadata } from "next";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { NewsIndex } from "@/components/news/NewsIndex";
import { routeByHref } from "@/lib/site";

const route = routeByHref("/news")!;

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

export default function NewsPage() {
  return (
    <>
      <NewsIndex />
      <NewsletterCta />
    </>
  );
}
