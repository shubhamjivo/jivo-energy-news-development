import Link from "next/link";
import { INSIGHT_CARDS, INSIGHT_FEATURED, INSIGHT_SIDEBAR } from "@/lib/content";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";

export function Insights() {
  return (
    <section className="px-5 py-10 desk:px-24 desk:py-16">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-[1.2px] text-accent">INSIGHTS</p>
        <Link href="/insights" className="text-sm font-semibold text-ink">
          MORE INSIGHTS →
        </Link>
      </div>
      <div className="mt-2 h-px bg-hairline" />

      <div className="mt-8 flex flex-col gap-10 desk:flex-row desk:gap-8">
        <div className="min-w-0 flex-1">
          <Link
            href="/insights"
            className="flex flex-col overflow-hidden shadow-[0px_12px_24px_-8px_rgba(0,0,0,0.05)] desk:h-[328px] desk:flex-row"
          >
            <div className="flex flex-col gap-2.5 p-6 desk:w-[508px] desk:p-8">
              <h3 className="text-[32px] font-bold leading-[1.1] text-ink desk:text-[40px]">
                {INSIGHT_FEATURED.title}
              </h3>
              <p className="text-[13px] leading-[19px] text-ink/70">
                {INSIGHT_FEATURED.dek}
              </p>
              <p className="flex items-center gap-2.5 text-xs">
                <span className="text-accent">{INSIGHT_FEATURED.read}</span>
                <span className="size-1 rounded-[2px] bg-accent" />
                <span className="text-ink/50">{INSIGHT_FEATURED.byline}</span>
              </p>
            </div>
            <CoverImage
              src={INSIGHT_FEATURED.image}
              alt={INSIGHT_FEATURED.title}
              className="h-[220px] w-full desk:h-[328px] desk:w-[360px] desk:shrink-0"
              sizes="(max-width: 1439px) 100vw, 360px"
            />
          </Link>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {INSIGHT_CARDS.map((card) => (
              <Link key={card.title} href="/insights" className="flex flex-col gap-2.5">
                <CoverImage
                  src={card.image}
                  alt={card.title}
                  className="h-[168px] w-full"
                  sizes="267px"
                />
                <Kicker className="text-[10px] tracking-[0.8px]">{card.kicker}</Kicker>
                <p className="text-lg font-semibold leading-6 text-ink">{card.title}</p>
                <p className="text-[13px] leading-[19px] text-muted">{card.dek}</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="flex w-full flex-col justify-center gap-10 desk:w-[420px] desk:shrink-0 desk:gap-12">
          {INSIGHT_SIDEBAR.map((item) => (
            <Link key={item.title} href="/insights" className="flex flex-col gap-2.5">
              <p className="text-xl font-bold leading-[1.2] text-ink desk:text-2xl">
                {item.title}
              </p>
              <p className="text-[13px] leading-[19px] text-ink/70">{item.dek}</p>
              <p className="text-xs text-accent">{item.read}</p>
            </Link>
          ))}
        </aside>
      </div>
    </section>
  );
}
