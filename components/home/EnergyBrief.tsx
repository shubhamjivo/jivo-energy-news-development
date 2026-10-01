"use client";

import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import type { BriefItem } from "@/lib/cms";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Container } from "@/components/ui/Container";
import "swiper/css";

export function EnergyBrief({ items, heading }: { items: BriefItem[]; heading: Heading }) {
  if (items.length === 0) return null;
  // Doubled so the looping ticker never shows a gap.
  const tickerItems = [...items, ...items];

  return (
    <section id="brief" className="scroll-mt-36 bg-ink" aria-label={heading.title}>
      <Container className="flex items-center gap-4">
        <div className="flex h-[52px] shrink-0 items-center border-r border-white/20 px-4">
          <p className="text-[11px] font-bold tracking-[0.44px] whitespace-nowrap text-white">
            {heading.title}
          </p>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <Swiper
            className="brief-ticker"
            modules={[Autoplay, FreeMode]}
            loop
            slidesPerView="auto"
            spaceBetween={48}
            speed={5000}
            allowTouchMove
            observer
            observeParents
            freeMode={{ enabled: true, momentum: false }}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {tickerItems.map((item, index) => {
              const content = (
                <>
                  <span className="text-[11px] font-semibold text-accent">
                    {item.label}
                  </span>
                  <span className="text-xs text-white">{item.text}</span>
                </>
              );
              return (
                <SwiperSlide key={`${item.text}-${index}`} className="!w-auto">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 whitespace-nowrap"
                    >
                      {content}
                    </Link>
                  ) : (
                    <p className="flex items-center gap-2 whitespace-nowrap">{content}</p>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
