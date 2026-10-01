import type { ArticleCard, CmsArticle } from "@/lib/article-types";
import { prepareArticleHtml } from "@/lib/article-html";
import {
  fetchArticleBySlug,
  fetchArticlesByIds,
  fetchArticleSlugs,
  fetchArticleSummaries,
  fetchCategories,
  fetchLatestFullArticles,
  getStrapiOrigin,
  type StrapiArticle,
  type StrapiArticleSummary,
} from "@/lib/strapi";
import { mediaSrc } from "@/lib/media";

export function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatByline(options: {
  author: string;
  coAuthors: string;
  source: string;
  publishedAt: string;
  readTime: number | null;
}) {
  const parts: string[] = [];
  const names = [options.author, options.coAuthors].filter(Boolean).join(", ");
  if (names) parts.push(`By ${names}`);
  if (options.source) parts.push(options.source);
  const date = formatDate(options.publishedAt);
  if (date) parts.push(date);
  if (options.readTime && options.readTime > 0) {
    parts.push(`${options.readTime} min read`);
  }
  return parts.join(" · ");
}

function readTimeOf(article: StrapiArticleSummary) {
  return typeof article.read_time === "number" && article.read_time > 0
    ? article.read_time
    : null;
}

function publishedAtOf(article: StrapiArticleSummary) {
  return article.publishedAt ?? article.createdAt;
}

export function mapArticleCard(article: StrapiArticleSummary): ArticleCard {
  const title = article.title?.trim() ?? "";
  const slug = article.slug ?? "";
  const author = article.author?.trim() ?? "";
  const coAuthors = article.co_author?.trim() ?? "";
  const markets = article.markets?.trim() ?? "";
  const publishedAt = publishedAtOf(article);
  const image = mediaSrc(article.banner) || mediaSrc(article.thumbnail);
  const thumbnail = mediaSrc(article.thumbnail) || image;

  return {
    id: article.id,
    title,
    slug,
    href: `/news/${slug}`,
    kicker: article.category?.title?.trim() ?? "",
    categorySlug: article.category?.slug ?? "",
    markets,
    dek: article.short_content?.trim() ?? "",
    image,
    imageAlt: article.banner?.alternativeText?.trim() || title,
    thumbnail,
    byline: formatByline({
      author,
      coAuthors,
      source: "",
      publishedAt,
      readTime: readTimeOf(article),
    }),
    meta: [formatDate(publishedAt), markets].filter(Boolean).join(" · "),
    publishedAt,
  };
}

export function mapStrapiArticle(article: StrapiArticle): CmsArticle {
  const card = mapArticleCard(article);
  const { html, headings } = prepareArticleHtml(
    article.content ?? "",
    article.id,
    getStrapiOrigin(),
  );
  const caption =
    article.banner?.caption?.trim() ||
    article.banner?.alternativeText?.trim() ||
    card.title;
  const author = article.author?.trim() ?? "";
  const coAuthors = article.co_author?.trim() ?? "";
  const source = article.source?.trim() ?? "";
  const readTime = readTimeOf(article);
  const seo = article.seo ?? null;
  const seoTitle = seo?.metaTitle?.trim() || card.title;
  const seoDescription = seo?.metaDescription?.trim() || card.dek || card.title;
  const related = (article.related_articles ?? [])
    .filter((item) => item.slug)
    .map(mapArticleCard);

  return {
    id: article.id,
    title: card.title,
    slug: card.slug,
    href: card.href,
    kicker: card.kicker,
    markets: card.markets,
    dek: card.dek,
    byline: formatByline({
      author,
      coAuthors,
      source,
      publishedAt: card.publishedAt,
      readTime,
    }),
    author,
    coAuthors,
    source,
    readTime,
    publishedAt: card.publishedAt,
    updatedAt: article.updatedAt,
    seoTitle,
    seoDescription,
    seoKeywords: seo?.keywords?.trim() ?? "",
    seoRobots: seo?.metaRobots?.trim() ?? "",
    canonicalUrl: seo?.canonicalURL?.trim() ?? "",
    ogTitle: seoTitle,
    ogDescription: seoDescription,
    ogImage: mediaSrc(seo?.metaImage) || card.image,
    image: card.image,
    caption,
    gallery: [
      ...(card.image ? [{ src: card.image, alt: card.imageAlt, caption }] : []),
      ...(article.gallery ?? [])
        .filter((media) => media.url)
        .map((media) => {
          const text =
            media.caption?.trim() || media.alternativeText?.trim() || card.title;
          return {
            src: mediaSrc(media),
            alt: media.alternativeText?.trim() || text,
            caption: text,
          };
        }),
    ],
    contentHtml: html,
    headings,
    relatedNewsIds: related.map((item) => item.id),
    related,
  };
}

export async function getArticleBySlug(slug: string) {
  const article = await fetchArticleBySlug(slug);
  return article ? mapStrapiArticle(article) : null;
}

export async function getArticleSlugs() {
  const rows = await fetchArticleSlugs();
  return rows
    .map((row) => row.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export async function getArticleSitemapEntries() {
  const rows = await fetchArticleSlugs();
  return rows
    .filter((row) => row.slug)
    .map((row) => ({
      slug: row.slug as string,
      lastModified: row.updatedAt ?? row.publishedAt,
    }));
}

export async function getLatestArticleCards(
  limit: number,
  excludeIds: number[] = [],
) {
  try {
    const payload = await fetchArticleSummaries({
      pageSize: limit,
      excludeIds,
    });
    return payload.data.filter((item) => item.slug).map(mapArticleCard);
  } catch (error) {
    console.error("Could not load latest articles from Strapi", error);
    return [];
  }
}

export async function getNewsPage(options: {
  page: number;
  pageSize: number;
  category?: string;
  excludeIds?: number[];
}) {
  try {
    const payload = await fetchArticleSummaries(options);
    return {
      articles: payload.data.filter((item) => item.slug).map(mapArticleCard),
      pageCount: payload.meta?.pagination?.pageCount ?? 1,
    };
  } catch (error) {
    console.error("Could not load news page from Strapi", error);
    return { articles: [], pageCount: 1 };
  }
}

export async function getNewsTopics() {
  try {
    const categories = await fetchCategories();
    return categories
      .filter((category) => category.slug && category.title)
      .map((category) => ({
        slug: category.slug as string,
        title: category.title as string,
      }));
  } catch (error) {
    console.error("Could not load categories from Strapi", error);
    return [];
  }
}

export async function getNextFeedArticles(options: {
  excludeIds: number[];
  relatedIds: number[];
  limit: number;
}) {
  const exclude = new Set(options.excludeIds);
  const relatedToFetch = options.relatedIds
    .filter((id) => !exclude.has(id))
    .slice(0, options.limit);

  const articles: CmsArticle[] = [];

  if (relatedToFetch.length > 0) {
    const related = await fetchArticlesByIds(relatedToFetch);
    for (const item of related) {
      if (exclude.has(item.id) || !item.slug) continue;
      articles.push(mapStrapiArticle(item));
      exclude.add(item.id);
    }
    for (const id of relatedToFetch) {
      exclude.add(id);
    }
  }

  if (articles.length < options.limit) {
    const latest = await fetchLatestFullArticles(
      [...exclude],
      options.limit - articles.length,
    );
    for (const item of latest) {
      if (exclude.has(item.id) || !item.slug) continue;
      articles.push(mapStrapiArticle(item));
      exclude.add(item.id);
    }
  }

  const remainingRelated = options.relatedIds.filter((id) => !exclude.has(id));
  let hasMore = remainingRelated.length > 0;
  if (!hasMore) {
    const peek = await fetchArticleSummaries({
      pageSize: 1,
      excludeIds: [...exclude],
    });
    hasMore = peek.data.length > 0;
  }

  return { articles, hasMore };
}
