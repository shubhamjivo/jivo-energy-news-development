import type { Metadata } from "next";
import { CompaniesIndex } from "@/components/companies/CompaniesIndex";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getCompanies, getDeals, getLinkedArticles } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/companies");
}

export default async function CompaniesPage() {
  const [intro, companies, deals, articles] = await Promise.all([
    pageContent("/companies"),
    getCompanies(),
    getDeals(6),
    getLinkedArticles("company"),
  ]);

  return (
    <>
      <CompaniesIndex
        intro={intro}
        companies={companies}
        deals={deals}
        articles={articles}
      />
      <NewsletterCta />
    </>
  );
}
