// The filters /news understands, each a slug in the query string:
// /news?topic=solar&country=kenya&project=…&company=…
export const NEWS_FILTER_KEYS = ["topic", "country", "project", "company"] as const;

export type NewsFilterKey = (typeof NEWS_FILTER_KEYS)[number];
export type NewsFilters = Record<NewsFilterKey, string>;

export type NewsFilterOption = { slug: string; title: string };
export type NewsFilterOptions = Record<NewsFilterKey, NewsFilterOption[]>;

export function newsHref(filters: Partial<NewsFilters>, page = 1) {
  const params = new URLSearchParams();
  for (const key of NEWS_FILTER_KEYS) {
    const value = filters[key];
    if (value) params.set(key, value);
  }
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/news?${query}` : "/news";
}
