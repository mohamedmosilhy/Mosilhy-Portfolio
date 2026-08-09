"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { BentoGrid } from "@/components/ui/bento-grid";
import { ProjectCard } from "@/features/projects/components/project-card";
import {
  projectCategoryLabels,
  projectCategoryOrder,
} from "@/features/projects/project-categories";
import { cn } from "@/lib/utils/cn";
import type { ProjectCategory, ProjectSummary } from "@/types/content";

export interface FilterableProjectGalleryProps {
  readonly projects: readonly ProjectSummary[];
}

export function FilterableProjectGallery({
  projects,
}: FilterableProjectGalleryProps) {
  const availableCategories = projectCategoryOrder.filter((candidate) =>
    projects.some((project) => project.category === candidate),
  );
  const [category, setCategory] = useState<ProjectCategory>(
    availableCategories[0] ?? projectCategoryOrder[0],
  );
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesCategory = project.category === category;
        const searchableText = [
          project.title,
          project.role,
          projectCategoryLabels[project.category],
          ...project.technologies.map((technology) => technology.name),
        ]
          .join(" ")
          .toLocaleLowerCase();

        return matchesCategory && searchableText.includes(normalizedQuery);
      }),
    [category, normalizedQuery, projects],
  );
  const hasActiveSearch = normalizedQuery.length > 0;

  function clearSearch() {
    setQuery("");
  }

  return (
    <div className="mt-space-10 lg:mt-space-12">
      <div className="flex flex-col gap-space-4 border-y border-border py-space-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex gap-space-2 overflow-x-auto pb-space-1 lg:flex-wrap lg:overflow-visible lg:pb-0"
        >
          {availableCategories.map((candidate) => (
            <FilterButton
              key={candidate}
              active={category === candidate}
              onClick={() => setCategory(candidate)}
            >
              {projectCategoryLabels[candidate]}
            </FilterButton>
          ))}
        </div>

        <label className="group/search relative block w-full lg:w-72">
          <span className="sr-only">Search projects</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-space-4 size-4 -translate-y-1/2 text-text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects or tools"
            className="min-h-11 w-full rounded-full border border-border bg-surface px-space-10 font-sans text-body-sm text-text outline-none placeholder:text-text-muted hover:border-border-strong focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear project search"
              className="absolute top-1/2 right-space-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-text-muted outline-none hover:bg-surface-raised hover:text-text focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </label>
      </div>

      <div className="mt-space-5 flex items-center justify-between gap-space-4">
        <p aria-live="polite" className="text-body-sm text-text-muted">
          Showing {visibleProjects.length} {projectCategoryLabels[category]}{" "}
          {visibleProjects.length === 1 ? "project" : "projects"}
        </p>
        {hasActiveSearch ? (
          <button
            type="button"
            onClick={clearSearch}
            className="rounded-sm text-body-sm font-medium text-accent underline-offset-4 outline-none hover:text-accent-hover hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Clear search
          </button>
        ) : null}
      </div>

      {visibleProjects.length > 0 ? (
        <BentoGrid
          as="ul"
          className="mt-space-6 sm:grid-cols-2 lg:auto-rows-[22rem] lg:grid-cols-3"
        >
          {visibleProjects.map((project, index) => (
            <li key={project.slug} className="min-h-80 lg:min-h-0">
              <ProjectCard project={project} ordinal={index + 1} />
            </li>
          ))}
        </BentoGrid>
      ) : (
        <div className="mt-space-6 flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-space-6 text-center">
          <h3 className="font-display text-heading-md font-semibold text-text">
            No projects found
          </h3>
          <p className="mt-space-2 max-w-md text-body-md text-text-secondary">
            Try another category or search term.
          </p>
          <button
            type="button"
            onClick={clearSearch}
            className="mt-space-5 rounded-full border border-border-strong px-space-5 py-space-2 text-body-sm font-semibold text-text outline-none hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  readonly active: boolean;
  readonly children: string;
  readonly onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-10 shrink-0 rounded-full border px-space-5 font-sans text-body-sm font-semibold transition-colors duration-[var(--motion-fast)] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none",
        active
          ? "border-accent bg-accent text-canvas"
          : "border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text",
      )}
    >
      {children}
    </button>
  );
}
