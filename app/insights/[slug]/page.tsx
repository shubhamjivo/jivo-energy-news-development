import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContinuousInsightFeed } from "@/components/insights/ContinuousInsightFeed";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { FaqJsonLd } from "@/components/ui/Faq";
import { getInsightBySlug, getInsightSlugs } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function loadInsight(slug: string) {
  try {
    return await getInsightBySlug(slug);
  } catch (error) {
    console.error("Could not load insight from Strapi", error);
    return null;
  }
}

export async function generateStaticParams() {
  const rows = await getInsightSlugs();
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await loadInsight(slug);
  if (!insight) return {};
  return buildMetadata({
    seo: insight.seo,
    title: insight.title,
    description: insight.summary || insight.title,
    image: insight.image,
    path: insight.href,
    article: {
      publishedTime: insight.publishedAt,
      modifiedTime: insight.updatedAt,
      authors: [insight.author],
    },
  });
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = await loadInsight(slug);
  if (!insight) notFound();

  const image = insight.seo.image || insight.image;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.seo.description || insight.summary || insight.title,
    image: image ? [image.startsWith("http") ? image : `${SITE_URL}${image}`] : undefined,
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt,
    inLanguage: "en",
    author: insight.author
      ? { "@type": "Person", name: insight.author }
      : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}${insight.href}`,
  };

  return (
    <main>
      <JsonLdScript data={jsonLd} />
      <JsonLdScript data={insight.seo.structuredData} />
      <FaqJsonLd items={insight.faqs} />
      <ContinuousInsightFeed key={insight.id} initialInsight={insight} />
      <NewsletterCta />
    </main>
  );
}
