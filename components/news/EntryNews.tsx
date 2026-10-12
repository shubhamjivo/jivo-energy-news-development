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

  // Kept quiet next to the card's own name: grey text instead of navy, and
  // headlines clamped to two lines so every card stays easy to scan.
  return (
    <div className={`flex flex-col border-t border-hairline pt-3 ${className}`.trim()}>
      <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
        {label}
      </p>
      <ul className="mt-2 flex flex-col gap-3">
        {articles.slice(0, limit).map((article) => (
          <li key={article.id}>
            <Link
              href={article.href}
              className="line-clamp-2 text-[13px] font-normal leading-[18px] text-neutral-900/80 hover:text-ink hover:underline"
            >
              {article.title}
            </Link>
            <p className="mt-0.5 text-[10px] text-neutral-900/50">{article.meta}</p>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-auto self-start pt-3 text-xs font-semibold text-ink hover:text-accent"
      >
        See all news →
      </Link>
    </div>
  );
}
