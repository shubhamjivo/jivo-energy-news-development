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

const LABEL_PLACE = {
  morocco: "top-full left-1/2 mt-1 -translate-x-1/2",
  egypt: "top-1/2 right-full mr-1.5 -translate-y-1/2",
  ghana: "top-1/2 right-full mr-1.5 -translate-y-1/2",
  nigeria: "top-1/2 left-full ml-1.5 -translate-y-1/2",
  ethiopia: "top-1/2 left-full ml-1.5 -translate-y-1/2",
  kenya: "top-full left-1/2 mt-1 -translate-x-1/2",
  namibia: "top-1/2 right-full mr-1.5 -translate-y-1/2",
  "south-africa": "top-full left-1/2 mt-1 -translate-x-1/2",
} as const;

const MARKETS = [
  {
    id: "south-africa",
    name: "South Africa",
    region: "SOUTHERN AFRICA",
    summary: "6,240 MW operating · 118 projects",
    image: "/images/project-1.png",
    label: "Renewable Energy Market",
    capacity: "6,240 MW",
    projects: "118",
    companies: "210",
    pipeline: "115",
    mix: [
      { name: "Solar", count: 58 },
      { name: "Wind", count: 34 },
      { name: "Storage", count: 21 },
      { name: "Hydrogen", count: 2 },
    ],
    news: "Battery Energy Storage bid window 3 results announced, adding 615 MW.",
    investment: "REIPPPP round attracts record independent power producer bids.",
    policy: "Grid code amendment accelerates private wheeling approvals.",
  },
  {
    id: "kenya",
    name: "Kenya",
    region: "EAST AFRICA",
    summary: "3,120 MW operating · 64 projects",
    image: "/images/latest-grid.png",
    label: "Geothermal and wind market",
    capacity: "3,120 MW",
    projects: "64",
    companies: "86",
    pipeline: "41",
    mix: [
      { name: "Geothermal", count: 22 },
      { name: "Wind", count: 18 },
      { name: "Solar", count: 16 },
      { name: "Hydro", count: 8 },
    ],
    news: "New transmission capacity is unlocking a backlog of shovel-ready wind and solar.",
    investment: "KenGen lines up the next Rift Valley geothermal increment.",
    policy: "Grid-code changes are pulling hybrid projects into the evening peak.",
  },
  {
    id: "nigeria",
    name: "Nigeria",
    region: "WEST AFRICA",
    summary: "2,410 MW operating · 51 projects",
    image: "/images/latest-solar.png",
    label: "Solar and storage market",
    capacity: "2,410 MW",
    projects: "51",
    companies: "74",
    pipeline: "63",
    mix: [
      { name: "Solar", count: 29 },
      { name: "Gas", count: 11 },
      { name: "Storage", count: 8 },
      { name: "Hydro", count: 3 },
    ],
    news: "Industrial offtakers are clustering projects around new substations.",
    investment: "A regional solar vehicle closed with storage written into the PPA.",
    policy: "Corporate PPAs are filling the gap where sovereign offtake is slow.",
  },
  {
    id: "egypt",
    name: "Egypt",
    region: "NORTH AFRICA",
    summary: "8,900 MW operating · 72 projects",
    image: "/images/project-7.png",
    label: "Wind, solar and hydrogen market",
    capacity: "8,900 MW",
    projects: "72",
    companies: "64",
    pipeline: "48",
    mix: [
      { name: "Solar", count: 24 },
      { name: "Wind", count: 27 },
      { name: "Hydrogen", count: 14 },
      { name: "Storage", count: 7 },
    ],
    news: "A sovereign-backed vehicle is targeting hybrid solar and storage on the Red Sea coast.",
    investment: "Hydrogen offtake talks are moving hubs toward front-end engineering.",
    policy: "Land and grid allocation is the constraint, not the auction price.",
  },
  {
    id: "namibia",
    name: "Namibia",
    region: "SOUTHERN AFRICA",
    summary: "Hydrogen hub · 11 projects",
    image: "/images/project-6.png",
    label: "Green hydrogen market",
    capacity: "880 MW",
    projects: "11",
    companies: "19",
    pipeline: "9",
    mix: [
      { name: "Hydrogen", count: 6 },
      { name: "Solar", count: 3 },
      { name: "Wind", count: 2 },
    ],
    news: "Tsau Khaeb offtake negotiations are the test of whether the hub can reach FID.",
    investment: "Export-linked hydrogen is being paired with dedicated renewables.",
    policy: "Port and water rights now sit on the same timetable as generation.",
  },
  {
    id: "ethiopia",
    name: "Ethiopia",
    region: "EAST AFRICA",
    summary: "Hydro + wind · 29 projects",
    image: "/images/video-3.png",
    label: "Hydro and wind market",
    capacity: "5,450 MW",
    projects: "29",
    companies: "22",
    pipeline: "17",
    mix: [
      { name: "Hydro", count: 12 },
      { name: "Wind", count: 11 },
      { name: "Solar", count: 6 },
    ],
    news: "The Aysha wind corridor is in permitting as new lines are sequenced.",
    investment: "A concessional facility is aimed at transmission, not another plant.",
    policy: "Currency convertibility remains the open question for private sponsors.",
  },
  {
    id: "morocco",
    name: "Morocco",
    region: "NORTH AFRICA",
    summary: "4,180 MW operating · 38 projects",
    image: "/images/project-2.png",
    label: "Solar and wind market",
    capacity: "4,180 MW",
    projects: "38",
    companies: "41",
    pipeline: "22",
    mix: [
      { name: "Solar", count: 16 },
      { name: "Wind", count: 15 },
      { name: "Storage", count: 7 },
    ],
    news: "Hybrid solar-wind sites are being sized for evening export windows.",
    investment: "European offtake is back in term sheets for the next bid round.",
    policy: "Interconnector timing is now written into project schedules.",
  },
  {
    id: "ghana",
    name: "Ghana",
    region: "WEST AFRICA",
    summary: "Solar + storage · 22 projects",
    image: "/images/project-3.png",
    label: "Solar and storage market",
    capacity: "1,160 MW",
    projects: "22",
    companies: "28",
    pipeline: "19",
    mix: [
      { name: "Solar", count: 12 },
      { name: "Storage", count: 7 },
      { name: "Gas", count: 3 },
    ],
    news: "A first bid window requires storage as a condition of dispatch.",
    investment: "Sovereign-backed co-investment is pairing coastal PV with four-hour batteries.",
    policy: "Evening-peak offtake is what unlocked lender appetite.",
  },
] as const;

export function CountriesIndex() {
  const [selectedId, setSelectedId] = useState<(typeof MARKETS)[number]["id"]>(
    "south-africa",
  );
  const selected = MARKETS.find((market) => market.id === selectedId) ?? MARKETS[0];

  return (
    <main>
      <PageIntro
        kicker="THE MAP"
        title="Countries"
        dek="Market-by-market intelligence across the continent’s energy transition."
      />

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
                        id === selected.id
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
                {MARKETS.map((market) => {
                  const point = AFRICA_MARKETS[market.id];
                  const active = market.id === selected.id;
                  return (
                    <button
                      key={market.id}
                      type="button"
                      onClick={() => setSelectedId(market.id)}
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
                        className={`absolute text-[11px] whitespace-nowrap text-ink ${LABEL_PLACE[market.id]}`}
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
                <li>
                  <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                    LATEST NEWS
                  </p>
                  <p className="mt-1 text-sm leading-5 text-ink">{selected.news}</p>
                </li>
                <li>
                  <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                    LATEST INVESTMENT
                  </p>
                  <p className="mt-1 text-sm leading-5 text-ink">{selected.investment}</p>
                </li>
                <li>
                  <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                    LATEST POLICY
                  </p>
                  <p className="mt-1 text-sm leading-5 text-ink">{selected.policy}</p>
                </li>
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
            {MARKETS.map((market) => {
              const active = market.id === selected.id;
              return (
                <li key={market.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(market.id)}
                    className={`block w-full text-left ${active ? "outline outline-2 outline-offset-4 outline-navy" : ""}`}
                  >
                    <CoverImage
                      src={market.image}
                      alt={market.name}
                      className="h-[140px] w-full"
                      sizes="(max-width: 1439px) 50vw, 280px"
                    />
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
