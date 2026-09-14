import { Suspense } from "react";
import Link from "next/link";
import { LEAD_STORY, NEWS_RELATED } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";
import { NewsFilters, NewsFiltersFallback } from "@/components/news/NewsFilters";
import { NewsLatest } from "@/components/news/NewsLatest";

export function NewsIndex() {
  return (
    <main>
      <section className="pt-8 pb-2 desk:pt-10">
        <Container>
          <p className="text-[10px] font-semibold tracking-[1px] text-accent">
            THE NEWSROOM
          </p>
          <h1 className="mt-2.5 text-[32px] font-bold leading-[38px] text-ink desk:text-[48px] desk:leading-none">
            News
          </h1>
          <p className="mt-2.5 max-w-[820px] text-sm leading-5 text-muted desk:text-base desk:leading-6">
            Dispatches from the African energy beat — markets, policy, projects
            and capital.
          </p>
          <div className="mt-2.5 h-px bg-hairline" />
        </Container>
      </section>

      <section className="py-3 desk:py-6">
        <Container>
          <div className="flex flex-col gap-8 desk:flex-row desk:items-start desk:gap-7">
            <article className="min-w-0 flex-1">
              <Link href={LEAD_STORY.href} className="block">
                <CoverImage
                  src={LEAD_STORY.image}
                  alt={LEAD_STORY.title}
                  className="h-[200px] w-full desk:h-[430px]"
                  sizes="(max-width: 1439px) 100vw, 820px"
                  priority
                />
              </Link>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px]">
                <span className="font-semibold tracking-[0.88px] text-accent">
                  {LEAD_STORY.kicker}
                </span>
                <span className="hidden tracking-[0.66px] text-muted desk:inline">
                  {LEAD_STORY.markets}
                </span>
              </div>
              <h2 className="mt-3 text-[24px] font-bold leading-[30px] text-ink desk:text-[32px] desk:leading-[38px]">
                <Link href={LEAD_STORY.href} className="hover:text-muted">
                  {LEAD_STORY.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-[21px] text-muted desk:max-w-[760px] desk:text-[15px] desk:leading-[22px]">
                {LEAD_STORY.dek}
              </p>
              <p className="mt-2 text-[11px] text-muted desk:text-xs">
                {LEAD_STORY.byline}
              </p>
            </article>

            <aside className="w-full shrink-0 desk:w-[380px]">
              <h2 className="text-base font-bold leading-[22px] text-ink desk:text-lg">
                <span className="desk:hidden">Also in this story</span>
                <span className="hidden desk:inline">RELATED NEWS</span>
              </h2>
              <div className="mt-0.5 h-px bg-accent" />
              {NEWS_RELATED.map((item) => (
                <Link
                  key={item.title}
                  href="/news"
                  className="flex gap-3.5 border-b border-hairline py-3 last:border-b-0"
                >
                  <CoverImage
                    src={item.image}
                    alt={item.title}
                    className="h-[72px] w-[96px] shrink-0 desk:h-[88px] desk:w-[120px]"
                    sizes="120px"
                  />
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <Kicker>{item.kicker}</Kicker>
                    <p className="text-[13px] font-semibold leading-[17px] text-ink desk:text-[15px] desk:leading-5">
                      {item.title}
                    </p>
                    <p className="text-[9px] text-muted">{item.meta}</p>
                  </div>
                </Link>
              ))}
            </aside>
          </div>
        </Container>
      </section>

      <Suspense>
        <NewsLatest />
      </Suspense>
    </main>
  );
}
