"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { FilterBar } from "@/components/ui/FilterBar";
import type { CompanyEntry, DealEntry, PageContent } from "@/lib/cms";

const COMPANY_TYPE_NAMES: Record<string, string> = {
  IPP: "Independent power producer",
  DFI: "Development finance institution",
  OEM: "Equipment manufacturer",
};

export function CompaniesIndex({
  intro,
  companies: allCompanies,
  deals,
}: {
  intro: PageContent;
  companies: CompanyEntry[];
  deals: DealEntry[];
}) {
  const filters = useMemo(
    () => ["All", ...new Set(allCompanies.map((company) => company.type))],
    [allCompanies],
  );
  const [filter, setFilter] = useState("All");
  const companies = useMemo(
    () =>
      filter === "All"
        ? allCompanies
        : allCompanies.filter((company) => company.type === filter),
    [allCompanies, filter],
  );
  const spotlight = allCompanies.find((company) => company.spotlight);
  const showSpotlight =
    spotlight && (filter === "All" || filter === spotlight.type);

  return (
    <main>
      <PageIntro kicker={intro.kicker} title={intro.title} dek={intro.intro} />

      <section className="pt-4">
        <Container>
          <FilterBar options={filters} value={filter} onChange={setFilter} />
        </Container>
      </section>

      {showSpotlight ? (
        <section className="py-6">
          <Container>
            <div className="grid items-center gap-6 desk:grid-cols-2 desk:gap-10">
              {spotlight.image ? (
                <CoverImage
                  src={spotlight.image}
                  alt={spotlight.name}
                  className="h-[220px] w-full desk:h-[280px]"
                  sizes="(max-width: 1439px) 100vw, 580px"
                />
              ) : null}
              <div>
                <p className="text-[10px] font-semibold tracking-[1px] text-accent">
                  COMPANY SPOTLIGHT
                </p>
                <h2 className="mt-2 text-[28px] font-bold leading-none text-ink">
                  {spotlight.name}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {[COMPANY_TYPE_NAMES[spotlight.type] ?? spotlight.type, spotlight.headquarters]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {spotlight.description ? (
                  <p className="mt-3 max-w-[520px] text-sm leading-6 text-ink">
                    {spotlight.description}
                  </p>
                ) : null}
                {spotlight.stats.length > 0 ? (
                  <dl className="mt-5 grid grid-cols-3 gap-4">
                    {spotlight.stats.slice(0, 3).map((stat) => (
                      <div key={stat.label}>
                        <dt className="text-xl font-bold text-ink">
                          {stat.value}
                        </dt>
                        <dd className="mt-1 text-[11px] text-muted">
                          {stat.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <a
                  href="#directory"
                  className="mt-4 inline-block text-sm text-muted hover:text-ink"
                >
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
            <p className="text-xs text-muted">
              {allCompanies.length} companies tracked
            </p>
          </div>
          {companies.length === 0 ? (
            <p className="mt-6 text-sm text-muted">
              No companies in this category yet.
            </p>
          ) : (
            <ul className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 desk:grid-cols-4">
              {companies.map((company) => (
                <li key={company.slug}>
                  {company.image ? (
                    <CoverImage
                      src={company.image}
                      alt={company.name}
                      className="h-[140px] w-full"
                      sizes="(max-width: 1439px) 50vw, 280px"
                    />
                  ) : null}
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

      {deals.length > 0 ? (
        <section className="pb-10 pt-4">
          <Container>
            <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
              Recent deals
            </h2>
            <ul className="mt-4">
              {deals.map((deal) => (
                <li
                  key={deal.title}
                  className="grid grid-cols-[72px_1fr_auto] items-start gap-4 border-b border-hairline py-4"
                >
                  <p className="pt-0.5 text-[10px] font-semibold tracking-[0.8px] text-accent">
                    {deal.type}
                  </p>
                  <div>
                    {deal.href ? (
                      <Link
                        href={deal.href}
                        className="text-base font-semibold leading-5 text-ink"
                      >
                        {deal.title}
                      </Link>
                    ) : (
                      <p className="text-base font-semibold leading-5 text-ink">
                        {deal.title}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted">{deal.markets}</p>
                  </div>
                  <p className="text-base font-bold text-ink">{deal.value}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
