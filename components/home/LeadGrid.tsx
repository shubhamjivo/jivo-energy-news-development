import Link from "next/link";
import { LEAD_STORY } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { ArticleHero } from "@/components/news/ArticleHero";
import { LatestNews } from "@/components/news/LatestNews";
import { RelatedNews } from "@/components/news/RelatedNews";

export function LeadGrid() {
  return (
    <section className="py-6 desk:py-8">
      <Container>
        <div className="flex flex-col gap-8 desk:flex-row desk:items-start desk:gap-6">
          <aside className="order-3 hidden w-[300px] shrink-0 desk:order-1 desk:block" id="latest">
            <LatestNews />
          </aside>

          <article className="order-1 min-w-0 flex-1 desk:order-2">
            <ArticleHero
              slides={LEAD_STORY.gallery}
              sizes="(max-width: 1439px) 100vw, 680px"
            />
            <div className="mt-3.5 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="font-semibold tracking-[0.88px] text-accent">
                  {LEAD_STORY.kicker}
                </span>
                <span className="tracking-[0.66px] text-muted">
                  {LEAD_STORY.markets}
                </span>
              </div>
              <h1 className="text-[28px] font-bold leading-[34px] text-ink">
                <Link href={LEAD_STORY.href} className="hover:text-muted">
                  {LEAD_STORY.title}
                </Link>
              </h1>
              <p className="text-sm leading-[21px] text-muted">{LEAD_STORY.dek}</p>
              <p className="text-xs text-muted">{LEAD_STORY.byline}</p>
            </div>
          </article>

          <div className="order-2 min-w-0 desk:order-3 desk:w-[292px] desk:shrink-0">
            <RelatedNews />
          </div>
        </div>

        <div className="mt-8 desk:hidden" id="latest">
          <LatestNews />
        </div>
      </Container>
    </section>
  );
}


