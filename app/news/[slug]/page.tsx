import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContinuousNewsFeed } from "@/components/news/ContinuousNewsFeed";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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

  const url = `${SITE_URL}${article.href}`;
  const ogImage = article.ogImage || article.image;
  const image = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : undefined;
  const authors = [article.author, article.coAuthors]
    .filter(Boolean)
    .map((name) => ({ name }));

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.title,
    alternates: { canonical: article.href },
    authors: authors.length > 0 ? authors : undefined,
    openGraph: {
      type: "article",
      title: article.ogTitle || article.title,
      description: article.ogDescription || article.seoDescription || article.title,
      url,
      images: image
        ? [
            {
              url: image,
              alt: article.caption || article.title,
            },
          ]
        : undefined,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.ogTitle || article.title,
      description: article.ogDescription || article.seoDescription || article.title,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const ogImage = article.ogImage || article.image;
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
    description: article.seoDescription || article.title,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ContinuousNewsFeed key={article.id} initialArticle={article} />
      <NewsletterCta />
    </main>
  );
}
