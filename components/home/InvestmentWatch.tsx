import Link from "next/link";
import { INVESTMENTS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InvestmentWatch() {
  return (
    <section className="px-5 pb-2 pt-8 desk:px-24 desk:pt-10">
      <SectionHeading
        kicker="DEALS & CAPITAL"
        title="Energy Investment Watch"
        href="/news"
        action="All investment news →"
      />
      <div className="mt-3.5 h-px bg-ink" />
      {INVESTMENTS.map((item) => (
        <Link
          key={item.title}
          href="/news"
          className="flex flex-col gap-2 border-b border-hairline py-4 desk:flex-row desk:items-center desk:justify-between desk:py-3"
        >
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
              {item.kicker}
            </p>
            <p className="text-base font-semibold leading-[21px] text-ink">
              {item.title}
            </p>
          </div>
          <p className="text-[22px] font-bold text-ink desk:shrink-0">{item.value}</p>
        </Link>
      ))}
    </section>
  );
}
