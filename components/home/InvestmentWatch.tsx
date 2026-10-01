import Link from "next/link";
import type { DealEntry } from "@/lib/cms";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InvestmentWatch({ deals, heading }: { deals: DealEntry[]; heading: Heading }) {
  if (deals.length === 0) return null;

  return (
    <section className="pb-2 pt-8 desk:pt-10">
      <Container>
      <SectionHeading
        kicker={heading.kicker}
        title={heading.title}
        href={heading.linkUrl}
        action={heading.linkLabel}
      />
      <div className="mt-3.5 h-px bg-ink" />
      {deals.map((item) => (
        <Link
          key={item.title}
          href={item.href || "/companies"}
          className="flex flex-col gap-2 border-b border-hairline py-4 desk:flex-row desk:items-center desk:justify-between desk:py-3"
        >
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
              {item.type}
            </p>
            <p className="text-base font-semibold leading-[21px] text-ink">
              {item.title}
            </p>
          </div>
          <p className="text-[22px] font-bold text-ink desk:shrink-0">{item.value}</p>
        </Link>
      ))}
      </Container>
    </section>
  );
}
