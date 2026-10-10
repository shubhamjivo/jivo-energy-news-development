"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { InsightCard, InsightDetail } from "@/lib/cms";
import { InsightView } from "@/components/insights/InsightView";
import { InfiniteScrollSentinel } from "@/components/news/InfiniteScrollSentinel";
import { UpNextDivider } from "@/components/news/UpNextDivider";
import { SITE_NAME } from "@/lib/site";

// The opened insight, then the newest other insights one by one as the
// reader scrolls, like the news feed under an article.
export function ContinuousInsightFeed({
  initialInsight,
  latest,
}: {
  initialInsight: InsightDetail;
  latest: InsightCard[];
}) {
  const [insights, setInsights] = useState<InsightDetail[]>([initialInsight]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insightsRef = useRef(insights);
  const loadedIdsRef = useRef(new Set([initialInsight.id]));
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const activeSlugRef = useRef(initialInsight.slug);
  const abortRef = useRef<AbortController | null>(null);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const params = new URLSearchParams({
      exclude: [...loadedIdsRef.current].join(","),
      limit: "1",
    });

    try {
      const response = await fetch(`/api/insights/next?${params.toString()}`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error("Could not load the next insight.");
      }

      const data = (await response.json()) as {
        insights?: InsightDetail[];
        hasMore?: boolean;
      };
      const next = Array.isArray(data.insights) ? data.insights : [];
      const unique = next.filter((insight) => !loadedIdsRef.current.has(insight.id));

      for (const insight of unique) {
        loadedIdsRef.current.add(insight.id);
      }

      if (unique.length === 0) {
        hasMoreRef.current = false;
        setHasMore(false);
      } else {
        const merged = [...insightsRef.current, ...unique];
        insightsRef.current = merged;
        setInsights(merged);
        const more = Boolean(data.hasMore);
        hasMoreRef.current = more;
        setHasMore(more);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Could not load the next insight.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("article[data-article-slug]");
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const active = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top
            ? entry
            : closest,
        );
        const slug = active.target.getAttribute("data-article-slug");
        const title = active.target.getAttribute("data-article-title");
        if (!slug || slug === activeSlugRef.current) return;
        activeSlugRef.current = slug;
        window.history.replaceState(window.history.state, "", `/insights/${slug}`);
        if (title) document.title = `${title} | ${SITE_NAME}`;
      },
      {
        // Long insights never reach 50% visibility in the viewport; a reading
        // band near the top of the screen tracks the insight currently in view.
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0,
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [insights]);

  return (
    <div>
      {insights.map((insight, index) => (
        <div key={insight.id}>
          {index === 0 ? null : <UpNextDivider />}
          <InsightView insight={insight} latest={latest} priorityImage={index === 0} />
        </div>
      ))}

      {loading ? (
        <p className="py-8 text-center text-sm text-muted" aria-live="polite">
          Loading next insight…
        </p>
      ) : null}

      {error ? (
        <div className="py-8 text-center">
          <p className="text-sm text-muted">{error}</p>
          <button
            type="button"
            onClick={loadMore}
            className="mt-2 text-sm font-semibold text-accent"
          >
            Retry
          </button>
        </div>
      ) : null}

      {!error && hasMore ? (
        <InfiniteScrollSentinel onVisible={loadMore} disabled={loading} />
      ) : null}

      {!hasMore && !loading ? (
        <p className="py-10 text-center text-sm text-muted">
          You&apos;ve reached the end of the insights.
        </p>
      ) : null}
    </div>
  );
}
