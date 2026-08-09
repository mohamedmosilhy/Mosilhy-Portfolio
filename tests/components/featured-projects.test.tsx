import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectsSection } from "@/features/projects/projects-section";
import {
  validProject,
  validSkillGroups,
} from "@/tests/fixtures/content-records";
import type { ProjectSummary } from "@/types/content";

const projectSummary = {
  slug: validProject.slug,
  title: validProject.title,
  summary: validProject.summary,
  role: validProject.role,
  category: validProject.category,
  technologies: validSkillGroups[0].skills,
  links: validProject.links,
  cover: validProject.cover,
  featured: validProject.featured,
  featuredOrder: validProject.featuredOrder,
  projectOrder: validProject.projectOrder,
} as const satisfies ProjectSummary;

afterEach(cleanup);

describe("ProjectCard", () => {
  it("keeps the gallery preview visual and deliberately minimal", () => {
    render(<ProjectCard project={projectSummary} ordinal={1} />);

    const card = screen.getByRole("article", { name: projectSummary.title });
    const media = within(card).getByRole("img", {
      name: projectSummary.cover.alt,
    });
    const links = within(card).getAllByRole("link");

    expect(media).toHaveAttribute("width", String(projectSummary.cover.width));
    expect(media).toHaveAttribute(
      "height",
      String(projectSummary.cover.height),
    );
    expect(card).toHaveTextContent("Full-stack");
    expect(card).toHaveTextContent(projectSummary.role);
    expect(card).toHaveTextContent("01");
    expect(card).not.toHaveTextContent(projectSummary.summary);
    expect(card).not.toHaveTextContent(projectSummary.technologies[0].name);
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName(
      `View ${projectSummary.title} case study`,
    );
    expect(links[0]).toHaveAttribute(
      "href",
      `/projects/${projectSummary.slug}`,
    );
  });
});

describe("ProjectsSection", () => {
  it("preserves model order inside the filterable bento gallery", () => {
    const secondProject = {
      ...projectSummary,
      slug: "second-project",
      title: "Second Project",
      featuredOrder: 2,
      projectOrder: 2,
    } as const satisfies ProjectSummary;

    render(
      <ProjectsSection
        projects={[secondProject, projectSummary]}
        heading="Project gallery"
      />,
    );

    const section = screen.getByRole("region", { name: "Project gallery" });
    const cards = within(section).getAllByRole("article");

    expect(cards.map((card) => card.getAttribute("aria-labelledby"))).toEqual([
      "project-second-project-heading",
      `project-${projectSummary.slug}-heading`,
    ]);
    expect(within(section).getByText("Showing 2 of 2 projects")).toBeVisible();
    expect(
      within(section).getByRole("button", { name: "All" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(section.querySelector('[data-slot="bento-grid"]')).toHaveClass(
      "lg:grid-cols-6",
    );
  });
});

describe("project feature architecture guardrails", () => {
  const serverFeatureSources = [
    "features/projects/components/project-card.tsx",
    "features/projects/projects-section.tsx",
  ].map((file) => ({
    file,
    source: readFileSync(resolve(process.cwd(), file), "utf8"),
  }));

  it("keeps only filtering in a focused client island", () => {
    for (const { file, source } of serverFeatureSources) {
      expect(source, file).not.toMatch(/^["']use client["'];?/m);
      expect(source, file).not.toContain("@/content/");
      expect(source, file).not.toContain("@/lib/content/");
    }

    const gallerySource = readFileSync(
      resolve(
        process.cwd(),
        "features/projects/components/filterable-project-gallery.tsx",
      ),
      "utf8",
    );

    expect(gallerySource).toMatch(/^["']use client["'];?/m);
    expect(gallerySource).not.toContain("@/lib/content/");
  });

  it("uses semantic design tokens instead of raw palette values", () => {
    for (const { file, source } of serverFeatureSources) {
      expect(source, file).not.toMatch(/#[\da-f]{3,8}\b/i);
      expect(source, file).not.toMatch(
        /\b(?:bg|text|border)-(?:zinc|slate|gray|neutral|indigo|rose|teal|amber)-\d+/,
      );
    }
  });
});
