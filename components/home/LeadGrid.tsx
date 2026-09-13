import Link from "next/link";
import { LEAD_STORY, LATEST_STORIES, RELATED_NEWS } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { HScroll } from "@/components/ui/HScroll";
import { Kicker } from "@/components/ui/Kicker";

export function LeadGrid() {
  return (
    <section className="py-6 desk:py-8">
      <Container>
        <div className="flex flex-col gap-8 desk:flex-row desk:items-start desk:gap-6">
          <aside className="order-3 hidden w-[300px] shrink-0 desk:order-1 desk:block" id="latest">
            <LatestList />
          </aside>

          <article className="order-1 min-w-0 flex-1 desk:order-2">
            <div className="relative h-[232px] w-full desk:h-[420px]">
              <CoverImage
                src={LEAD_STORY.image}
                alt={LEAD_STORY.caption}
                className="h-full w-full"
                sizes="(max-width: 1439px) 100vw, 680px"
                priority
              />
            </div>
            <div className="mt-3.5 flex flex-col gap-2">
              <p className="text-[11px] tracking-[0.22px] text-muted">
                {LEAD_STORY.caption}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="font-semibold tracking-[0.88px] text-accent">
                  {LEAD_STORY.kicker}
                </span>
                <span className="tracking-[0.66px] text-muted">
                  {LEAD_STORY.markets}
                </span>
              </div>
              <h1 className="text-[28px] font-bold leading-[34px] text-ink desk:text-[28px]">
                {LEAD_STORY.title}
              </h1>
              <p className="text-sm leading-[21px] text-muted">{LEAD_STORY.dek}</p>
              <p className="text-xs text-muted">{LEAD_STORY.byline}</p>
            </div>
          </article>

          <aside className="order-2 min-w-0 desk:order-3 desk:w-[292px] desk:shrink-0">
            <h2 className="text-lg font-bold leading-[22px] text-ink">RELATED NEWS</h2>
            <div className="mt-0.5 h-px bg-accent" />
            <div className="hidden desk:block">
              {RELATED_NEWS.map((item, i) => (
                <RelatedRow key={`${item.title}-${i}`} item={item} />
              ))}
            </div>
            <div className="desk:hidden">
              <HScroll className="gap-4 pt-3">
                {RELATED_NEWS.map((item, i) => (
                  <Link
                    key={`${item.title}-m-${i}`}
                    href="/news"
                    className="w-[220px] shrink-0 snap-start"
                  >
                    <CoverImage
                      src={item.image}
                      alt={item.title}
                      className="h-[88px] w-full"
                      sizes="220px"
                    />
                    <Kicker className="mt-2">{item.kicker}</Kicker>
                    <p className="mt-1 text-[15px] font-semibold leading-[18px] text-ink">
                      {item.title}
                    </p>
                  </Link>
                ))}
              </HScroll>
            </div>
          </aside>
        </div>

        <div className="mt-8 desk:hidden" id="latest">
          <LatestList />
        </div>
      </Container>
    </section>
  );
}

function LatestList() {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[1px] text-accent">LATEST</p>
      <div className="h-px bg-accent" />
      {LATEST_STORIES.map((story) => (
        <Link
          key={story.title}
          href="/news"
          className="flex gap-3 border-b border-hairline py-2"
        >
          <CoverImage
            src={story.image}
            alt={story.title}
            className="size-[72px] shrink-0 rounded-sm desk:size-[72px]"
            sizes="72px"
          />
          <div className="flex min-w-0 flex-col gap-1.5">
            <Kicker>{story.kicker}</Kicker>
            <p className="text-sm font-semibold leading-[18px] text-ink">
              {story.title}
            </p>
            <p className="text-[9px] text-muted">{story.meta}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function RelatedRow({
  item,
}: {
  item: (typeof RELATED_NEWS)[number];
}) {
  return (
    <Link href="/news" className="flex gap-3 border-b border-hairline py-3 last:border-b-0" >
      <div className="flex min-w-0 flex-col gap-1">
        <Kicker>{item.kicker}</Kicker>
        <p className="text-[15px] font-semibold leading-[18px] text-ink">
          {item.title}
        </p>
        <p className="text-xs leading-4 text-muted">{item.dek}</p>
      </div>
      <CoverImage
        src={item.image}
        alt={item.title}
        className="h-[72px] w-[88px] shrink-0 rounded-sm"
        sizes="88px"
      />
    </Link>
  );
}


