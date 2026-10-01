import type { Metadata } from "next";
import { CountriesIndex } from "@/components/countries/CountriesIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getCountries } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/countries");
}

export default async function CountriesPage() {
  const [intro, countries] = await Promise.all([pageContent("/countries"), getCountries()]);

  return (
    <>
      <CountriesIndex intro={intro} countries={countries} />
      <NewsletterCta />
    </>
  );
}
