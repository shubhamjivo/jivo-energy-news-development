"use client";

import { Children, useRef, type ReactNode } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

type CarouselProps = {
  children: ReactNode;
  className?: string;
  spaceBetween?: number;
  controls?: boolean;
  controlPosition?: "header" | "bottom";
  pagination?: boolean;
  nextTone?: "forest" | "navy";
};

function Controls({
  prevRef,
  nextRef,
  nextTone,
  className,
}: {
  prevRef: React.RefObject<HTMLButtonElement | null>;
  nextRef: React.RefObject<HTMLButtonElement | null>;
  nextTone: "forest" | "navy";
  className?: string;
}) {
  return (
    <div className={className}>
      <button
        ref={prevRef}
        type="button"
        aria-label="Previous"
        className="flex size-9 items-center justify-center rounded-full border border-hairline text-lg text-ink"
      >
        ‹
      </button>
      <button
        ref={nextRef}
        type="button"
        aria-label="Next"
        className={`flex size-9 items-center rounded-full justify-center text-lg text-white ${nextTone === "navy" ? "bg-navy" : "bg-forest"
          }`}
      >
        ›
      </button>
    </div>
  );
}

export function Carousel({
  children,
  className = "",
  spaceBetween = 16,
  controls = false,
  controlPosition = "header",
  pagination = false,
  nextTone = "forest",
}: CarouselProps) {
  const slides = Children.toArray(children);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  function bindNav(swiper: SwiperType) {
    if (!controls) return;
    const nav = swiper.params.navigation;
    if (!nav || typeof nav === "boolean") return;
    nav.prevEl = prevRef.current;
    nav.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }

  return (
    <div className={`carousel relative w-full ${className}`.trim()}>
      {controls && controlPosition === "header" ? (
        <Controls
          prevRef={prevRef}
          nextRef={nextRef}
          nextTone={nextTone}
          className="pointer-events-none absolute -top-[52px] right-0 z-10 hidden items-center gap-2 desk:flex [&_button]:pointer-events-auto"
        />
      ) : null}

      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView="auto"
        spaceBetween={spaceBetween}
        grabCursor
        watchOverflow
        navigation={controls}
        pagination={
          pagination
            ? {
              clickable: true,
            }
            : false
        }
        onBeforeInit={bindNav}
        onSwiper={bindNav}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="!h-auto !w-auto">
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>

      {controls && controlPosition === "bottom" ? (
        <Controls
          prevRef={prevRef}
          nextRef={nextRef}
          nextTone={nextTone}
          className="mt-4 hidden items-center justify-between desk:flex"
        />
      ) : null}
    </div>
  );
}
