"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  NEWS_FILTER_KEYS,
  newsHref,
  type NewsFilterKey,
  type NewsFilterOptions,
  type NewsFilters,
} from "@/lib/news-url";

const LABELS: Record<NewsFilterKey, string> = {
  topic: "All topics",
  country: "All countries",
  project: "All projects",
};

export function NewsFilterBar({
  filters,
  options,
}: {
  filters: NewsFilters;
  options: NewsFilterOptions;
}) {
  const router = useRouter();
  const keys = NEWS_FILTER_KEYS.filter((key) => options[key].length > 0);
  if (keys.length === 0) return null;
  const filtered = NEWS_FILTER_KEYS.some((key) => filters[key]);

  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      {keys.map((key) => (
        <select
          key={key}
          aria-label={LABELS[key].replace("All ", "Filter by ")}
          value={filters[key]}
          onChange={(event) =>
            router.push(newsHref({ ...filters, [key]: event.target.value }), {
              scroll: false,
            })
          }
          className={`h-9 max-w-full px-2.5 text-xs ${
            filters[key]
              ? "bg-navy font-semibold text-white"
              : "border border-hairline bg-paper text-ink"
          }`}
        >
          <option value="">{LABELS[key]}</option>
          {options[key].map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.title}
            </option>
          ))}
        </select>
      ))}
      {filtered ? (
        <Link href="/news" scroll={false} className="px-1 text-xs text-muted hover:text-ink">
          Clear filters
        </Link>
      ) : null}
    </div>
  );
}
