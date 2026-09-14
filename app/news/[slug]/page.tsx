import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/news/ArticleView";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getArticleBySlug, getArticleSlugs, } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = `${SITE_URL}${article.href}`;
  return {
    title: article.title,
    description: article.dek,
    alternates: { canonical: article.href },
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      url,
      images: [
        {
          url: article.image,
          width: 1152,
          height: 896,
          alt: article.caption,
        },
      ],
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.dek,
    image: [`${SITE_URL}${article.image}`],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}${article.href}`,
    articleSection: "Solar",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ArticleView article={article} />
      <NewsletterCta />
    </main>
  );
}
