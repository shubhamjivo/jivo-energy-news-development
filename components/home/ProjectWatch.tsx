"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PROJECT_FILTERS, PROJECTS } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { HScroll } from "@/components/ui/HScroll";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectWatch() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");
  const items = useMemo(
    () =>
      filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.filter === filter),
    [filter],
  );

  return (
    <section className="pb-2 pt-8 desk:pt-10">
      <Container>
      <SectionHeading
        kicker="THE PROJECT FILE"
        title="Project Watch"
        href="/projects"
        action="Explore all projects →"
        reserveControls
      />
      <div className="mt-3.5 h-px bg-ink" />

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-2">
        {PROJECT_FILTERS.map((chip) => {
          const active = chip === filter;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => setFilter(chip)}
              className={`h-8 shrink-0 rounded-full px-3.5 text-[13px] leading-[19px] ${
                active
                  ? "bg-ink text-white"
                  : "border border-muted text-ink"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      <HScroll className="mt-3.5 gap-5" controls step={300}>
        {items.map((project) => (
          <Link
            key={project.title}
            href="/projects"
            className="w-[260px] shrink-0 snap-start desk:w-[280px]"
          >
            <CoverImage
              src={project.image}
              alt={project.title}
              className="h-[150px] w-full"
              sizes="280px"
            />
            <Kicker className="mt-2">{project.kicker}</Kicker>
            <p className="mt-1 text-base font-semibold text-ink">{project.title}</p>
            <p className="mt-1 text-[11px] whitespace-pre-wrap text-muted">
              {project.meta}
            </p>
          </Link>
        ))}
      </HScroll>
      </Container>
    </section>
  );
}
