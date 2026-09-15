"use client";

import { useEffect, useRef } from "react";

export function InfiniteScrollSentinel({
  onVisible,
  disabled,
}: {
  onVisible: () => void;
  disabled: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible();
      },
      { rootMargin: "480px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [disabled, onVisible]);

  return <div ref={ref} aria-hidden className="h-px w-full" />;
}
