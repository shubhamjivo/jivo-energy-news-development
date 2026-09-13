import Link from "next/link";
import { NEWS_CARDS } from "@/lib/content";
import { CoverImage } from "@/components/ui/CoverImage";
import { HScroll } from "@/components/ui/HScroll";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NewsAnalysis() {
  return (
    <section className="px-5 pb-3 pt-8 desk:px-24 desk:pt-10">
      <SectionHeading
        kicker="THE NEWSROOM"
        title="News & Analysis"
        href="/news"
        action="Latest Africa Energy →"
      />
      <div className="mt-3.5 h-px bg-ink" />

      <div className="mt-5 hidden grid-cols-4 gap-x-5 gap-y-6 desk:grid">
        {NEWS_CARDS.map((card) => (
          <NewsCard key={card.title} card={card} />
        ))}
      </div>

      <div className="mt-5 desk:hidden">
        <HScroll className="gap-4" controls>
          {NEWS_CARDS.map((card) => (
            <div key={card.title} className="w-[280px] shrink-0 snap-start">
              <NewsCard card={card} />
            </div>
          ))}
        </HScroll>
      </div>
    </section>
  );
}

function NewsCard({ card }: { card: (typeof NEWS_CARDS)[number] }) {
  return (
    <Link href="/news" className="flex flex-col gap-2.5">
      <CoverImage
        src={card.image}
        alt={card.title}
        className="h-[168px] w-full"
        sizes="(max-width: 1439px) 80vw, 315px"
      />
      <Kicker
        className="text-[10px] tracking-[0.8px]"
        tone={"accent" in card && card.accent ? "accent" : "ink"}
      >
        {card.kicker}
      </Kicker>
      <p className="text-lg font-semibold leading-6 text-ink">{card.title}</p>
      <p className="text-[13px] leading-[19px] text-muted">{card.dek}</p>
    </Link>
  );
}
