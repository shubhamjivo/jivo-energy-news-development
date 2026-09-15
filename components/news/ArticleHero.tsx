"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CoverImage } from "@/components/ui/CoverImage";
import "swiper/css";

type Slide = {
  src: string;
  alt: string;
  caption: string;
};

export function ArticleHero({
  slides,
  className = "",
  sizes = "(max-width: 1439px) 100vw, 840px",
  unoptimized = false,
  priority = true,
}: {
  slides: readonly Slide[];
  className?: string;
  sizes?: string;
  unoptimized?: boolean;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const current = slides[index] ?? slides[0];

  return (
    <div className={className}>
      <div className="article-hero relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          grabCursor
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={slide.src}>
              <CoverImage
                src={slide.src}
                alt={slide.alt}
                className="h-[232px] w-full desk:h-[420px]"
                sizes={sizes}
                priority={priority && i === 0}
                unoptimized={unoptimized}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-paper/90 text-lg text-ink disabled:opacity-40"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center rounded-full justify-center bg-navy text-lg text-white disabled:opacity-40"
        >
          ›
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={() => swiperRef.current?.slideTo(i)}
              className={`pointer-events-auto rounded-full ${i === index
                  ? "size-2 bg-accent"
                  : "size-1.5 bg-paper/80"
                }`}
            />
          ))}
        </div>
      </div>
      {current ? (
        <p className="mt-3.5 text-[11px] tracking-[0.22px] text-muted">
          {index + 1} / {slides.length} · {current.caption}
        </p>
      ) : null}
    </div>
  );
}
