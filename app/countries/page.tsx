import type { Metadata } from "next";
import { CountriesIndex } from "@/components/countries/CountriesIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { routeByHref } from "@/lib/site";

const route = routeByHref("/countries")!;

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

export default function CountriesPage() {
  return (
    <>
      <CountriesIndex />
      <NewsletterCta />
    </>
  );
}
