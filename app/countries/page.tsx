import type { Metadata } from "next";
import { CountriesIndex } from "@/components/countries/CountriesIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getCountries, getLinkedArticles } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/countries");
}

export default async function CountriesPage() {
  const [intro, countries, articles] = await Promise.all([
    pageContent("/countries"),
    getCountries(),
    getLinkedArticles("country"),
  ]);

  return (
    <>
      <CountriesIndex intro={intro} countries={countries} articles={articles} />
      <NewsletterCta />
    </>
  );
}
