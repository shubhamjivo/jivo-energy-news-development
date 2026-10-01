import Link from "next/link";

export function NewsFilters({
  topics,
  current,
}: {
  topics: { slug: string; title: string }[];
  current: string;
}) {
  if (topics.length === 0) return null;
  const items = [{ slug: "", title: "All" }, ...topics];

  return (
    <div className="flex flex-wrap gap-2 py-4 desk:py-5">
      {items.map((item) => {
        const active = item.slug === current;
        return (
          <Link
            key={item.slug || "all"}
            href={item.slug ? `/news?topic=${encodeURIComponent(item.slug)}` : "/news"}
            scroll={false}
            aria-current={active ? "page" : undefined}
            className={`px-2.5 py-1.5 text-[11px] ${
              active
                ? "bg-navy font-semibold text-white"
                : "border border-hairline font-normal text-ink"
            }`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
