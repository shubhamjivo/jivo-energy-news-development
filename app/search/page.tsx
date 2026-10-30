import type { Metadata } from "next";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { SearchResults } from "@/components/search/SearchResults";
import { SEARCH_MAX_LENGTH, searchSite } from "@/lib/search";

type PageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

// Result pages are not worth indexing; links on them still are.
export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: PageProps) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, SEARCH_MAX_LENGTH) ?? "";
  const results = await searchSite(query);

  return (
    <>
      <SearchResults query={query} results={results} />
      <NewsletterCta />
    </>
  );
}
