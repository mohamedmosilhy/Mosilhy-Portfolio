import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  ContentValidationError,
  validateContentCatalog,
} from "@/lib/content/content-validation";
import {
  createValidCatalogInput,
  validNavigation,
  validProfile,
  validProject,
  validSiteMetadata,
  validSkillGroups,
  validSocialLinks,
  validTestimonial,
} from "@/tests/fixtures/content-records";

function getSourceFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    return entry.isDirectory() ? getSourceFiles(path) : [path];
  });
}

function getValidationError(run: () => unknown) {
  try {
    run();
  } catch (error) {
    expect(error).toBeInstanceOf(ContentValidationError);

    return error as ContentValidationError;
  }

  throw new Error("Expected content validation to fail");
}

describe("content catalog validation", () => {
  it("accepts a complete catalog and returns immutable normalized records", () => {
    const catalog = validateContentCatalog(createValidCatalogInput());

    expect(catalog.projects).toHaveLength(1);
    expect(catalog.pages).toHaveLength(1);
    expect(catalog.projects[0]?.technologies).toEqual([
      "next-js",
      "typescript",
    ]);
    expect(Object.isFrozen(catalog)).toBe(true);
    expect(Object.isFrozen(catalog.profile)).toBe(true);
    expect(Object.isFrozen(catalog.projects)).toBe(true);
    expect(Object.isFrozen(catalog.projects[0])).toBe(true);
  });

  it("accepts new pages and related records without changing the schema", () => {
    const input = createValidCatalogInput();
    const catalog = validateContentCatalog({
      ...input,
      navigation: {
        ...input.navigation,
        value: [
          ...validNavigation,
          {
            id: "writing",
            label: "Writing",
            href: "/writing",
            order: 6,
            showInHeader: false,
            showInFooter: true,
          },
        ],
      },
      skillGroups: {
        ...input.skillGroups,
        value: [
          ...validSkillGroups,
          {
            id: "backend",
            label: "Backend",
            order: 2,
            skills: [
              {
                id: "node-js",
                name: "Node.js",
                category: "backend",
                featured: true,
                order: 1,
              },
            ],
          },
        ],
      },
      testimonials: {
        ...input.testimonials,
        value: [
          validTestimonial,
          {
            ...validTestimonial,
            id: "product-lead",
            projectSlug: "inventory-app",
            order: 2,
          },
        ],
      },
      pages: [
        ...input.pages,
        {
          source: "content/pages/writing.mdx",
          filenameId: "writing",
          value: {
            id: "writing",
            path: "/writing",
            title: "Engineering writing",
            summary:
              "Long-form notes about software architecture, implementation decisions, and product engineering practice.",
            status: "published",
            pageOrder: 2,
            publishedAt: "2025-04-01",
            updatedAt: "2025-04-01",
            seo: {
              title: "Engineering Writing and Notes",
              description:
                "Long-form notes covering software architecture, implementation decisions, and practical product engineering.",
              canonicalPath: "/writing",
            },
          },
        },
      ],
      projects: [
        ...input.projects,
        {
          source: "content/projects/inventory-app.mdx",
          filenameSlug: "inventory-app",
          value: {
            ...validProject,
            slug: "inventory-app",
            title: "Inventory App",
            featured: false,
            featuredOrder: undefined,
            projectOrder: 2,
            technologies: ["node-js"],
            links: {
              github: "https://github.com/portfolio-developer/inventory-app",
              live: "https://inventory.portfolio.dev",
            },
            seo: {
              ...validProject.seo,
              title: "Inventory App Engineering Case Study",
              canonicalPath: "/projects/inventory-app",
            },
          },
        },
      ],
    });

    expect(catalog.pages.map((page) => page.id)).toEqual(["uses", "writing"]);
    expect(catalog.projects.map((project) => project.slug)).toEqual([
      "messaging-app",
      "inventory-app",
    ]);
    expect(
      catalog.skillGroups.flatMap((group) =>
        group.skills.map((skill) => skill.id),
      ),
    ).toContain("node-js");
    expect(catalog.testimonials).toHaveLength(2);
    expect(catalog.navigation.some((item) => item.id === "writing")).toBe(true);
  });

  it("reports schema failures with source, path, category, and expected rule", () => {
    const input = createValidCatalogInput();
    const error = getValidationError(() =>
      validateContentCatalog({
        ...input,
        profile: {
          source: "content/profile.ts",
          value: {
            ...validProfile,
            name: "",
          },
        },
      }),
    );

    expect(error.issues[0]).toMatchObject({
      code: "invalid-record",
      source: "content/profile.ts",
      path: ["name"],
      valueCategory: "empty string",
    });
    expect(error.message).toContain("content/profile.ts:name");
    expect(error.message).toContain("received empty string");
    expect(error.message).toContain("expected");
  });

  it("collects independent cross-record failures in one actionable report", () => {
    const input = createValidCatalogInput();
    const duplicateSkillGroup = {
      id: "backend",
      label: "Backend",
      order: 2,
      skills: [
        {
          id: "next-js",
          name: "Next.js server runtime",
          category: "backend",
          featured: false,
          order: 1,
        },
      ],
    } as const;
    const error = getValidationError(() =>
      validateContentCatalog({
        ...input,
        skillGroups: {
          ...input.skillGroups,
          value: [...validSkillGroups, duplicateSkillGroup],
        },
        testimonials: {
          ...input.testimonials,
          value: [
            {
              ...validTestimonial,
              projectSlug: "missing-project",
            },
          ],
        },
        projects: [
          {
            source: "content/projects/messaging-app.mdx",
            filenameSlug: "wrong-filename",
            value: {
              ...validProject,
              technologies: ["missing-skill"],
              links: {
                ...validProject.links,
                github: "https://example.com/repository",
              },
            },
          },
        ],
      }),
    );

    expect(error.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "duplicate-value",
          source: "content/skills.ts",
          path: [1, "skills", 0, "id"],
        }),
        expect.objectContaining({
          code: "source-mismatch",
          source: "content/projects/messaging-app.mdx",
          path: ["slug"],
        }),
        expect.objectContaining({
          code: "unresolved-reference",
          source: "content/projects/messaging-app.mdx",
          path: ["technologies", 0],
        }),
        expect.objectContaining({
          code: "placeholder-value",
          source: "content/projects/messaging-app.mdx",
          path: ["links", "github"],
        }),
        expect.objectContaining({
          code: "unresolved-reference",
          source: "content/testimonials.ts",
          path: [0, "projectSlug"],
        }),
      ]),
    );
  });

  it("requires the canonical contact set and prevents metadata drift", () => {
    const input = createValidCatalogInput();
    const socialLinksWithoutLinkedIn = validSocialLinks.filter(
      (link) => link.platform !== "linkedin",
    );
    const missingContactError = getValidationError(() =>
      validateContentCatalog({
        ...input,
        socialLinks: {
          ...input.socialLinks,
          value: socialLinksWithoutLinkedIn,
        },
        siteMetadata: {
          ...input.siteMetadata,
          value: {
            ...validSiteMetadata,
            socialLinks: socialLinksWithoutLinkedIn,
          },
        },
      }),
    );

    expect(missingContactError.issues).toContainEqual(
      expect.objectContaining({
        code: "missing-required-record",
        source: "content/social-links.ts",
        expected: "at least one linkedin social link",
      }),
    );

    const metadataDriftError = getValidationError(() =>
      validateContentCatalog({
        ...input,
        siteMetadata: {
          ...input.siteMetadata,
          value: {
            ...validSiteMetadata,
            socialLinks: validSocialLinks.map((link) =>
              link.id === "github" ? { ...link, label: "Source code" } : link,
            ),
          },
        },
      }),
    );

    expect(metadataDriftError.issues).toContainEqual(
      expect.objectContaining({
        code: "inconsistent-record",
        source: "content/site-metadata.ts",
        path: ["socialLinks"],
      }),
    );
  });

  it("enforces unique ordering across independently valid project records", () => {
    const input = createValidCatalogInput();
    const secondProject = {
      ...validProject,
      slug: "inventory-app",
      title: "Inventory App",
      status: "published",
      featured: false,
      featuredOrder: undefined,
      links: {
        github: "https://github.com/portfolio-developer/inventory-app",
        live: "https://inventory.portfolio.dev",
      },
      seo: {
        ...validProject.seo,
        title: "Inventory App Engineering Case Study",
        canonicalPath: "/projects/inventory-app",
      },
    } as const;
    const error = getValidationError(() =>
      validateContentCatalog({
        ...input,
        projects: [
          ...input.projects,
          {
            source: "content/projects/inventory-app.mdx",
            filenameSlug: "inventory-app",
            value: secondProject,
          },
        ],
      }),
    );

    expect(error.issues).toContainEqual(
      expect.objectContaining({
        code: "duplicate-value",
        source: "content/projects/inventory-app.mdx",
        path: ["projectOrder"],
      }),
    );
  });

  it("keeps raw runtime schemas out of React component modules", () => {
    const roots = ["app", "components", "features"].map((directory) =>
      resolve(process.cwd(), directory),
    );
    const componentFiles = roots
      .flatMap(getSourceFiles)
      .filter((path) => extname(path) === ".tsx");

    for (const path of componentFiles) {
      const source = readFileSync(path, "utf8");

      expect(source).not.toMatch(
        /@\/lib\/content\/(?:content-schemas|page-schema|project-schema)/,
      );
    }
  });
});
