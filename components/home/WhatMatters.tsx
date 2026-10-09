import Link from "next/link";
import type { ArticleCard } from "@/lib/article-types";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Container } from "@/components/ui/Container";
import { Carousel } from "@/components/ui/Carousel";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhatMatters({ items, heading }: { items: ArticleCard[]; heading: Heading }) {
  if (items.length === 0) return null;

  return (
    <section id="what-matters" className="scroll-mt-36 py-5 desk:py-6">
      <Container className="relative">
        <SectionHeading
          kicker={heading.kicker}
          title={heading.title}
          href={heading.linkUrl}
          action={heading.linkLabel}
          reserveControls
        />
        <div className="mt-3.5 h-px bg-ink" />
        <Carousel className="pt-3.5" spaceBetween={20} controls pagination>
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block w-[260px] desk:w-[280px]"
            >
              {item.image ? (
                <CoverImage
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-[168px] w-full"
                  sizes="280px"
                />
              ) : null}
              {item.kicker ? (
                <Kicker className="mt-2.5 text-[10px] tracking-[0.8px]">
                  {item.kicker}
                </Kicker>
              ) : null}
              <p className="mt-1.5 text-lg font-semibold leading-6 text-ink">
                {item.title}
              </p>
              {item.dek ? (
                <p className="mt-1.5 text-[13px] leading-[19px] text-muted">
                  {item.dek}
                </p>
              ) : null}
            </Link>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
