import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Callout } from "@/features/projects/components/callout";
import { Metric } from "@/features/projects/components/metric";
import { ProjectCarousel } from "@/features/projects/components/project-carousel";
import { ProjectNavigation } from "@/features/projects/components/project-navigation";
import { ProjectCaseStudy } from "@/features/projects/project-case-study";
import { compileProjectBody } from "@/lib/content/project-source";
import { getProjectPageModel } from "@/lib/content/site-content";

const originalScrollTo = HTMLElement.prototype.scrollTo;

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    configurable: true,
    value: originalScrollTo,
  });
});

describe("ProjectCaseStudy", () => {
  it("renders the validated narrative and bound project blocks in order", async () => {
    const model = await getProjectPageModel("wheres-waldo");

    expect(model).not.toBeNull();

    const view = await ProjectCaseStudy({
      project: model!.project,
      previousProject: model!.previousProject,
      nextProject: model!.nextProject,
      allProjectsHref: "/#projects",
    });

    render(view);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: model!.project.title,
      }),
    ).toBeInTheDocument();

    const body = screen.getByRole("region", {
      name: `${model!.project.title} case study`,
    });
    const sectionHeadings = within(body)
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);

    expect(sectionHeadings).toEqual([
      "Overview",
      "Features",
      "Architecture",
      "Challenges",
      "Lessons learned",
    ]);
    expect(
      within(body).getByRole("region", {
        name: `${model!.project.title} gallery`,
      }),
    ).toBeInTheDocument();
    expect(
      within(body).getByRole("heading", {
        level: 3,
        name: "Technologies",
      }),
    ).toBeInTheDocument();

    for (const skill of model!.project.technologies) {
      expect(body).toHaveTextContent(skill.name);
    }

    const galleryImages = within(body).getAllByRole("img");
    const firstGalleryItem = model!.project.gallery.items[0]!;
    const firstGalleryImage =
      firstGalleryItem.kind === "image"
        ? firstGalleryItem
        : firstGalleryItem.poster;

    expect(galleryImages[0]).toHaveAttribute(
      "width",
      String(firstGalleryImage.width),
    );
    expect(galleryImages[0]).toHaveAttribute(
      "height",
      String(firstGalleryImage.height),
    );

    const projectNavigation = screen.getByRole("navigation", {
      name: "Project case studies",
    });

    expect(
      within(projectNavigation).getByRole("link", {
        name: `Previous case study: ${model!.previousProject!.title}`,
      }),
    ).toHaveAttribute("href", `/projects/${model!.previousProject!.slug}`);
    expect(
      within(projectNavigation).getByRole("link", {
        name: `Next case study: ${model!.nextProject!.title}`,
      }),
    ).toHaveAttribute("href", `/projects/${model!.nextProject!.slug}`);
    expect(
      within(projectNavigation).getByRole("link", { name: "All projects" }),
    ).toHaveAttribute("href", "/#projects");
  });

  it("executes the allowlisted Callout and Metric components", async () => {
    const model = await getProjectPageModel("nova-ecommerce");

    expect(model).not.toBeNull();

    const body = await compileProjectBody(
      `## Overview

<Callout title="Constraint" variant="decision">

Repository-supported context.

</Callout>

<ProjectGallery />

## Features

Feature narrative.

## Architecture

Architecture narrative.

<ProjectTechnologies />

## Challenges

Challenge narrative.

## Lessons learned

Lesson narrative.

<Metric value="4" label="Published projects" detail="Validated content" />

<ProjectActions />`,
      "content/projects/rich-test.mdx",
    );
    const view = await ProjectCaseStudy({
      project: { ...model!.project, body },
      previousProject: null,
      nextProject: null,
      allProjectsHref: "/#projects",
    });

    render(view);

    expect(screen.getByText("Constraint")).toBeInTheDocument();
    expect(
      screen.getByText("Repository-supported context."),
    ).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("Published projects")).toBeInTheDocument();
    expect(screen.getByText("Validated content")).toBeInTheDocument();
  });
});

describe("project component variants", () => {
  it("keeps carousel media in the DOM and exposes keyboard-labelled controls", async () => {
    const model = await getProjectPageModel("wheres-waldo");
    const user = userEvent.setup();
    const scrollTo = vi.fn();

    expect(model).not.toBeNull();
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: scrollTo,
    });

    render(
      <ProjectCarousel
        items={model!.project.gallery.items}
        projectTitle={model!.project.title}
      />,
    );

    expect(screen.getAllByRole("img")).toHaveLength(
      model!.project.gallery.items.length,
    );
    const previous = screen.getByRole("button", {
      name: `Show previous ${model!.project.title} gallery item`,
    });
    const next = screen.getByRole("button", {
      name: `Show next ${model!.project.title} gallery item`,
    });

    expect(previous).toBeDisabled();
    expect(next).toBeEnabled();

    await user.click(next);

    expect(scrollTo).toHaveBeenCalled();
    expect(previous).toBeEnabled();
    expect(next).toBeDisabled();
  });

  it("renders non-wrapping project navigation boundaries", async () => {
    const first = await getProjectPageModel("nova-ecommerce");
    const last = await getProjectPageModel("iphone-15-pro");
    const { rerender } = render(
      <ProjectNavigation
        previousProject={first!.previousProject}
        nextProject={first!.nextProject}
        allProjectsHref="/#projects"
      />,
    );

    expect(
      screen.queryByRole("link", { name: /Previous case study:/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: `Next case study: ${first!.nextProject!.title}`,
      }),
    ).toBeInTheDocument();

    rerender(
      <ProjectNavigation
        previousProject={last!.previousProject}
        nextProject={last!.nextProject}
        allProjectsHref="/#projects"
      />,
    );

    expect(
      screen.getByRole("link", {
        name: `Previous case study: ${last!.previousProject!.title}`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Next case study:/ }),
    ).not.toBeInTheDocument();
  });

  it("renders standalone Callout and Metric semantics", () => {
    render(
      <>
        <Callout title="Decision" variant="decision">
          <p>Use the validated model.</p>
        </Callout>
        <Metric value="100%" label="Verified" detail="Repository evidence" />
      </>,
    );

    expect(screen.getByText("Decision").closest("aside")).toHaveAttribute(
      "data-variant",
      "decision",
    );
    expect(screen.getByText("Verified").closest("dl")).toBeInTheDocument();
  });
});

describe("project feature architecture guardrails", () => {
  const componentDirectory = resolve(
    process.cwd(),
    "features/projects/components",
  );
  const featureFiles = [
    "callout.tsx",
    "mdx-components.tsx",
    "metric.tsx",
    "project-actions.tsx",
    "project-carousel.tsx",
    "project-gallery.tsx",
    "project-hero.tsx",
    "project-navigation.tsx",
    "project-technologies.tsx",
  ];
  const sources = [
    ...featureFiles.map((file) => ({
      file,
      source: readFileSync(resolve(componentDirectory, file), "utf8"),
    })),
    {
      file: "project-case-study.tsx",
      source: readFileSync(
        resolve(process.cwd(), "features/projects/project-case-study.tsx"),
        "utf8",
      ),
    },
  ];

  it("limits the client boundary to the interactive carousel", () => {
    for (const { file, source } of sources) {
      const isClient = /^["']use client["'];?/m.test(source);

      expect(isClient, file).toBe(file === "project-carousel.tsx");
    }
  });

  it("keeps feature content page-model driven and tokenized", () => {
    for (const { file, source } of sources) {
      expect(source, file).not.toContain("@/content/");
      expect(source, file).not.toContain("@/lib/content/");
      expect(source, file).not.toMatch(
        /Mohamed Mosilhy|Nova E-commerce|Where’s Waldo|Blacktape/,
      );
      expect(source, file).not.toMatch(/#[\da-f]{3,8}\b/i);
      expect(source, file).not.toMatch(
        /\b(?:bg|text|border)-(?:zinc|slate|gray|neutral|indigo|rose|teal|amber)-\d+/,
      );
    }
  });
});
