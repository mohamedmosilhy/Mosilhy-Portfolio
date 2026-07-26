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
  "wheres-waldo",
  "blacktape",
  "iphone-15-pro",
] as const;

describe("repository content pipeline", () => {
  it("discovers, validates, compiles, and resolves every published project", async () => {
    const slugs = await getProjectSlugs();

    expect(slugs).toEqual(expectedProjectOrder);

    for (const slug of slugs) {
      const project = await getProjectBySlug(slug);

      expect(project?.slug).toBe(slug);
      expect(project?.body.code.length).toBeGreaterThan(100);
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
      expectedProjectOrder,
    );
    expect(allProjects.map((project) => project.projectOrder)).toEqual([
      1, 2, 3, 4,
    ]);
    expect(featuredProjects.map((project) => project.featuredOrder)).toEqual([
      1, 2, 3, 4,
    ]);
    expect("body" in allProjects[0]!).toBe(false);
  });

  it("returns non-wrapping previous and next projects", async () => {
    await expect(getAdjacentProjects("nova-ecommerce")).resolves.toMatchObject({
      previous: null,
      next: { slug: "wheres-waldo" },
    });
    await expect(getAdjacentProjects("wheres-waldo")).resolves.toMatchObject({
      previous: { slug: "nova-ecommerce" },
      next: { slug: "blacktape" },
    });
    await expect(getAdjacentProjects("iphone-15-pro")).resolves.toMatchObject({
      previous: { slug: "blacktape" },
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
    expect(home.featuredProjects.map((project) => project.slug)).toEqual(
      expectedProjectOrder,
    );
    expect(home.testimonials).toEqual([]);
    expect(Object.isFrozen(home)).toBe(true);

    expect(projectPage).toMatchObject({
      project: { slug: "wheres-waldo" },
      previousProject: { slug: "nova-ecommerce" },
      nextProject: { slug: "blacktape" },
    });
    expect(missingPage).toBeNull();
  });
});
