const ARTICLE_FIELDS = [
  "id",
  "title",
  "slug",
  "content",
  "date_created",
  "date_updated",
  "author",
  "co_authors",
  "source",
  "read_time",
  "Related_News",
  "banner.id",
  "banner.title",
  "banner.width",
  "banner.height",
  "seo.meta_title",
  "seo.meta_description",
  "seo.og_title",
  "seo.og_description",
  "seo.og_image.id",
  "seo.og_image.title",
  "user_created.first_name",
  "user_created.last_name",
].join(",");

type DirectusFile = {
  id?: string;
  title?: string | null;
  width?: number | null;
  height?: number | null;
};

export type DirectusSeo = {
  meta_title?: string | null;
  meta_description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | DirectusFile | null;
};

export type DirectusArticle = {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  date_created: string;
  date_updated: string | null;
  author?: string | null;
  co_authors?: string | null;
  source?: string | null;
  read_time?: number | null;
  Related_News?: unknown;
  banner?: string | DirectusFile | null;
  seo?: DirectusSeo | number | null;
  user_created?: {
    first_name?: string | null;
    last_name?: string | null;
  } | null;
};

type DirectusListResponse<T> = {
  data: T[];
};

function getDirectusConfig() {
  const url = process.env.ADMIN_URL?.replace(/\/$/, "");
  const token = process.env.BEARE_TOKEN ?? process.env.BEARER_TOKEN;
  if (!url || !token) {
    throw new Error("Directus ADMIN_URL and token are not configured.");
  }
  return { url, token };
}

export function getDirectusOrigin() {
  return getDirectusConfig().url;
}

async function directusFetch(pathWithQuery: string, init?: RequestInit) {
  const { url, token } = getDirectusConfig();
  const response = await fetch(`${url}${pathWithQuery}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Directus request failed (${response.status})`);
  }

  return response;
}

export async function directusJson<T>(
  pathWithQuery: string,
  init?: RequestInit,
): Promise<T> {
  const response = await directusFetch(pathWithQuery, init);
  return response.json() as Promise<T>;
}

export async function directusAsset(id: string, search = "") {
  return directusFetch(`/assets/${id}${search}`);
}

function encodeFilter(filter: unknown) {
  return encodeURIComponent(JSON.stringify(filter));
}

export async function fetchArticlesBySlug(slug: string) {
  const filter = encodeFilter({ slug: { _eq: slug } });
  const payload = await directusJson<DirectusListResponse<DirectusArticle>>(
    `/items/articles?filter=${filter}&fields=${ARTICLE_FIELDS}&limit=1`,
    { next: { revalidate: 60 } },
  );
  return payload.data[0] ?? null;
}

export async function fetchArticlesByIds(ids: number[]) {
  if (ids.length === 0) return [];
  const filter = encodeFilter({ id: { _in: ids } });
  const payload = await directusJson<DirectusListResponse<DirectusArticle>>(
    `/items/articles?filter=${filter}&fields=${ARTICLE_FIELDS}&limit=${ids.length}`,
    { cache: "no-store" },
  );
  const byId = new Map(payload.data.map((article) => [article.id, article]));
  return ids
    .map((id) => byId.get(id))
    .filter((article): article is DirectusArticle => Boolean(article));
}

export async function fetchLatestArticles(excludeIds: number[], limit: number) {
  const params = new URLSearchParams({
    fields: ARTICLE_FIELDS,
    sort: "-date_created",
    limit: String(limit),
  });
  if (excludeIds.length > 0) {
    params.set("filter", JSON.stringify({ id: { _nin: excludeIds } }));
  }
  const payload = await directusJson<DirectusListResponse<DirectusArticle>>(
    `/items/articles?${params.toString()}`,
    { cache: "no-store" },
  );
  return payload.data;
}

export async function fetchArticleSlugs() {
  const payload = await directusJson<
    DirectusListResponse<{ slug: string; date_updated: string | null; date_created: string }>
  >(
    "/items/articles?fields=slug,date_created,date_updated&sort=-date_created&limit=100",
    { next: { revalidate: 60 } },
  );
  return payload.data;
}

export function relatedNewsIds(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  const ids: number[] = [];
  for (const item of value) {
    if (typeof item === "number" && Number.isInteger(item)) {
      ids.push(item);
      continue;
    }
    if (item && typeof item === "object") {
      const record = item as Record<string, unknown>;
      const candidate =
        record.id ??
        record.articles_id ??
        record.related_articles_id ??
        record.Related_News_id;
      if (typeof candidate === "number" && Number.isInteger(candidate)) {
        ids.push(candidate);
      }
    }
  }
  return [...new Set(ids)];
}

export function bannerFileId(banner: DirectusArticle["banner"]) {
  if (!banner) return null;
  if (typeof banner === "string") return banner;
  return banner.id ?? null;
}

export function bannerTitle(banner: DirectusArticle["banner"]) {
  if (!banner || typeof banner === "string") return "";
  return banner.title ?? "";
}
