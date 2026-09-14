"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NEWS_LATEST } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";

const PAGE_SIZE = 6;

function matchesFilter(kicker: string, filter: string) {
  if (filter === "All") return true;
  return kicker.toLowerCase().includes(filter.toLowerCase());
}

export function NewsLatest() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filter = params.get("topic") ?? "All";
  const page = Math.max(1, Number(params.get("page") ?? "1") || 1);

  const filtered = useMemo(
    () => NEWS_LATEST.filter((story) => matchesFilter(story.kicker, filter)),
    [filter],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const stories = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function goToPage(n: number) {
    const next = new URLSearchParams(params.toString());
    if (n <= 1) next.delete("page");
    else next.set("page", String(n));
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <section className="pb-10 pt-4 desk:pt-2">
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
            <Link key={story.title} href="/news" className="flex flex-col gap-3">
              <CoverImage
                src={story.image}
                alt={story.title}
                className="h-[240px] w-full"
                sizes="(max-width: 1439px) 100vw, 384px"
              />
              <Kicker className="text-[10px] tracking-[0.8px]" tone="ink">
                {story.kicker}
              </Kicker>
              <p className="text-[22px] font-semibold leading-7 text-ink">
                {story.title}
              </p>
              <p className="text-sm leading-[21px] text-muted">{story.dek}</p>
              <p className="text-xs text-muted">{story.byline}</p>
            </Link>
          ))}
        </div>

        <div className="desk:hidden">
          {stories.map((story) => (
            <Link
              key={story.title}
              href="/news"
              className="flex gap-3 border-b border-hairline py-3"
            >
              <CoverImage
                src={story.image}
                alt={story.title}
                className="h-20 w-[110px] shrink-0"
                sizes="110px"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <Kicker>{story.kicker}</Kicker>
                <p className="text-sm font-semibold leading-[18px] text-ink">
                  {story.title}
                </p>
                <p className="text-[11px] text-muted">{story.byline}</p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-8 text-sm text-muted">No stories in this desk yet.</p>
        ) : (
          <nav
            aria-label="News pages"
            className="mt-6 flex items-center gap-2"
          >
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => goToPage(n)}
                className={`flex h-9 w-9 items-center justify-center text-[13px] ${
                  n === current
                    ? "bg-navy text-white"
                    : "border border-hairline text-ink"
                }`}
              >
                {n}
              </button>
            ))}
            {current < pageCount ? (
              <button
                type="button"
                aria-label="Next page"
                onClick={() => goToPage(current + 1)}
                className="flex h-9 w-9 items-center justify-center border border-hairline text-[13px] text-ink"
              >
                →
              </button>
            ) : null}
          </nav>
        )}
      </Container>
    </section>
  );
}
