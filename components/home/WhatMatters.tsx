import Link from "next/link";
import { WHAT_MATTERS } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Dots } from "@/components/ui/Dots";
import { HScroll } from "@/components/ui/HScroll";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhatMatters() {
  return (
    <section className="pb-3 pt-8 desk:pt-10">
      <Container className="relative">
        <SectionHeading
          kicker="TODAY"
          title="What Matters Today"
          href="/news"
          action="All stories →"
          reserveControls
        />
        <div className="mt-3.5 h-px bg-ink" />
        <HScroll className="gap-5 pt-3.5" controls step={300}>
          {WHAT_MATTERS.map((item) => (
            <Link
              key={item.title}
              href="/news"
              className="w-[260px] shrink-0 snap-start desk:w-[280px]"
            >
              <CoverImage
                src={item.image}
                alt={item.title}
                className="h-[168px] w-full"
                sizes="280px"
              />
              <Kicker className="mt-2.5 text-[10px] tracking-[0.8px]">
                {item.kicker}
              </Kicker>
              <p className="mt-1.5 text-lg font-semibold leading-6 text-ink">
                {item.title}
              </p>
              <p className="mt-1.5 text-[13px] leading-[19px] text-muted">
                {item.dek}
              </p>
            </Link>
          ))}
        </HScroll>
        <div className="mt-3 flex justify-center desk:justify-start">
          <Dots count={2} />
        </div>
      </Container>
    </section>
  );
}
