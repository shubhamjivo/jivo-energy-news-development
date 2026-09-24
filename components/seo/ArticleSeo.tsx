import type { Metadata } from "next";
import type { CmsArticle } from "@/lib/article-types";
import { SITE_NAME, SITE_URL } from "@/lib/site";

function absoluteAssetUrl(src: string) {
  if (!src) return undefined;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

function authorNames(article: CmsArticle) {
  return [article.author, article.coAuthors]
    .map((name) => name.trim())
    .filter(Boolean);
}

function shareImage(article: CmsArticle) {
  return absoluteAssetUrl(article.ogImage || article.image);
}

export function articleMetadata(article: CmsArticle): Metadata {
  const image = shareImage(article);
  const names = authorNames(article);
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.title;
  const socialTitle = article.ogTitle || title;
  const socialDescription = article.ogDescription || description;
  const url = `${SITE_URL}${article.href}`;

  return {
    title,
    description,
    alternates: { canonical: article.href },
    authors: names.length > 0 ? names.map((name) => ({ name })) : undefined,
    openGraph: {
      type: "article",
      title: socialTitle,
      description: socialDescription,
      url,
      siteName: SITE_NAME,
      images: image
        ? [{ url: image, alt: article.caption || article.title }]
        : undefined,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: names.length > 0 ? names : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: image ? [image] : undefined,
    },
  };
}

export function ArticleSeo({ article }: { article: CmsArticle }) {
  const image = shareImage(article);
  const names = authorNames(article);
  const jsonLdAuthors =
    names.length > 1
      ? names.map((name) => ({ "@type": "Person", name }))
      : names.length === 1
        ? { "@type": "Person", name: names[0] }
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
    inLanguage: "en",
    author: jsonLdAuthors,
    publisher: {
      "@type": "NewsMediaOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}${article.href}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
