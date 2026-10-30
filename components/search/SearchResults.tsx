import Link from "next/link";
import type { SearchResult } from "@/lib/search";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";

export function SearchResults({ query, results }: { query: string; results: SearchResult[] }) {
  const counts = {
    All: results.length,
    News: results.filter((r) => r.type === "News").length,
    Insight: results.filter((r) => r.type === "Insight").length,
  };

  return (
    <main>
      <section className="pt-5 desk:pt-6">
        <Container>
          <p className="text-[10px] font-semibold tracking-[1px] text-accent">SEARCH</p>
          <h1 className="mt-2.5 text-[32px] font-bold leading-[38px] text-ink desk:text-[48px] desk:leading-none">
            {query ? `Results for “${query}”` : "Search"}
          </h1>
          <form action="/search" method="get" className="mt-4 flex max-w-[820px] gap-2">
            <label className="sr-only" htmlFor="search-page-input">
              Search news and insights
            </label>
            <input
              id="search-page-input"
              type="search"
              name="q"
              defaultValue={query}
              maxLength={100}
              placeholder="Search news and insights"
              className="min-w-0 flex-1 border border-hairline px-3 py-2 text-sm text-ink outline-none focus:border-navy"
            />
            <button type="submit" className="bg-accent px-5 text-sm font-semibold text-white">
              Search
            </button>
          </form>
          {query ? (
            <p className="mt-3 text-sm text-muted">
              {counts.All} {counts.All === 1 ? "result" : "results"}
              {counts.All ? ` · ${counts.News} news · ${counts.Insight} insights` : ""}
            </p>
          ) : null}
          <div className="mt-2.5 h-px bg-hairline" />
        </Container>
      </section>

      <section className="py-5 desk:py-6">
        <Container>
          {!query ? (
            <p className="text-sm text-muted">Type a word or phrase to search news articles and insights.</p>
          ) : results.length === 0 ? (
            <p className="text-sm text-muted">
              Nothing matched “{query}”. Try a shorter or different word.
            </p>
          ) : (
            <ul className="flex max-w-[820px] flex-col">
              {results.map((result) => (
                <li key={result.id} className="border-b border-hairline last:border-b-0">
                  <Link href={result.href} className="flex gap-4 py-4">
                    <CoverImage
                      src={result.image}
                      alt={result.imageAlt}
                      className="h-[72px] w-[96px] shrink-0 desk:h-[100px] desk:w-[150px]"
                      sizes="150px"
                    />
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-ink px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.72px] text-white uppercase">
                          {result.type}
                        </span>
                        {result.kicker ? <Kicker>{result.kicker}</Kicker> : null}
                      </div>
                      <p className="text-[15px] font-semibold leading-5 text-ink desk:text-lg desk:leading-6">
                        {result.title}
                      </p>
                      {result.summary ? (
                        <p className="hidden text-sm leading-5 text-muted sm:line-clamp-3">{result.summary}</p>
                      ) : null}
                      {result.meta ? <p className="text-[10px] text-muted">{result.meta}</p> : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </main>
  );
}
