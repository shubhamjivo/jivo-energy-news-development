import Link from "next/link";

function pageHref(basePath: string, page: number) {
  return page > 1 ? `${basePath}?page=${page}` : basePath;
}

// Numbered pages with previous/next arrows, styled like the /news pager.
export function Pagination({
  basePath,
  page,
  pageCount,
  label = "Pages",
}: {
  basePath: string;
  page: number;
  pageCount: number;
  label?: string;
}) {
  if (pageCount <= 1) return null;
  const box = "flex h-9 w-9 items-center justify-center text-[13px]";

  return (
    <nav aria-label={label} className="mt-8 flex flex-wrap items-center gap-2">
      {page > 1 ? (
        <Link
          aria-label="Previous page"
          href={pageHref(basePath, page - 1)}
          className={`${box} border border-hairline text-ink`}
        >
          ←
        </Link>
      ) : null}
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={pageHref(basePath, n)}
          aria-current={n === page ? "page" : undefined}
          className={`${box} ${n === page ? "bg-navy text-white" : "border border-hairline text-ink"}`}
        >
          {n}
        </Link>
      ))}
      {page < pageCount ? (
        <Link
          aria-label="Next page"
          href={pageHref(basePath, page + 1)}
          className={`${box} border border-hairline text-ink`}
        >
          →
        </Link>
      ) : null}
    </nav>
  );
}
