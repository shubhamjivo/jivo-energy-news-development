export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
};

export type StrapiCategory = {
  id: number;
  title: string | null;
  slug: string | null;
};

export type StrapiSeo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaImage?: StrapiMedia | null;
  keywords?: string | null;
  metaRobots?: string | null;
  canonicalURL?: string | null;
};

export type StrapiArticleSummary = {
  id: number;
  documentId: string;
  title: string | null;
  slug: string | null;
  author?: string | null;
  co_author?: string | null;
  source?: string | null;
  read_time?: number | null;
  short_content?: string | null;
  markets?: string | null;
  is_featured?: boolean | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string | null;
  banner?: StrapiMedia | null;
  thumbnail?: StrapiMedia | null;
  category?: StrapiCategory | null;
};

export type StrapiArticle = StrapiArticleSummary & {
  content?: string | null;
  seo?: StrapiSeo | null;
  related_articles?: StrapiArticleSummary[] | null;
};

type StrapiListResponse<T> = {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

// Every cached CMS request carries this tag; /api/revalidate clears it when
// Strapi publishes a change.
export const STRAPI_CACHE_TAG = "strapi";

type QueryValue = string | number | boolean | QueryValue[] | Query;
type Query = { [key: string]: QueryValue };

const MEDIA_FIELDS = ["url", "alternativeText", "caption", "width", "height"];

const SUMMARY_FIELDS = [
  "title",
  "slug",
  "author",
  "co_author",
  "source",
  "read_time",
  "short_content",
  "markets",
  "is_featured",
  "publishedAt",
  "createdAt",
  "updatedAt",
];

const SUMMARY_POPULATE: Query = {
  banner: { fields: MEDIA_FIELDS },
  thumbnail: { fields: MEDIA_FIELDS },
  category: { fields: ["title", "slug"] },
};

const FULL_POPULATE: Query = {
  ...SUMMARY_POPULATE,
  seo: { populate: { metaImage: { fields: MEDIA_FIELDS } } },
  related_articles: { fields: SUMMARY_FIELDS, populate: SUMMARY_POPULATE },
};

function getStrapiConfig() {
  const url = process.env.STRAPI_URL?.replace(/\/$/, "");
  if (!url) {
    throw new Error("STRAPI_URL is not configured.");
  }
  return { url, token: process.env.STRAPI_API_TOKEN };
}

export function getStrapiOrigin() {
  return getStrapiConfig().url;
}

// Minimal `qs`-style encoder for Strapi's bracket query syntax.
function encodeQuery(
  query: Query | QueryValue[],
  prefix = "",
  out = new URLSearchParams(),
) {
  for (const [key, value] of Object.entries(query)) {
    const name = prefix ? `${prefix}[${key}]` : key;
    if (value !== null && typeof value === "object") {
      encodeQuery(value, name, out);
    } else {
      out.append(name, String(value));
    }
  }
  return out;
}

async function strapiFetch(path: string, init?: RequestInit) {
  const { url, token } = getStrapiConfig();
  const response = await fetch(`${url}${path}`, {
    ...init,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      Accept: "application/json",
      ...init?.headers,
    },
  });
  if (!response.ok) {
    throw new Error(`Strapi request failed (${response.status})`);
  }
  return response;
}

async function strapiList<T>(
  collection: string,
  query: Query,
  init: RequestInit = { next: { revalidate: 300, tags: [STRAPI_CACHE_TAG] } },
) {
  const search = encodeQuery(query).toString();
  const response = await strapiFetch(`/api/${collection}?${search}`, init);
  return (await response.json()) as StrapiListResponse<T>;
}

export async function strapiMedia(path: string) {
  return strapiFetch(`/uploads/${path}`, { cache: "no-store" });
}

export async function fetchArticleBySlug(slug: string) {
  const payload = await strapiList<StrapiArticle>("articles", {
    filters: { slug: { $eq: slug } },
    populate: FULL_POPULATE,
    pagination: { pageSize: 1 },
  });
  return payload.data[0] ?? null;
}

export async function fetchArticlesByIds(ids: number[]) {
  if (ids.length === 0) return [];
  const payload = await strapiList<StrapiArticle>(
    "articles",
    {
      filters: { id: { $in: ids } },
      populate: FULL_POPULATE,
      pagination: { pageSize: ids.length },
    },
    { cache: "no-store" },
  );
  const byId = new Map(payload.data.map((article) => [article.id, article]));
  return ids
    .map((id) => byId.get(id))
    .filter((article): article is StrapiArticle => Boolean(article));
}

export async function fetchLatestFullArticles(
  excludeIds: number[],
  limit: number,
) {
  const query: Query = {
    sort: ["publishedAt:desc"],
    populate: FULL_POPULATE,
    pagination: { pageSize: limit },
  };
  if (excludeIds.length > 0) query.filters = { id: { $notIn: excludeIds } };
  const payload = await strapiList<StrapiArticle>("articles", query, {
    cache: "no-store",
  });
  return payload.data;
}

export async function fetchArticleSummaries(options: {
  page?: number;
  pageSize?: number;
  category?: string;
  featured?: boolean;
  excludeIds?: number[];
}) {
  const filters: Query = {};
  if (options.category) filters.category = { slug: { $eq: options.category } };
  if (options.featured) filters.is_featured = { $eq: true };
  if (options.excludeIds && options.excludeIds.length > 0) {
    filters.id = { $notIn: options.excludeIds };
  }
  return strapiList<StrapiArticleSummary>("articles", {
    fields: SUMMARY_FIELDS,
    populate: SUMMARY_POPULATE,
    filters,
    sort: ["publishedAt:desc"],
    pagination: { page: options.page ?? 1, pageSize: options.pageSize ?? 10 },
  });
}

export async function fetchCategories() {
  const payload = await strapiList<StrapiCategory>("categories", {
    fields: ["title", "slug"],
    sort: ["title:asc"],
    pagination: { pageSize: 50 },
  });
  return payload.data;
}

export async function fetchArticleSlugs() {
  const payload = await strapiList<{
    slug: string | null;
    publishedAt: string;
    updatedAt: string | null;
  }>("articles", {
    fields: ["slug", "publishedAt", "updatedAt"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  return payload.data;
}
