"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { REELS } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function Reels() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-8 desk:py-10">
      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-[26px] font-bold text-ink desk:text-[28px]">Reels</h2>
          <Link href="/news" className="text-sm font-semibold text-forest">
            VIEW ALL →
          </Link>
        </div>

        <div className="mt-6 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {REELS.map((reel, index) => (
              <div
                key={reel.youtubeId}
                className="min-w-0 shrink-0 grow-0 basis-[210px] pr-5 desk:basis-[240px]"
              >
                <ReelCard reel={reel} active={index === selected} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 hidden items-center justify-between desk:flex">
          <button
            type="button"
            aria-label="Previous"
            disabled={!canPrev}
            onClick={() => emblaApi?.scrollPrev()}
            className="flex size-9 items-center justify-center rounded-full border border-hairline text-lg text-ink disabled:opacity-30"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={!canNext}
            onClick={() => emblaApi?.scrollNext()}
            className="flex size-9 items-center justify-center bg-forest text-lg text-white disabled:opacity-30"
          >
            ›
          </button>
        </div>

        <div className="mt-3 flex justify-center gap-1.5 desk:justify-start" aria-hidden>
          {REELS.map((reel, index) => (
            <button
              key={reel.youtubeId}
              type="button"
              aria-label={`Go to reel ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={
                index === selected
                  ? "size-2 rounded-full bg-ink"
                  : "size-1.5 rounded-full bg-muted/50"
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReelCard({
  reel,
  active,
}: {
  reel: (typeof REELS)[number];
  active: boolean;
}) {
  const thumb = `https://i.ytimg.com/vi/${reel.youtubeId}/hqdefault.jpg`;
  const src = `https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&controls=0`;

  return (
    <article className="relative h-[380px] overflow-hidden bg-ink desk:h-[426px]">
      {active ? (
        <iframe
          title={reel.title}
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-1/2 h-full w-[316%] max-w-none -translate-x-1/2 border-0"
        />
      ) : (
        <Image
          src={thumb}
          alt=""
          fill
          sizes="240px"
          className="object-cover"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <a
        href={`https://www.youtube.com/watch?v=${reel.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-2xl bg-white"
        aria-label={`Watch ${reel.title} on YouTube`}
      >
        <span className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-ink" />
      </a>
      <span className="absolute right-3 top-3 rounded-full bg-neutral-900 px-2 py-1 text-[10px] font-semibold text-white">
        {reel.duration}
      </span>
      <div className="absolute inset-x-3 bottom-4">
        <p className="text-base font-semibold leading-[22px] text-white">{reel.title}</p>
        <p className="mt-1 text-[11px] text-white/70">{reel.source}</p>
      </div>
    </article>
  );
}
