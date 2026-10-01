"use client";

import { useState } from "react";
import {
  AFRICA_HEIGHT,
  AFRICA_LAND,
  AFRICA_MARKETS,
  AFRICA_WIDTH,
} from "@/components/countries/africa-map";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import type { CountryEntry, PageContent } from "@/lib/cms";

const LABEL_PLACE: Record<string, string> = {
  morocco: "top-full left-1/2 mt-1 -translate-x-1/2",
  egypt: "top-1/2 right-full mr-1.5 -translate-y-1/2",
  ghana: "top-1/2 right-full mr-1.5 -translate-y-1/2",
  nigeria: "top-1/2 left-full ml-1.5 -translate-y-1/2",
  ethiopia: "top-1/2 left-full ml-1.5 -translate-y-1/2",
  kenya: "top-full left-1/2 mt-1 -translate-x-1/2",
  namibia: "top-1/2 right-full mr-1.5 -translate-y-1/2",
  "south-africa": "top-full left-1/2 mt-1 -translate-x-1/2",
};

const DEFAULT_LABEL_PLACE = "top-full left-1/2 mt-1 -translate-x-1/2";

export function CountriesIndex({
  intro,
  countries,
}: {
  intro: PageContent;
  countries: CountryEntry[];
}) {
  const onMap = countries.filter((country) => AFRICA_MARKETS[country.slug]);
  const [selectedId, setSelectedId] = useState(
    (onMap[0] ?? countries[0])?.slug ?? "",
  );
  const selected =
    countries.find((country) => country.slug === selectedId) ?? countries[0];

  if (!selected) {
    return (
      <main>
        <PageIntro kicker={intro.kicker} title={intro.title} dek={intro.intro} />
      </main>
    );
  }

  return (
    <main>
      <PageIntro kicker={intro.kicker} title={intro.title} dek={intro.intro} />

      <section className="py-8">
        <Container>
          <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
            Africa&apos;s Energy Landscape
          </h2>
          <p className="mt-2 max-w-[640px] text-sm text-muted">
            Select a market to view renewable capacity, project pipeline and the latest signals.
          </p>
          <a href="#markets" className="mt-3 inline-block text-sm text-muted hover:text-ink">
            Full brief →
          </a>

          <div className="mt-6 grid items-start gap-8 desk:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] desk:gap-12">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.8px] text-muted">
                REGIONAL OVERVIEW
              </p>
              <div
                className="relative mt-3 w-full bg-[color-mix(in_srgb,var(--clr-neutral-200)_35%,white)]"
                style={{ aspectRatio: `${AFRICA_WIDTH} / ${AFRICA_HEIGHT}` }}
              >
                <svg
                  viewBox={`0 0 ${AFRICA_WIDTH} ${AFRICA_HEIGHT}`}
                  className="absolute inset-0 h-full w-full"
                  role="img"
                  aria-label="Map of Africa"
                >
                  <path
                    d={AFRICA_LAND}
                    fill="color-mix(in srgb, var(--clr-primary-900) 10%, white)"
                  />
                  {Object.entries(AFRICA_MARKETS).map(([id, market]) => (
                    <path
                      key={id}
                      d={market.d}
                      fill={
                        id === selected.slug
                          ? "color-mix(in srgb, var(--clr-primary-200) 55%, white)"
                          : "color-mix(in srgb, var(--clr-primary-900) 10%, white)"
                      }
                      fillRule="evenodd"
                    />
                  ))}
                  <path
                    d={AFRICA_LAND}
                    fill="none"
                    stroke="var(--clr-primary-900)"
                    strokeWidth="0.8"
                    fillRule="evenodd"
                  />
                  {Object.entries(AFRICA_MARKETS).map(([id, market]) => (
                    <path
                      key={`${id}-border`}
                      d={market.d}
                      fill="none"
                      stroke="var(--clr-primary-900)"
                      strokeWidth="0.8"
                      fillRule="evenodd"
                    />
                  ))}
                </svg>
                {onMap.map((market) => {
                  const point = AFRICA_MARKETS[market.slug];
                  const active = market.slug === selected.slug;
                  return (
                    <button
                      key={market.slug}
                      type="button"
                      onClick={() => setSelectedId(market.slug)}
                      aria-pressed={active}
                      aria-label={market.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ top: `${point.top}%`, left: `${point.left}%` }}
                    >
                      <span
                        className={`block size-2.5 rounded-full ${
                          active ? "bg-navy ring-4 ring-accent" : "bg-navy"
                        }`}
                      />
                      <span
                        className={`absolute text-[11px] whitespace-nowrap text-ink ${LABEL_PLACE[market.slug] ?? DEFAULT_LABEL_PLACE}`}
                      >
                        {market.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] text-muted">
                Select a country. Figures are representative.
              </p>
            </div>

            <div>
              <p className="text-[11px] text-muted">54 countries</p>
              <h3 className="mt-1 text-[32px] font-bold leading-none text-ink">
                {selected.name}
              </h3>
              <p className="mt-2 text-sm text-accent">{selected.label}</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <dt className="text-[28px] font-bold leading-none text-ink">
                    {selected.capacity}
                  </dt>
                  <dd className="mt-1 text-[11px] text-muted">Installed capacity</dd>
                </div>
                <div>
                  <dt className="text-[28px] font-bold leading-none text-ink">
                    {selected.projects}
                  </dt>
                  <dd className="mt-1 text-[11px] text-muted">Tracked projects</dd>
                </div>
                <div>
                  <dt className="text-[28px] font-bold leading-none text-ink">
                    {selected.companies}
                  </dt>
                  <dd className="mt-1 text-[11px] text-muted">Active companies</dd>
                </div>
                <div>
                  <dt className="text-[28px] font-bold leading-none text-ink">
                    {selected.pipeline}
                  </dt>
                  <dd className="mt-1 text-[11px] text-muted">In the pipeline</dd>
                </div>
              </dl>
              <ul className="mt-5 flex flex-wrap gap-2">
                {selected.mix.map((item, index) => (
                  <li
                    key={item.name}
                    className={`px-3 py-1 text-xs ${
                      index === 0
                        ? "rounded-full bg-navy text-white"
                        : "text-muted"
                    }`}
                  >
                    {item.name} · {item.count}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-col gap-4">
                {selected.news ? (
                <li>
                  <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                    LATEST NEWS
                  </p>
                  <p className="mt-1 text-sm leading-5 text-ink">{selected.news}</p>
                </li>
                ) : null}
                {selected.investment ? (
                <li>
                  <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                    LATEST INVESTMENT
                  </p>
                  <p className="mt-1 text-sm leading-5 text-ink">{selected.investment}</p>
                </li>
                ) : null}
                {selected.policy ? (
                <li>
                  <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                    LATEST POLICY
                  </p>
                  <p className="mt-1 text-sm leading-5 text-ink">{selected.policy}</p>
                </li>
                ) : null}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="markets" className="pb-12">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
              Priority markets
            </h2>
            <p className="text-xs text-muted">Select a country →</p>
          </div>
          <ul className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 desk:grid-cols-4">
            {countries.map((market) => {
              const active = market.slug === selected.slug;
              return (
                <li key={market.slug}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(market.slug)}
                    className={`block w-full text-left ${active ? "outline outline-2 outline-offset-4 outline-navy" : ""}`}
                  >
                    {market.image ? (
                      <CoverImage
                        src={market.image}
                        alt={market.name}
                        className="h-[140px] w-full"
                        sizes="(max-width: 1439px) 50vw, 280px"
                      />
                    ) : null}
                    <p className="mt-2.5 text-[10px] font-semibold tracking-[0.8px] text-accent">
                      {market.region}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold leading-6 text-ink">
                      {market.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted">{market.summary}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </main>
  );
}
