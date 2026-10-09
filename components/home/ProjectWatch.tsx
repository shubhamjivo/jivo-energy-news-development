"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProjectEntry } from "@/lib/cms";
import { technologyFilters } from "@/lib/filters";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Carousel } from "@/components/ui/Carousel";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectWatch({
  projects,
  heading,
}: {
  projects: ProjectEntry[];
  heading: Heading;
}) {
  const filters = ["All", ...technologyFilters("home")];
  const [filter, setFilter] = useState("All");
  const items = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.technology === filter),
    [filter, projects],
  );

  if (projects.length === 0) return null;

  return (
    <section id="project-watch" className="scroll-mt-36 py-5 desk:py-6">
      <Container>
      <SectionHeading
        kicker={heading.kicker}
        title={heading.title}
        href={heading.linkUrl}
        action={heading.linkLabel}
        reserveControls
      />
      <div className="mt-3.5 h-px bg-ink" />

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-2">
        {filters.map((chip) => {
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

      <Carousel key={filter} className="mt-3.5" spaceBetween={20} controls>
        {items.map((project) => (
          <Link
            key={project.slug}
            href="/projects"
            className="block w-[260px] desk:w-[280px]"
          >
            {project.image ? (
              <CoverImage
                src={project.image}
                alt={project.name}
                className="h-[150px] w-full"
                sizes="280px"
              />
            ) : null}
            <Kicker className="mt-2">{project.kicker}</Kicker>
            <p className="mt-1 text-base font-semibold text-ink">{project.name}</p>
            <p className="mt-1 text-[11px] whitespace-pre-wrap text-muted">
              {[project.developer, project.updated && `Updated ${project.updated.toLowerCase()}`]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
          </Link>
        ))}
      </Carousel>
      </Container>
    </section>
  );
}
