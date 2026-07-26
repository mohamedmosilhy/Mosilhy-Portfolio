import { afterEach, describe, expect, it, vi } from "vitest";

import { validateContentCatalog } from "@/lib/content/content-validation";
import {
  createValidCatalogInput,
  validProject,
} from "@/tests/fixtures/content-records";
import type { RepositoryContent } from "@/lib/content/repository";

afterEach(() => {
  vi.doUnmock("@/lib/content/repository");
  vi.resetModules();
});

describe("public project selectors", () => {
  it("exclude valid draft records from slugs, summaries, and direct lookup", async () => {
    const input = createValidCatalogInput();
    const draftProject = {
      ...validProject,
      slug: "draft-project",
      title: "Draft Project",
      status: "draft",
      featured: false,
      featuredOrder: undefined,
      projectOrder: 2,
      links: {
        github: "https://github.com/portfolio-developer/draft-project",
        live: "https://draft.portfolio.dev",
      },
      seo: {
        ...validProject.seo,
        title: "Draft Project Engineering Case Study",
        canonicalPath: "/projects/draft-project",
        noIndex: true,
      },
    } as const;
    const catalog = validateContentCatalog({
      ...input,
      projects: [
        ...input.projects,
        {
          source: "content/projects/draft-project.mdx",
          filenameSlug: "draft-project",
          value: draftProject,
        },
      ],
    });
    const repository = {
      catalog,
      projectBodies: new Map([
        ["messaging-app", { code: "compiled published body" }],
        ["draft-project", { code: "compiled draft body" }],
      ]),
    } satisfies RepositoryContent;

    vi.doMock("@/lib/content/repository", () => ({
      getRepositoryContent: async () => repository,
    }));

    const { getAllProjectSummaries, getProjectBySlug, getProjectSlugs } =
      await import("@/lib/content/projects");

    await expect(getProjectSlugs()).resolves.toEqual(["messaging-app"]);
    await expect(getAllProjectSummaries()).resolves.toHaveLength(1);
    await expect(getProjectBySlug("draft-project")).resolves.toBeNull();
  });
});
