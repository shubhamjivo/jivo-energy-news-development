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

type PageProps = {
  searchParams: Promise<{
    topic?: string | string[];
    page?: string | string[];
  }>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const topic = firstParam(params.topic)?.trim() ?? "";
  const page = Math.max(
    1,
    Math.trunc(Number(firstParam(params.page) ?? "1")) || 1,
  );

  return (
    <>
      <NewsIndex page={page} topic={topic} />
      <NewsletterCta />
    </>
  );
}
