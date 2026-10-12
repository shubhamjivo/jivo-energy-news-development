import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import type { ArticleCard } from "@/lib/article-types";

// Articles tied to a country or project. `label` replaces the article's
// topic above the headline, e.g. with the project it belongs to.
export function LinkedArticles({
  title,
  articles,
}: {
  title: string;
  articles: (ArticleCard & { label?: string })[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="py-5 desk:py-6">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
            {title}
          </h2>
          <Link href="/news" className="text-xs text-muted hover:text-ink">
            All news →
          </Link>
        </div>
        <ul className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 desk:grid-cols-4">
          {articles.map((article) => (
            <li key={article.id}>
              <Link href={article.href} className="group block">
                {article.image ? (
                  <CoverImage
                    src={article.image}
                    alt={article.imageAlt}
                    className="h-[168px] w-full"
                    sizes="(max-width: 1439px) 50vw, 280px"
                  />
                ) : null}
                <p className="mt-2.5 text-[10px] font-semibold tracking-[0.8px] text-accent uppercase">
                  {article.label || article.kicker}
                </p>
                <h3 className="mt-1 text-lg font-semibold leading-6 text-ink group-hover:underline">
                  {article.title}
                </h3>
                <p className="mt-1 text-xs leading-4 text-muted">{article.meta}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
