import type { Metadata } from "next";
import { CompaniesIndex } from "@/components/companies/CompaniesIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { routeByHref } from "@/lib/site";

const route = routeByHref("/companies")!;

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

export default function CompaniesPage() {
  return (
    <>
      <CompaniesIndex />
      <NewsletterCta />
    </>
  );
}
