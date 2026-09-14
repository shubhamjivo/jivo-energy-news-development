"use client";

import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ENERGY_BRIEF } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import "swiper/css";

const TICKER_ITEMS = [...ENERGY_BRIEF, ...ENERGY_BRIEF];

export function EnergyBrief() {
  return (
    <section id="brief" className="bg-ink" aria-label="Africa Energy Brief">
      <Container className="flex items-center gap-4">
        <div className="flex h-[52px] shrink-0 items-center border-r border-white/20 px-4">
          <p className="text-[11px] font-bold tracking-[0.44px] whitespace-nowrap text-white">
            Africa Energy Brief
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
            {TICKER_ITEMS.map((item, index) => (
              <SwiperSlide key={`${item.kicker}-${index}`} className="!w-auto">
                <p className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-[11px] font-semibold text-accent">
                    {item.kicker}
                  </span>
                  <span className="text-xs text-white">{item.text}</span>
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
