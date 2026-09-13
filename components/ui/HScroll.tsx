"use client";

import { useRef, type ReactNode } from "react";

type HScrollProps = {
  children: ReactNode;
  className?: string;
  step?: number;
  controls?: boolean;
  controlPosition?: "header" | "bottom";
  nextTone?: "forest" | "navy";
};

function Controls({
  onPrev,
  onNext,
  nextTone,
  className,
}: {
  onPrev: () => void;
  onNext: () => void;
  nextTone: "forest" | "navy";
  className?: string;
}) {
  return (
    <div className={className}>
      <button
        type="button"
        aria-label="Previous"
        onClick={onPrev}
        className="flex size-9 items-center justify-center rounded-full border border-hairline text-lg text-ink"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        className={`flex size-9 items-center justify-center text-lg text-white ${
          nextTone === "navy" ? "bg-navy" : "bg-forest"
        }`}
      >
        ›
      </button>
    </div>
  );
}

export function HScroll({
  children,
  className = "",
  step = 320,
  controls = false,
  controlPosition = "header",
  nextTone = "forest",
}: HScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  function scrollBy(dir: number) {
    ref.current?.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative w-full">
      {controls && controlPosition === "header" ? (
        <Controls
          onPrev={() => scrollBy(-1)}
          onNext={() => scrollBy(1)}
          nextTone={nextTone}
          className="pointer-events-none absolute -top-[52px] right-0 hidden items-center gap-2 desk:flex [&_button]:pointer-events-auto"
        />
      ) : null}
      <div
        ref={ref}
        className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto ${className}`}
      >
        {children}
      </div>
      {controls && controlPosition === "bottom" ? (
        <Controls
          onPrev={() => scrollBy(-1)}
          onNext={() => scrollBy(1)}
          nextTone={nextTone}
          className="mt-4 hidden items-center justify-between desk:flex"
        />
      ) : null}
    </div>
  );
}
