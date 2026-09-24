"use client";

import { useMemo, useState } from "react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { FilterBar } from "@/components/ui/FilterBar";

const FILTERS = [
  "All",
  "Solar",
  "Wind",
  "Battery",
  "Hydrogen",
  "Geothermal",
  "Hydro",
] as const;

const STATS = [
  { value: "186 GW", label: "Tracked pipeline" },
  { value: "42", label: "FIDs year to date" },
  { value: "14", label: "Priority markets" },
  { value: "$12.4bn", label: "Capital closed YTD" },
] as const;

const PROJECTS = [
  {
    kicker: "TANZANIA · SOLAR",
    title: "Dodoma Solar PV",
    meta: "150 MW · Construction · Scatec",
    image: "/images/project-1.png",
    filter: "Solar",
    market: "Tanzania",
    tech: "Solar",
    capacity: "150 MW",
    status: "Construction",
    updated: "2 days ago",
  },
  {
    kicker: "SOUTH AFRICA · WIND",
    title: "Karoo Wind Extension",
    meta: "240 MW · Operational · Enel Green Power",
    image: "/images/project-2.png",
    filter: "Wind",
    market: "South Africa",
    tech: "Wind",
    capacity: "240 MW",
    status: "Operational",
    updated: "1 day ago",
  },
  {
    kicker: "NIGERIA · BATTERY",
    title: "Lagos Grid Storage I",
    meta: "80 MW / 320 MWh · Financial close · AMEA Power",
    image: "/images/project-3.png",
    filter: "Battery",
    market: "Nigeria",
    tech: "Battery",
    capacity: "80 MW",
    status: "Financial close",
    updated: "1 day ago",
  },
  {
    kicker: "EGYPT · HYDROGEN",
    title: "Suez Hydrogen Hub",
    meta: "1.5 GW · Development · Fertiglobe consortium",
    image: "/images/project-4.png",
    filter: "Hydrogen",
    market: "Egypt",
    tech: "Hydrogen",
    capacity: "1.5 GW",
    status: "Development",
    updated: "3 days ago",
  },
  {
    kicker: "KENYA · GEOTHERMAL",
    title: "Rift Valley Expansion",
    meta: "70 MW · Construction · KenGen",
    image: "/images/project-5.png",
    filter: "Geothermal",
    market: "Kenya",
    tech: "Geothermal",
    capacity: "70 MW",
    status: "Construction",
    updated: "4 days ago",
  },
  {
    kicker: "ZAMBIA · SOLAR",
    title: "Copperbelt Solar Park",
    meta: "200 MW · Tender · Globeleq",
    image: "/images/latest-solar.png",
    filter: "Solar",
    market: "Zambia",
    tech: "Solar",
    capacity: "200 MW",
    status: "Tender",
    updated: "5 days ago",
  },
  {
    kicker: "NAMIBIA · HYDROGEN",
    title: "Tsau Khaeb Green H2",
    meta: "3 GW · Pre-FID · Hyphen Hydrogen",
    image: "/images/project-6.png",
    filter: "Hydrogen",
    market: "Namibia",
    tech: "Hydrogen",
    capacity: "3 GW",
    status: "Pre-FID",
    updated: "1 week ago",
  },
  {
    kicker: "ETHIOPIA · WIND",
    title: "Aysha Wind Corridor",
    meta: "120 MW · Permitting · Ethiopian Electric Power",
    image: "/images/project-7.png",
    filter: "Wind",
    market: "Ethiopia",
    tech: "Wind",
    capacity: "120 MW",
    status: "Permitting",
    updated: "1 week ago",
  },
] as const;

export function ProjectsIndex() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const projects = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((project) => project.filter === filter),
    [filter],
  );

  return (
    <main>
      <PageIntro
        kicker="THE PROJECT FILE"
        title="Projects"
        dek="Utility-scale assets moving from announcement to financial close and execution."
      />

      <section className="pt-4">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 desk:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[32px] font-bold leading-none text-ink">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-[11px] tracking-[0.44px] text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-5">
            <FilterBar options={FILTERS} value={filter} onChange={setFilter} />
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
              Tracked assets
            </h2>
            <p className="text-xs text-muted">Updated daily</p>
          </div>
          {projects.length === 0 ? (
            <p className="mt-6 text-sm text-muted">
              No tracked assets in this technology yet.
            </p>
          ) : (
            <ul className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 desk:grid-cols-4">
              {projects.map((project) => (
                <li key={project.title}>
                  <CoverImage
                    src={project.image}
                    alt={project.title}
                    className="h-[168px] w-full"
                    sizes="(max-width: 1439px) 50vw, 280px"
                  />
                  <p className="mt-2.5 text-[10px] font-semibold tracking-[0.8px] text-accent">
                    {project.kicker}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-6 text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs leading-4 text-muted">{project.meta}</p>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline text-[11px] tracking-[0.6px] text-muted uppercase">
                  <th className="py-3 pr-4 font-semibold">Project</th>
                  <th className="py-3 pr-4 font-semibold">Market</th>
                  <th className="py-3 pr-4 font-semibold">Tech</th>
                  <th className="py-3 pr-4 font-semibold">Capacity</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                  <th className="py-3 font-semibold">Updated</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.title} className="border-b border-hairline">
                    <th className="py-3.5 pr-4 text-sm font-semibold text-ink">
                      {project.title}
                    </th>
                    <td className="py-3.5 pr-4 text-sm text-muted">{project.market}</td>
                    <td className="py-3.5 pr-4 text-sm text-muted">{project.tech}</td>
                    <td className="py-3.5 pr-4 text-sm text-muted">{project.capacity}</td>
                    <td className="py-3.5 pr-4 text-sm text-muted">{project.status}</td>
                    <td className="py-3.5 text-sm text-muted">{project.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </main>
  );
}
