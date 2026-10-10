import Link from "next/link";
import type { InsightCard } from "@/lib/cms";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";

// One Insights page (Technology, Interviews, Opinion, …) and the stories it
// contributes to its slot of the block.
export type InsightSlot = {
  label: string;
  href: string;
  items: InsightCard[];
};

function SlotHeading({ slot }: { slot: InsightSlot }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-[11px] font-bold tracking-[1.1px] text-accent uppercase">
        {slot.label}
      </h3>
      <Link href={slot.href} className="text-xs text-muted hover:text-ink">
        View all →
      </Link>
    </div>
  );
}

// One swipeable slide per Insights page, used below the desktop breakpoint:
// the newest story with its image, then the rest as a compact list.
function SlotSlide({ slot }: { slot: InsightSlot }) {
  const [first, ...rest] = slot.items;
  return (
    <div className="flex h-full w-[82vw] max-w-[340px] flex-col">
      <SlotHeading slot={slot} />
      <Link href={first.href} className="mt-3 flex flex-col gap-2">
        {first.image ? (
          <CoverImage
            src={first.image}
            alt={first.title}
            className="h-[170px] w-full"
            sizes="340px"
          />
        ) : null}
        <h4 className="text-lg font-bold leading-6 text-ink">{first.title}</h4>
        <p className="line-clamp-3 text-[13px] leading-[19px] text-ink/70">
          {first.summary}
        </p>
        {first.readTime ? (
          <p className="text-[11px] text-accent">{first.readTime}</p>
        ) : null}
      </Link>
      {rest.length > 0 ? (
        <div className="mt-3 flex flex-col divide-y divide-hairline border-t border-hairline">
          {rest.map((item) => (
            <Link key={item.id} href={item.href} className="flex flex-col gap-1 py-3 last:pb-0">
              <h4 className="text-sm font-semibold leading-5 text-ink">{item.title}</h4>
              {item.readTime ? (
                <p className="text-[11px] text-accent">{item.readTime}</p>
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// Four Insights pages in one block. On desktop it is one screen: the lead
// story on top, three image cards below it and the side column split between
// two lists. Below that it is a carousel with one slide per page.
export function Insights({
  heading,
  lead,
  cards,
  side,
}: {
  heading: Heading;
  lead: InsightSlot;
  cards: InsightSlot;
  side: InsightSlot[];
}) {
  const featured = lead.items[0];
  const sideLists = side.filter((slot) => slot.items.length > 0);
  const slides = [lead, cards, ...side].filter((slot) => slot.items.length > 0);
  if (slides.length === 0) return null;

  return (
    <section className="py-5 desk:py-6">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-[1.2px] text-accent">
              {heading.kicker}
            </p>
            {heading.title ? (
              <h2 className="mt-1 text-[22px] font-bold leading-none text-ink desk:text-[28px]">
                {heading.title}
              </h2>
            ) : null}
          </div>
          {heading.linkLabel ? (
            <Link href="/insights" className="text-[13px] font-semibold text-ink desk:text-sm">
              {heading.linkLabel}
            </Link>
          ) : null}
        </div>
        <div className="mt-2 h-px bg-hairline" />

        <div className="mt-5 desk:hidden">
          <Carousel spaceBetween={20} pagination>
            {slides.map((slot) => (
              <SlotSlide key={slot.href} slot={slot} />
            ))}
          </Carousel>
        </div>

        <div className="mt-8 hidden gap-8 desk:flex">
          <div className="min-w-0 flex-1">
            {featured ? (
              <>
                <SlotHeading slot={lead} />
                <Link
                  href={featured.href}
                  className="mt-3 flex h-[250px] gap-6 overflow-hidden"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                    <h4 className="text-[30px] font-bold leading-[1.1] text-ink">
                      {featured.title}
                    </h4>
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
                      className="h-[250px] w-[380px] shrink-0"
                      sizes="380px"
                    />
                  ) : null}
                </Link>
              </>
            ) : null}

            {cards.items.length > 0 ? (
              <div
                className={featured ? "mt-4 border-t border-hairline pt-4" : undefined}
              >
                <SlotHeading slot={cards} />
                <div className="mt-3 grid grid-cols-3 gap-6">
                  {cards.items.map((card) => (
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
            ) : null}
          </div>

          {sideLists.length > 0 ? (
            <aside className="flex w-[320px] min-w-0 shrink-0 flex-col gap-6 divide-y divide-hairline">
              {sideLists.map((slot) => (
                <div key={slot.href} className="pt-6 first:pt-0">
                  <SlotHeading slot={slot} />
                  <div className="mt-3 flex flex-col divide-y divide-hairline">
                    {slot.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0"
                      >
                        <h4 className="text-base font-semibold leading-snug text-ink">
                          {item.title}
                        </h4>
                        <p className="text-[12px] leading-[17px] text-ink/70">{item.summary}</p>
                        {item.readTime ? (
                          <p className="text-[11px] text-accent">{item.readTime}</p>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </aside>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
