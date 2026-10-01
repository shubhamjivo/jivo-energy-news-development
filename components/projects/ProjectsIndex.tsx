"use client";

import { useMemo, useState } from "react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { FilterBar } from "@/components/ui/FilterBar";
import type { PageContent, ProjectEntry } from "@/lib/cms";

export function ProjectsIndex({
  intro,
  projects: allProjects,
}: {
  intro: PageContent;
  projects: ProjectEntry[];
}) {
  const filters = useMemo(
    () => ["All", ...new Set(allProjects.map((project) => project.technology))],
    [allProjects],
  );
  const [filter, setFilter] = useState("All");
  const projects = useMemo(
    () =>
      filter === "All"
        ? allProjects
        : allProjects.filter((project) => project.technology === filter),
    [allProjects, filter],
  );

  return (
    <main>
      <PageIntro kicker={intro.kicker} title={intro.title} dek={intro.intro} />

      <section className="pt-4">
        <Container>
          {intro.stats.length > 0 ? (
            <dl className="mb-5 grid grid-cols-2 gap-x-6 gap-y-5 desk:grid-cols-4">
              {intro.stats.map((stat) => (
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
          ) : null}
          <div>
            <FilterBar options={filters} value={filter} onChange={setFilter} />
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
                <li key={project.slug}>
                  {project.image ? (
                    <CoverImage
                      src={project.image}
                      alt={project.name}
                      className="h-[168px] w-full"
                      sizes="(max-width: 1439px) 50vw, 280px"
                    />
                  ) : null}
                  <p className="mt-2.5 text-[10px] font-semibold tracking-[0.8px] text-accent">
                    {project.kicker}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-6 text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-xs leading-4 text-muted">
                    {project.meta}
                  </p>
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
                  <tr key={project.slug} className="border-b border-hairline">
                    <th className="py-3.5 pr-4 text-sm font-semibold text-ink">
                      {project.name}
                    </th>
                    <td className="py-3.5 pr-4 text-sm text-muted">
                      {project.country}
                    </td>
                    <td className="py-3.5 pr-4 text-sm text-muted">
                      {project.technology}
                    </td>
                    <td className="py-3.5 pr-4 text-sm text-muted">
                      {project.capacity}
                    </td>
                    <td className="py-3.5 pr-4 text-sm text-muted">
                      {project.status}
                    </td>
                    <td className="py-3.5 text-sm text-muted">
                      {project.updated}
                    </td>
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
