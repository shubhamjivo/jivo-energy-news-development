import Link from "next/link";
import type { ArticleCard } from "@/lib/article-types";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Carousel } from "@/components/ui/Carousel";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NewsAnalysis({ items, heading }: { items: ArticleCard[]; heading: Heading }) {
  if (items.length === 0) return null;

  return (
    <section className="py-5 desk:py-6">
      <Container>
        <SectionHeading
          kicker={heading.kicker}
          title={heading.title}
          href={heading.linkUrl}
          action={heading.linkLabel}
        />
        <div className="mt-3.5 h-px bg-ink" />

        <div className="mt-5 hidden grid-cols-4 gap-x-5 gap-y-6 desk:grid">
          {items.map((card, index) => (
            <NewsCard key={card.id} card={card} accent={index === 0} />
          ))}
        </div>

        <div className="mt-5 desk:hidden">
          <Carousel spaceBetween={16} controls>
            {items.map((card, index) => (
              <div key={card.id} className="w-[280px]">
                <NewsCard card={card} accent={index === 0} />
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}

function NewsCard({ card, accent }: { card: ArticleCard; accent: boolean }) {
  return (
    <Link href={card.href} className="flex flex-col gap-2.5">
      {card.image ? (
        <CoverImage
          src={card.image}
          alt={card.imageAlt}
          className="h-[168px] w-full"
          sizes="(max-width: 1439px) 80vw, 315px"
        />
      ) : null}
      {card.kicker ? (
        <Kicker className="text-[10px] tracking-[0.8px]" tone={accent ? "accent" : "ink"}>
          {card.kicker}
        </Kicker>
      ) : null}
      <p className="text-lg font-semibold leading-6 text-ink">{card.title}</p>
      {card.dek ? (
        <p className="text-[13px] leading-[19px] text-muted">{card.dek}</p>
      ) : null}
    </Link>
  );
}
