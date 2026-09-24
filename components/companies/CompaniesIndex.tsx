"use client";

import { useMemo, useState } from "react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { FilterBar } from "@/components/ui/FilterBar";

const FILTERS = [
  "All",
  "IPP",
  "DFI",
  "Utility",
  "OEM",
  "Offtaker",
  "Developer",
] as const;

const COMPANIES = [
  {
    type: "IPP",
    name: "Scatec",
    meta: "Oslo / Cape Town · 2.4 GW Africa",
    image: "/images/latest-wind.png",
  },
  {
    type: "IPP",
    name: "Globeleq",
    meta: "London / Johannesburg · 1.8 GW",
    image: "/images/project-1.png",
  },
  {
    type: "Utility",
    name: "KenGen",
    meta: "Nairobi · 1.8 GW geothermal led",
    image: "/images/latest-grid.png",
  },
  {
    type: "Utility",
    name: "Eskom",
    meta: "Johannesburg · Grid & generation",
    image: "/images/video-3.png",
  },
  {
    type: "DFI",
    name: "African Development Bank",
    meta: "Abidjan · Mission 300 partner",
    image: "/images/project-3.png",
  },
  {
    type: "DFI",
    name: "World Bank / IFC",
    meta: "Washington / Nairobi · Concessional",
    image: "/images/project-7.png",
  },
  {
    type: "Major",
    name: "TotalEnergies",
    meta: "Paris / Luanda · Oil-to-electrons",
    image: "/images/project-6.png",
  },
  {
    type: "Offtaker",
    name: "CrossBoundary Energy",
    meta: "Nairobi · Corporate offtake",
    image: "/images/latest-solar.png",
  },
] as const;

const DEALS = [
  {
    kicker: "M&A",
    title: "Pan-African IPP acquires majority stake in Southern African storage developer",
    meta: "South Africa · Zambia",
    value: "$95M",
  },
  {
    kicker: "PPA",
    title: "Corporate offtaker signs 15-year solar PPA for East African manufacturing hub",
    meta: "Kenya",
    value: "120 MW",
  },
  {
    kicker: "FINANCE",
    title: "West African solar consortium reaches $340M financial close",
    meta: "Nigeria · Ghana · Senegal",
    value: "$340M",
  },
  {
    kicker: "DFI",
    title: "Climate fund approves concessional facility for Ethiopian transmission",
    meta: "Ethiopia",
    value: "$210M",
  },
] as const;

export function CompaniesIndex() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const companies = useMemo(
    () =>
      filter === "All"
        ? COMPANIES
        : COMPANIES.filter((company) => company.type === filter),
    [filter],
  );
  const showSpotlight = filter === "All" || filter === "IPP";

  return (
    <main>
      <PageIntro
        kicker="THE DIRECTORY"
        title="Companies"
        dek="IPPs, DFIs, utilities and offtakers shaping Africa’s energy markets."
      />

      <section className="pt-4">
        <Container>
          <FilterBar options={FILTERS} value={filter} onChange={setFilter} />
        </Container>
      </section>

      {showSpotlight ? (
        <section className="py-6">
          <Container>
            <div className="grid items-center gap-6 desk:grid-cols-2 desk:gap-10">
              <CoverImage
                src="/images/project-2.png"
                alt="Utility-scale solar array"
                className="h-[220px] w-full desk:h-[280px]"
                sizes="(max-width: 1439px) 100vw, 580px"
              />
              <div>
                <p className="text-[10px] font-semibold tracking-[1px] text-accent">
                  COMPANY SPOTLIGHT
                </p>
                <h2 className="mt-2 text-[28px] font-bold leading-none text-ink">
                  AMEA Power
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Independent power producer · Dubai / Cairo / Johannesburg
                </p>
                <p className="mt-3 max-w-[520px] text-sm leading-6 text-ink">
                  The pan-African IPP is stacking solar, storage and
                  green-hydrogen offtake across Egypt, Morocco and West Africa,
                  with more than 6 GW in operation or under construction.
                </p>
                <dl className="mt-5 grid grid-cols-3 gap-4">
                  <div>
                    <dt className="text-xl font-bold text-ink">6.2 GW</dt>
                    <dd className="mt-1 text-[11px] text-muted">Operating / UC</dd>
                  </div>
                  <div>
                    <dt className="text-xl font-bold text-ink">14</dt>
                    <dd className="mt-1 text-[11px] text-muted">African markets</dd>
                  </div>
                  <div>
                    <dt className="text-xl font-bold text-ink">$4.1bn</dt>
                    <dd className="mt-1 text-[11px] text-muted">Capital deployed</dd>
                  </div>
                </dl>
                <a href="#directory" className="mt-4 inline-block text-sm text-muted hover:text-ink">
                  Read the full profile →
                </a>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section id="directory" className="py-4">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
              The Directory
            </h2>
            <p className="text-xs text-muted">48 companies tracked</p>
          </div>
          {companies.length === 0 ? (
            <p className="mt-6 text-sm text-muted">
              No companies in this category yet.
            </p>
          ) : (
            <ul className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 desk:grid-cols-4">
              {companies.map((company) => (
                <li key={company.name}>
                  <CoverImage
                    src={company.image}
                    alt={company.name}
                    className="h-[140px] w-full"
                    sizes="(max-width: 1439px) 50vw, 280px"
                  />
                  <p className="mt-2.5 text-[10px] font-semibold tracking-[0.8px] text-accent">
                    {company.type}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-6 text-ink">
                    {company.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{company.meta}</p>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section className="pb-10 pt-4">
        <Container>
          <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
            Recent deals
          </h2>
          <ul className="mt-4">
            {DEALS.map((deal) => (
              <li
                key={deal.title}
                className="grid grid-cols-[72px_1fr_auto] items-start gap-4 border-b border-hairline py-4"
              >
                <p className="pt-0.5 text-[10px] font-semibold tracking-[0.8px] text-accent">
                  {deal.kicker}
                </p>
                <div>
                  <p className="text-base font-semibold leading-5 text-ink">
                    {deal.title}
                  </p>
                  <p className="mt-1 text-xs text-muted">{deal.meta}</p>
                </div>
                <p className="text-base font-bold text-ink">{deal.value}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
