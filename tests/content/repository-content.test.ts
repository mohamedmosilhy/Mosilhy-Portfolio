import { describe, expect, it } from "vitest";

import {
  getAdjacentProjects,
  getAllProjectSummaries,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/content/projects";
import {
  getHomePageModel,
  getProjectPageModel,
} from "@/lib/content/site-content";

const expectedProjectOrder = [
  "nova-ecommerce",
  "messaging-app",
  "blog-api",
  "wheres-waldo",
  "blacktape",
  "teo",
  "iphone-15-pro",
  "multi-source-attribute-extraction",
  "stroke-clot-classification",
  "signal-equalizer",
  "flutter-blog-app",
  "spotify-flutter",
  "cs50-problem-sets",
  "fighter-planes-game",
] as const;

const expectedFeaturedOrder = [
  "nova-ecommerce",
  "messaging-app",
  "blog-api",
  "wheres-waldo",
  "blacktape",
  "teo",
  "iphone-15-pro",
  "multi-source-attribute-extraction",
  "stroke-clot-classification",
  "flutter-blog-app",
] as const;

describe("repository content pipeline", () => {
  it("discovers, validates, compiles, and resolves every published project", async () => {
    const slugs = await getProjectSlugs();

    expect(slugs).toEqual(expectedProjectOrder);

    for (const slug of slugs) {
      const project = await getProjectBySlug(slug);

      expect(project?.slug).toBe(slug);
      expect(project?.body.code.length).toBeGreaterThan(100);
      if (project?.cover) {
        expect(project.cover.src).toMatch(/\.avif$/);
        expect(project.cover.width).toBeLessThanOrEqual(1600);
        expect(project.cover.height).toBeLessThanOrEqual(1600);
      }

      for (const item of project?.gallery.items ?? []) {
        if (item.kind === "image") {
          expect(item.src).toMatch(/\.avif$/);
          expect(item.width).toBeLessThanOrEqual(1600);
          expect(item.height).toBeLessThanOrEqual(1600);
        }
      }

      if (project?.seo.socialImage) {
        expect(project.seo.socialImage.src).toMatch(/\.png$/);
      }
      expect(project?.technologies.length).toBeGreaterThan(0);
      expect(
        project?.technologies.every((technology) => technology.name.length > 0),
      ).toBe(true);
    }

    await expect(getProjectBySlug("missing-project")).resolves.toBeNull();
  });

  it("returns project summaries in explicit project and featured order", async () => {
    const [allProjects, featuredProjects] = await Promise.all([
      getAllProjectSummaries(),
      getFeaturedProjects(),
    ]);

    expect(allProjects.map((project) => project.slug)).toEqual(
      expectedProjectOrder,
    );
    expect(featuredProjects.map((project) => project.slug)).toEqual(
      expectedFeaturedOrder,
    );
    expect(allProjects.map((project) => project.projectOrder)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    ]);
    expect(featuredProjects.map((project) => project.featuredOrder)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect("body" in allProjects[0]!).toBe(false);
  });

  it("returns non-wrapping previous and next projects", async () => {
    await expect(getAdjacentProjects("nova-ecommerce")).resolves.toMatchObject({
      previous: null,
      next: { slug: "messaging-app" },
    });
    await expect(getAdjacentProjects("wheres-waldo")).resolves.toMatchObject({
      previous: { slug: "blog-api" },
      next: { slug: "blacktape" },
    });
    await expect(
      getAdjacentProjects("fighter-planes-game"),
    ).resolves.toMatchObject({
      previous: { slug: "cs50-problem-sets" },
      next: null,
    });
    await expect(getAdjacentProjects("missing-project")).resolves.toEqual({
      previous: null,
      next: null,
    });
  });

  it("builds immutable home and project page models from canonical content", async () => {
    const [home, projectPage, missingPage] = await Promise.all([
      getHomePageModel(),
      getProjectPageModel("wheres-waldo"),
      getProjectPageModel("missing-project"),
    ]);

    expect(home.profile.name).toBe("Mohamed Mosilhy");
    expect(home.projects.map((project) => project.slug)).toEqual(
      expectedProjectOrder,
    );
    expect(home.testimonials).toEqual([]);
    expect(Object.isFrozen(home)).toBe(true);

    expect(projectPage).toMatchObject({
      project: { slug: "wheres-waldo" },
      previousProject: { slug: "blog-api" },
      nextProject: { slug: "blacktape" },
    });
    expect(missingPage).toBeNull();
  });
});
