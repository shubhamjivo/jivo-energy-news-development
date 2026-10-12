import Link from "next/link";
import type { ArticleCard } from "@/lib/article-types";

// The newest stories filed under one company, project or country, listed
// under its card with a link to the full filtered news list.
export function EntryNews({
  articles,
  href,
  label = "LATEST NEWS",
  limit = 3,
  className = "",
}: {
  articles: ArticleCard[];
  href: string;
  label?: string;
  limit?: number;
  className?: string;
}) {
  if (articles.length === 0) return null;

  // Set apart from the card's own name: a tinted panel with a green rule, and
  // headlines in regular weight so they read as secondary to the name above.
  return (
    <div className={`border-l-2 border-accent bg-hairline/30 px-3 py-2.5 ${className}`.trim()}>
      <p className="text-[10px] font-semibold tracking-[0.8px] text-muted">
        {label}
      </p>
      <ul className="mt-2 flex flex-col gap-2.5">
        {articles.slice(0, limit).map((article) => (
          <li key={article.id}>
            <Link
              href={article.href}
              className="block text-[13px] font-normal leading-[18px] text-ink/90 hover:underline"
            >
              {article.title}
            </Link>
            <p className="mt-0.5 text-[10px] text-muted">{article.meta}</p>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-3 inline-block text-xs font-semibold text-ink hover:text-accent"
      >
        See all news →
      </Link>
    </div>
  );
}
