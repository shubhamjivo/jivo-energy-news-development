import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContinuousNewsFeed } from "@/components/news/ContinuousNewsFeed";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { FaqJsonLd } from "@/components/ui/Faq";
import {
  getArticleBySlug,
  getArticleSlugs,
  getLatestArticleCards,
} from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// TEMPORARY: caching is off so CMS edits show instantly. Delete this line to
// restore the 5-minute cache.
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getArticleSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return buildMetadata({
    seo: article.seo,
    title: article.title,
    description: article.dek || article.title,
    image: article.image,
    imageAlt: article.caption || article.title,
    path: article.href,
    article: {
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author, article.coAuthors],
    },
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const [article, latest] = await Promise.all([
    getArticleBySlug(slug),
    getLatestArticleCards(7),
  ]);
  if (!article) notFound();

  const ogImage = article.seo.image || article.image;
  const image = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : undefined;
  const authorNames = [article.author, article.coAuthors].filter(Boolean);
  const jsonLdAuthors =
    authorNames.length > 1
      ? authorNames.map((name) => ({ "@type": "Person", name }))
      : authorNames.length === 1
        ? { "@type": "Person", name: authorNames[0] }
        : {
            "@type": "NewsMediaOrganization",
            name: SITE_NAME,
          };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.seo.description || article.dek || article.title,
    image: image ? [image] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    timeRequired: article.readTime ? `PT${article.readTime}M` : undefined,
    author: jsonLdAuthors,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}${article.href}`,
  };

  return (
    <main>
      <JsonLdScript data={jsonLd} />
      <JsonLdScript data={article.seo.structuredData} />
      <FaqJsonLd items={article.faqs} />
      <ContinuousNewsFeed
        key={article.id}
        initialArticle={article}
        latest={latest}
      />
      <NewsletterCta />
    </main>
  );
}
