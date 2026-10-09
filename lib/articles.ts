import "server-only";
import type { ArticleCard, CmsArticle } from "@/lib/article-types";
import { prepareArticleHtml } from "@/lib/article-html";
import {
  fetchArticleBySlug,
  fetchArticleSlugs,
  fetchArticleSummaries,
  fetchCategories,
  fetchLatestFullArticles,
  fetchTags,
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

// "42 min ago", "3 hr ago", "Yesterday", "2 days ago", then the date, as in
// the site's original design.
export function formatRelative(value: string, now = Date.now()) {
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return "";
  const minutes = Math.floor((now - time) / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return formatDate(value);
}

// Card byline: "By Naledi Mokoena · 6 hr ago · Nigeria · Ghana".
function cardByline(names: string, publishedAt: string, markets: string) {
  return [names ? `By ${names}` : "", formatRelative(publishedAt), markets]
    .filter(Boolean)
    .join(" · ");
}

// Lead story byline: "By Amara Chukwu · 18 min ago · 6 min read".
export function leadByline(article: CmsArticle) {
  const names = [article.author, article.coAuthors].filter(Boolean).join(", ");
  return [
    names ? `By ${names}` : "",
    formatRelative(article.publishedAt),
    article.readTime ? `${article.readTime} min read` : "",
  ]
    .filter(Boolean)
    .join(" · ");
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
    byline: cardByline([author, coAuthors].filter(Boolean).join(", "), publishedAt, markets),
    meta: [formatRelative(publishedAt), markets].filter(Boolean).join(" · "),
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
    categorySlug: card.categorySlug,
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

// One shared request for the newest articles; callers drop the ones they
// already show and take what they need.
const LATEST_POOL = 16;

export async function getLatestArticleCards(
  limit: number,
  excludeIds: number[] = [],
) {
  try {
    const payload = await fetchArticleSummaries({ pageSize: LATEST_POOL });
    return payload.data
      .filter((item) => item.slug && !excludeIds.includes(item.id))
      .map(mapArticleCard)
      .slice(0, limit);
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

// Africa Times on the home page: one column per tag, in the tags' order, each
// with its newest articles. Tags without articles are left out.
export async function getTagDesks(columns = 4, perDesk = 4) {
  try {
    const tags = (await fetchTags()).filter((tag) => tag.slug && tag.title);
    const desks = await Promise.all(
      tags.map(async (tag) => {
        const payload = await fetchArticleSummaries({
          tag: tag.slug as string,
          pageSize: perDesk,
        });
        return {
          title: (tag.title as string).trim(),
          stories: payload.data.filter((item) => item.slug).map(mapArticleCard),
        };
      }),
    );
    return desks.filter((desk) => desk.stories.length > 0).slice(0, columns);
  } catch (error) {
    console.error("Could not load tags from Strapi", error);
    return [];
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

// The scroll feed under an article: first the newest article, then every
// article in the opened article's category, newest first.
export async function getNextFeedArticles(options: {
  excludeIds: number[];
  category: string;
  latestShown: boolean;
  limit: number;
}) {
  const exclude = new Set(options.excludeIds);
  const articles: CmsArticle[] = [];
  const take = (items: StrapiArticle[]) => {
    for (const item of items) {
      if (exclude.has(item.id) || !item.slug) continue;
      articles.push(mapStrapiArticle(item));
      exclude.add(item.id);
    }
  };

  if (!options.latestShown) {
    take(await fetchLatestFullArticles([...exclude], 1));
  }
  if (articles.length < options.limit && options.category) {
    take(
      await fetchLatestFullArticles(
        [...exclude],
        options.limit - articles.length,
        options.category,
      ),
    );
  }

  let hasMore = false;
  if (options.category) {
    const peek = await fetchArticleSummaries({
      pageSize: 1,
      category: options.category,
      excludeIds: [...exclude],
    });
    hasMore = peek.data.length > 0;
  }

  return { articles, hasMore };
}
