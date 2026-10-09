import Link from "next/link";
import type { ArticleCard } from "@/lib/article-types";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";

function pageHref(page: number, topic: string) {
  const params = new URLSearchParams();
  if (topic) params.set("topic", topic);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/news?${query}` : "/news";
}

export function NewsLatest({
  stories,
  page,
  pageCount,
  topic,
}: {
  stories: ArticleCard[];
  page: number;
  pageCount: number;
  topic: string;
}) {
  return (
    <section className="py-5 desk:py-6">
      <Container>
        <div className="flex items-end justify-between">
          <h2 className="text-[22px] font-bold text-ink desk:text-[28px]">
            The Latest
          </h2>
          <p className="hidden text-xs text-muted desk:block">Sorted by newest</p>
        </div>
        <div className="mt-3 h-px bg-hairline" />

        <div className="mt-6 hidden grid-cols-3 gap-x-6 gap-y-6 desk:grid">
          {stories.map((story) => (
            <Link key={story.id} href={story.href} className="flex flex-col gap-3">
              {story.image ? (
                <CoverImage
                  src={story.image}
                  alt={story.imageAlt}
                  className="h-[240px] w-full"
                  sizes="(max-width: 1439px) 100vw, 384px"
                />
              ) : null}
              {story.kicker ? (
                <Kicker className="text-[10px] tracking-[0.8px]" tone="ink">
                  {story.kicker}
                </Kicker>
              ) : null}
              <p className="text-[22px] font-semibold leading-7 text-ink">
                {story.title}
              </p>
              {story.dek ? (
                <p className="text-sm leading-[21px] text-muted">
                  {story.dek}
                </p>
              ) : null}
              <p className="text-xs text-muted">{story.byline}</p>
            </Link>
          ))}
        </div>

        <div className="desk:hidden">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={story.href}
              className="flex gap-3 border-b border-hairline py-3"
            >
              {story.thumbnail ? (
                <CoverImage
                  src={story.thumbnail}
                  alt={story.imageAlt}
                  className="h-20 w-[110px] shrink-0"
                  sizes="110px"
                />
              ) : null}
              <div className="flex min-w-0 flex-col gap-1">
                {story.kicker ? <Kicker>{story.kicker}</Kicker> : null}
                <p className="text-sm font-semibold leading-[18px] text-ink">
                  {story.title}
                </p>
                <p className="text-[11px] text-muted">{story.byline}</p>
              </div>
            </Link>
          ))}
        </div>

        {stories.length === 0 ? (
          <p className="py-8 text-sm text-muted">No stories in this desk yet.</p>
        ) : pageCount > 1 ? (
          <nav aria-label="News pages" className="mt-6 flex items-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={pageHref(n, topic)}
                scroll={false}
                aria-current={n === page ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center text-[13px] ${
                  n === page
                    ? "bg-navy text-white"
                    : "border border-hairline text-ink"
                }`}
              >
                {n}
              </Link>
            ))}
            {page < pageCount ? (
              <Link
                aria-label="Next page"
                href={pageHref(page + 1, topic)}
                scroll={false}
                className="flex h-9 w-9 items-center justify-center border border-hairline text-[13px] text-ink"
              >
                →
              </Link>
            ) : null}
          </nav>
        ) : null}
      </Container>
    </section>
  );
}
