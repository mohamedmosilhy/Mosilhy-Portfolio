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
  technologies: validSkillGroups[0].skills,
  links: validProject.links,
  cover: validProject.cover,
  featured: validProject.featured,
  featuredOrder: validProject.featuredOrder,
  projectOrder: validProject.projectOrder,
} as const satisfies ProjectSummary;

afterEach(cleanup);

describe("ProjectCard", () => {
  it("renders complete project evidence with valid sibling actions", () => {
    render(<ProjectCard project={projectSummary} />);

    const card = screen.getByRole("article", {
      name: projectSummary.title,
    });
    const media = within(card).getByRole("img", {
      name: projectSummary.cover.alt,
    });

    expect(media).toHaveAttribute("width", String(projectSummary.cover.width));
    expect(media).toHaveAttribute(
      "height",
      String(projectSummary.cover.height),
    );
    expect(card).toHaveTextContent(projectSummary.role);
    expect(card).toHaveTextContent(projectSummary.summary);

    for (const technology of projectSummary.technologies) {
      expect(card).toHaveTextContent(technology.name);
    }

    const caseStudy = within(card).getByRole("link", {
      name: `View ${projectSummary.title} case study`,
    });
    const github = within(card).getByRole("link", {
      name: `Open ${projectSummary.title} GitHub repository (opens in a new tab)`,
    });
    const liveDemo = within(card).getByRole("link", {
      name: `Open ${projectSummary.title} live demo (opens in a new tab)`,
    });

    expect(caseStudy).toHaveAttribute(
      "href",
      `/projects/${projectSummary.slug}`,
    );
    expect(github).toHaveAttribute("href", projectSummary.links.github);
    expect(liveDemo).toHaveAttribute("href", projectSummary.links.live);
    expect(caseStudy.closest("a")?.querySelectorAll("a")).toHaveLength(0);
    expect(github.closest("a")?.querySelectorAll("a")).toHaveLength(0);
    expect(liveDemo.closest("a")?.querySelectorAll("a")).toHaveLength(0);
  });

  it("keeps media and content in DOM order for each position variant", () => {
    const { rerender } = render(
      <ProjectCard project={projectSummary} mediaPosition="start" />,
    );
    let layout = screen
      .getByRole("article", { name: projectSummary.title })
      .querySelector(".grid")!;

    expect(layout.firstElementChild).toContainElement(
      screen.getByRole("img", { name: projectSummary.cover.alt }),
    );

    rerender(<ProjectCard project={projectSummary} mediaPosition="end" />);
    layout = screen
      .getByRole("article", { name: projectSummary.title })
      .querySelector(".grid")!;

    expect(layout.lastElementChild).toContainElement(
      screen.getByRole("img", { name: projectSummary.cover.alt }),
    );
  });
});

describe("ProjectsSection", () => {
  it("preserves the order supplied by the validated page model", () => {
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
        heading="Selected projects"
      />,
    );

    const section = screen.getByRole("region", {
      name: "Selected projects",
    });
    const cards = within(section).getAllByRole("article");

    expect(cards.map((card) => card.getAttribute("aria-labelledby"))).toEqual([
      "project-second-project-heading",
      `project-${projectSummary.slug}-heading`,
    ]);
  });
});

describe("project feature architecture guardrails", () => {
  const featureSources = [
    "features/projects/components/project-card.tsx",
    "features/projects/projects-section.tsx",
  ].map((file) => ({
    file,
    source: readFileSync(resolve(process.cwd(), file), "utf8"),
  }));

  it("keeps project features server-rendered and page-model driven", () => {
    for (const { file, source } of featureSources) {
      expect(source, file).not.toMatch(/^["']use client["'];?/m);
      expect(source, file).not.toContain("@/content/");
      expect(source, file).not.toContain("@/lib/content/");
      expect(source, file).not.toMatch(
        /Mohamed Mosilhy|Nova E-commerce|Where’s Waldo|Blacktape/,
      );
    }
  });

  it("uses semantic design tokens instead of raw palette values", () => {
    for (const { file, source } of featureSources) {
      expect(source, file).not.toMatch(/#[\da-f]{3,8}\b/i);
      expect(source, file).not.toMatch(
        /\b(?:bg|text|border)-(?:zinc|slate|gray|neutral|indigo|rose|teal|amber)-\d+/,
      );
    }
  });
});
