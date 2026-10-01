import Link from "next/link";
import type { InsightCard } from "@/lib/cms";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";

export function Insights({
  featured,
  cards,
  sidebar,
  heading,
}: {
  heading: Heading;
  featured: InsightCard | null;
  cards: InsightCard[];
  sidebar: InsightCard[];
}) {
  if (!featured && cards.length === 0 && sidebar.length === 0) return null;

  return (
    <section className="py-10 desk:py-16">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-[1.2px] text-accent">
              {heading.kicker}
            </p>
            {heading.title ? (
              <h2 className="mt-1 text-[26px] font-bold leading-none text-ink desk:text-[28px]">
                {heading.title}
              </h2>
            ) : null}
          </div>
          {heading.linkUrl && heading.linkLabel ? (
            <Link href={heading.linkUrl} className="text-sm font-semibold text-ink">
              {heading.linkLabel}
            </Link>
          ) : null}
        </div>
        <div className="mt-2 h-px bg-hairline" />

        <div className="mt-8 flex flex-col gap-10 desk:flex-row desk:gap-8">
          <div className="min-w-0 flex-1">
            {featured ? (
            <Link
              href={featured.href}
              className="flex gap-6 flex-col overflow-hidden desk:h-[250px] desk:flex-row"
            >
              <div className="flex min-w-0 flex-col gap-2.5 desk:flex-1">
                <h3 className="text-[32px] font-bold leading-[1.1] text-ink desk:text-[30px]">
                  {featured.title}
                </h3>
                <p className="text-[13px] leading-[19px] text-ink/70">
                  {featured.summary}
                </p>
                <p className="flex items-center gap-2.5 text-xs">
                  {featured.readTime ? (
                    <span className="text-accent">{featured.readTime}</span>
                  ) : null}
                  {featured.readTime && featured.author ? (
                    <span className="size-1 rounded-[2px] bg-accent" />
                  ) : null}
                  {featured.author ? (
                    <span className="text-ink/50">By {featured.author}</span>
                  ) : null}
                </p>
              </div>
              {featured.image ? (
                <CoverImage
                  src={featured.image}
                  alt={featured.title}
                  className="h-[220px] w-full desk:h-[250px] desk:w-[380px] desk:shrink-0"
                  sizes="(max-width: 1439px) 100vw, 460px"
                />
              ) : null}
            </Link>
            ) : null}

            <div className="mt-4 grid gap-6 border-t border-hairline pt-2 sm:grid-cols-3">
              {cards.map((card) => (
                <Link key={card.id} href={card.href} className="flex flex-col gap-2.5">
                  {card.image ? (
                    <CoverImage
                      src={card.image}
                      alt={card.title}
                      className="h-[168px] w-full"
                      sizes="267px"
                    />
                  ) : null}
                  <Kicker className="text-[10px] tracking-[0.8px]">{card.label}</Kicker>
                  <p className="text-lg font-semibold leading-6 text-ink">{card.title}</p>
                  <p className="text-[13px] leading-[19px] text-muted">{card.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="flex w-full min-w-0 flex-col divide-y divide-hairline desk:w-[320px] desk:shrink-0">
            {sidebar.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 desk:gap-2 desk:py-4"
              >
                <h4 className="text-sm font-semibold leading-snug text-ink desk:text-base">
                  {item.title}
                </h4>
                <p className="text-[12px] leading-[17px] text-ink/70">{item.summary}</p>
                {item.readTime ? (
                  <p className="text-[11px] text-accent">{item.readTime}</p>
                ) : null}
              </Link>
            ))}
          </aside>
        </div>
      </Container>
    </section>
  );
}
