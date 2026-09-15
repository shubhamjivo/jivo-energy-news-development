import type { CmsArticle } from "@/lib/article-types";
import { prepareArticleHtml } from "@/lib/article-html";
import {
  bannerFileId,
  bannerTitle,
  fetchArticlesByIds,
  fetchArticlesBySlug,
  fetchArticleSlugs,
  fetchLatestArticles,
  getDirectusOrigin,
  relatedNewsIds,
  type DirectusArticle,
} from "@/lib/directus";

function assetSrc(id: string) {
  return `/api/assets/${id}`;
}

function fallbackAuthorName(article: DirectusArticle) {
  const first = article.user_created?.first_name?.trim() ?? "";
  const last = article.user_created?.last_name?.trim() ?? "";
  return `${first} ${last}`.trim();
}

function displayAuthor(article: DirectusArticle) {
  return article.author?.trim() || fallbackAuthorName(article);
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
  const date = new Date(options.publishedAt);
  if (!Number.isNaN(date.getTime())) {
    parts.push(
      date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    );
  }
  if (options.readTime && options.readTime > 0) {
    parts.push(`${options.readTime} min read`);
  }
  return parts.join(" · ");
}

export function mapDirectusArticle(article: DirectusArticle): CmsArticle {
  const adminUrl = getDirectusOrigin();
  const { html, headings } = prepareArticleHtml(
    article.content ?? "",
    article.id,
    adminUrl,
  );
  const fileId = bannerFileId(article.banner);
  const caption = bannerTitle(article.banner) || article.title;
  const image = fileId ? assetSrc(fileId) : "";
  const author = displayAuthor(article);
  const coAuthors = article.co_authors?.trim() ?? "";
  const source = article.source?.trim() ?? "";
  const readTime =
    typeof article.read_time === "number" && article.read_time > 0
      ? article.read_time
      : null;
  const seo = article.seo && typeof article.seo === "object" ? article.seo : null;
  const ogFileId = bannerFileId(seo?.og_image ?? null);
  const seoTitle = seo?.meta_title?.trim() || article.title;
  const seoDescription = seo?.meta_description?.trim() || article.title;
  const ogTitle = seo?.og_title?.trim() || seoTitle;
  const ogDescription = seo?.og_description?.trim() || seoDescription;
  const ogImage = ogFileId ? assetSrc(ogFileId) : image;

  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    href: `/news/${article.slug}`,
    kicker: "",
    markets: "",
    dek: "",
    byline: formatByline({
      author,
      coAuthors,
      source,
      publishedAt: article.date_created,
      readTime,
    }),
    author,
    coAuthors,
    source,
    readTime,
    publishedAt: article.date_created,
    updatedAt: article.date_updated,
    seoTitle,
    seoDescription,
    ogTitle,
    ogDescription,
    ogImage,
    image,
    caption,
    gallery: fileId
      ? [
          {
            src: image,
            alt: caption,
            caption,
          },
        ]
      : [],
    contentHtml: html,
    headings,
    relatedNewsIds: relatedNewsIds(article.Related_News),
  };
}

export async function getArticleBySlug(slug: string) {
  const article = await fetchArticlesBySlug(slug);
  return article ? mapDirectusArticle(article) : null;
}

export async function getArticleSlugs() {
  const rows = await fetchArticleSlugs();
  return rows.map((row) => row.slug).filter(Boolean);
}

export async function getArticleSitemapEntries() {
  const rows = await fetchArticleSlugs();
  return rows
    .filter((row) => row.slug)
    .map((row) => ({
      slug: row.slug,
      lastModified: row.date_updated ?? row.date_created,
    }));
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
      if (exclude.has(item.id)) continue;
      articles.push(mapDirectusArticle(item));
      exclude.add(item.id);
    }
    for (const id of relatedToFetch) {
      exclude.add(id);
    }
  }

  if (articles.length < options.limit) {
    const latest = await fetchLatestArticles(
      [...exclude],
      options.limit - articles.length,
    );
    for (const item of latest) {
      if (exclude.has(item.id)) continue;
      articles.push(mapDirectusArticle(item));
      exclude.add(item.id);
    }
  }

  const remainingRelated = options.relatedIds.filter((id) => !exclude.has(id));
  let hasMore = remainingRelated.length > 0;
  if (!hasMore) {
    const peek = await fetchLatestArticles([...exclude], 1);
    hasMore = peek.length > 0;
  }

  return { articles, hasMore };
}
