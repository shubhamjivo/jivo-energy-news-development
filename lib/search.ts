import "server-only";
import type { ArticleCard } from "@/lib/article-types";
import { formatRelative, mapArticleCard } from "@/lib/articles";
import { mapInsight, safe, type InsightCard, type StrapiInsight } from "@/lib/cms";
import { ARTICLE_POPULATE, strapiList, type StrapiArticleSummary } from "@/lib/strapi";

export const SEARCH_MAX_LENGTH = 100;
const LIMIT = 100;

export type SearchResult = {
  id: string;
  type: "News" | "Insight";
  title: string;
  href: string;
  kicker: string;
  summary: string;
  image: string;
  imageAlt: string;
  meta: string;
  publishedAt: string;
};

// Matches in the title rank above matches in the summary or body; ties go to
// the newest first.
function rank(results: SearchResult[], query: string) {
  const needle = query.toLowerCase();
  return results.sort((a, b) => {
    const titleHit = Number(b.title.toLowerCase().includes(needle)) - Number(a.title.toLowerCase().includes(needle));
    return titleHit || b.publishedAt.localeCompare(a.publishedAt);
  });
}

const fromArticle = (card: ArticleCard): SearchResult => ({
  id: `article-${card.id}`,
  type: "News",
  title: card.title,
  href: card.href,
  kicker: card.kicker,
  summary: card.dek,
  image: card.thumbnail,
  imageAlt: card.imageAlt,
  meta: card.meta,
  publishedAt: card.publishedAt,
});

const fromInsight = (card: InsightCard): SearchResult => ({
  id: `insight-${card.id}`,
  type: "Insight",
  title: card.title,
  href: card.href,
  kicker: card.label,
  summary: card.summary,
  image: card.image,
  imageAlt: card.title,
  meta: [formatRelative(card.publishedAt), card.readTime].filter(Boolean).join(" · "),
  publishedAt: card.publishedAt,
});

// Published news articles and insights whose title, summary or body contains
// the query. Nothing else on the site is searched.
export async function searchSite(query: string) {
  const term = query.trim().slice(0, SEARCH_MAX_LENGTH);
  if (!term) return [];
  const contains = (fields: string[]) => ({ $or: fields.map((field) => ({ [field]: { $containsi: term } })) });

  const [articles, insights] = await Promise.all([
    safe("article search", [] as SearchResult[], async () => {
      const payload = await strapiList<StrapiArticleSummary>("articles", {
        populate: ARTICLE_POPULATE,
        filters: contains(["title", "short_content", "content"]),
        sort: "publishedAt:desc",
        pagination: { pageSize: LIMIT },
      });
      return payload.data.filter((item) => item.slug).map((item) => fromArticle(mapArticleCard(item)));
    }),
    safe("insight search", [] as SearchResult[], async () => {
      const payload = await strapiList<StrapiInsight>("insights", {
        populate: ["cover", "tags"],
        filters: contains(["title", "summary", "content"]),
        sort: "publishedAt:desc",
        pagination: { pageSize: LIMIT },
      });
      return payload.data.filter((item) => item.slug).map((item) => fromInsight(mapInsight(item)));
    }),
  ]);

  return rank([...articles, ...insights], term);
}
