"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NEWS_FILTERS } from "@/lib/content";

export function NewsFiltersFallback() {
  return (
    <div className="flex flex-wrap gap-2 py-4 desk:py-5">
      {NEWS_FILTERS.map((item) => (
        <span
          key={item}
          className={`px-2.5 py-1.5 text-[11px] ${
            item === "All"
              ? "bg-navy font-semibold text-white"
              : "border border-hairline font-normal text-ink"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function NewsFilters() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const current = params.get("topic") ?? "All";

  function select(item: (typeof NEWS_FILTERS)[number]) {
    const next = new URLSearchParams(params.toString());
    if (item === "All") next.delete("topic");
    else next.set("topic", item);
    next.delete("page");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2 py-4 desk:py-5">
      {NEWS_FILTERS.map((item) => {
        const active = item === current;
        return (
          <button
            key={item}
            type="button"
            onClick={() => select(item)}
            className={`px-2.5 py-1.5 text-[11px] ${
              active
                ? "bg-navy font-semibold text-white"
                : "border border-hairline font-normal text-ink"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
