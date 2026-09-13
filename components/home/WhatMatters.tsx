import Link from "next/link";
import { WHAT_MATTERS } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Carousel } from "@/components/ui/Carousel";
import { CoverImage } from "@/components/ui/CoverImage";
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
        <Carousel className="pt-3.5" spaceBetween={20} controls pagination>
          {WHAT_MATTERS.map((item) => (
            <Link
              key={item.title}
              href="/news"
              className="block w-[260px] desk:w-[280px]"
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
        </Carousel>
      </Container>
    </section>
  );
}
