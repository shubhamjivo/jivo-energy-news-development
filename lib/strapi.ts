import "server-only";
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

export type StrapiTag = {
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
  publishedAt: string;
  createdAt: string;
  updatedAt: string | null;
  banner?: StrapiMedia | null;
  thumbnail?: StrapiMedia | null;
  category?: StrapiCategory | null;
};

export type StrapiArticle = StrapiArticleSummary & {
  content?: string | null;
  gallery?: StrapiMedia[] | null;
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
export type Query = { [key: string]: QueryValue };

// Populate follows the forms in Strapi's REST docs: populate=* for one level
// of everything, or a list of relation paths (populate[0]=a&populate[1]=b.c,
// where "b.c" also loads b). No per-field selection.
export const ARTICLE_POPULATE = ["banner", "thumbnail", "category"];

const ARTICLE_FULL_POPULATE = [
  ...ARTICLE_POPULATE,
  "gallery",
  "seo.metaImage",
  ...ARTICLE_POPULATE.map((path) => `related_articles.${path}`),
];

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

// A stalled CMS should fail fast so pages render their fallbacks.
const TIMEOUT_MS = 10_000;

async function strapiFetch(path: string, init?: RequestInit) {
  const { url, token } = getStrapiConfig();
  const response = await fetch(`${url}${path}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
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

const CACHED: RequestInit = { next: { revalidate: 300, tags: [STRAPI_CACHE_TAG] } };

export async function strapiList<T>(
  collection: string,
  query: Query,
  init: RequestInit = CACHED,
) {
  const search = encodeQuery(query).toString();
  const response = await strapiFetch(`/api/${collection}?${search}`, init);
  return (await response.json()) as StrapiListResponse<T>;
}

// Single types answer 404 until an editor first saves them.
export async function strapiSingle<T>(name: string, query: Query) {
  const { url, token } = getStrapiConfig();
  const search = encodeQuery(query).toString();
  const response = await fetch(`${url}/api/${name}?${search}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    ...CACHED,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      Accept: "application/json",
    },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Strapi request failed (${response.status})`);
  }
  return ((await response.json()) as { data: T | null }).data;
}

export async function strapiMedia(path: string) {
  return strapiFetch(`/uploads/${path}`, { cache: "no-store" });
}

export async function fetchArticleBySlug(slug: string) {
  const payload = await strapiList<StrapiArticle>("articles", {
    filters: { slug: { $eq: slug } },
    populate: ARTICLE_FULL_POPULATE,
  });
  return payload.data[0] ?? null;
}

export async function fetchLatestFullArticles(
  excludeIds: number[],
  limit: number,
  category?: string,
) {
  const filters: Query = {};
  if (excludeIds.length > 0) filters.id = { $notIn: excludeIds };
  if (category) filters.category = { slug: { $eq: category } };
  const query: Query = {
    sort: "publishedAt:desc",
    populate: ARTICLE_FULL_POPULATE,
    filters,
    pagination: { pageSize: limit },
  };
  const payload = await strapiList<StrapiArticle>("articles", query, {
    cache: "no-store",
  });
  return payload.data;
}

export async function fetchArticleSummaries(options: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  excludeIds?: number[];
}) {
  const filters: Query = {};
  if (options.category) filters.category = { slug: { $eq: options.category } };
  if (options.tag) filters.tags = { slug: { $eq: options.tag } };
  if (options.excludeIds && options.excludeIds.length > 0) {
    filters.id = { $notIn: options.excludeIds };
  }
  return strapiList<StrapiArticleSummary>("articles", {
    populate: ARTICLE_POPULATE,
    filters,
    sort: "publishedAt:desc",
    pagination: {
      ...(options.page && options.page > 1 ? { page: options.page } : {}),
      pageSize: options.pageSize ?? 10,
    },
  });
}

export async function fetchCategories() {
  const payload = await strapiList<StrapiCategory>("categories", {
    sort: "title:asc",
    pagination: { pageSize: 50 },
  });
  return payload.data;
}

export async function fetchTags() {
  const payload = await strapiList<StrapiTag>("tags", {
    sort: ["sort_order:asc", "title:asc"],
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
    sort: "publishedAt:desc",
    pagination: { pageSize: 100 },
  });
  return payload.data;
}
