"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CmsArticle } from "@/lib/article-types";
import { InfiniteScrollSentinel } from "@/components/news/InfiniteScrollSentinel";
import { NewsArticle } from "@/components/news/NewsArticle";
import { SITE_NAME } from "@/lib/site";

function articleHref(slug: string) {
  return `/news/${slug}`;
}

export function ContinuousNewsFeed({
  initialArticle,
}: {
  initialArticle: CmsArticle;
}) {
  const [articles, setArticles] = useState<CmsArticle[]>([initialArticle]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const articlesRef = useRef(articles);
  const loadedIdsRef = useRef(new Set([initialArticle.id]));
  const relatedQueueRef = useRef([...initialArticle.relatedNewsIds]);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const activeSlugRef = useRef(initialArticle.slug);
  const abortRef = useRef<AbortController | null>(null);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const exclude = [...loadedIdsRef.current].join(",");
    const related = relatedQueueRef.current.join(",");
    const params = new URLSearchParams({
      exclude,
      related,
      limit: "1",
    });

    try {
      const response = await fetch(`/api/news/next?${params.toString()}`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error("Could not load the next article.");
      }

      const data = (await response.json()) as {
        articles?: CmsArticle[];
        hasMore?: boolean;
      };
      const next = Array.isArray(data.articles) ? data.articles : [];
      const unique = next.filter((article) => !loadedIdsRef.current.has(article.id));

      for (const article of unique) {
        loadedIdsRef.current.add(article.id);
      }
      relatedQueueRef.current = relatedQueueRef.current.filter(
        (id) => !loadedIdsRef.current.has(id),
      );

      if (unique.length === 0) {
        hasMoreRef.current = false;
        setHasMore(false);
      } else {
        const merged = [...articlesRef.current, ...unique];
        articlesRef.current = merged;
        setArticles(merged);
        const more = Boolean(data.hasMore);
        hasMoreRef.current = more;
        setHasMore(more);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Could not load the next article.");
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
        window.history.replaceState(window.history.state, "", articleHref(slug));
        if (title) document.title = `${title} | ${SITE_NAME}`;
      },
      {
        // Long articles never reach 50% visibility in the viewport; a reading
        // band near the top of the screen tracks the article currently in view.
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0,
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [articles]);

  return (
    <div>
      {articles.map((article, index) => (
        <NewsArticle
          key={article.id}
          article={article}
          isFirst={index === 0}
        />
      ))}

      {loading ? (
        <p className="py-8 text-center text-sm text-muted" aria-live="polite">
          Loading next article…
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
          You&apos;ve reached the end of the news.
        </p>
      ) : null}
    </div>
  );
}
