import Link from "next/link";
import { NEWS_CARDS } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Carousel } from "@/components/ui/Carousel";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NewsAnalysis() {
  return (
    <section className="pb-3 pt-8 desk:pt-10">
      <Container>
        <SectionHeading
          kicker="THE NEWSROOM"
          title="News"
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
          <Carousel spaceBetween={16} controls>
            {NEWS_CARDS.map((card) => (
              <div key={card.title} className="w-[280px]">
                <NewsCard card={card} />
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
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
