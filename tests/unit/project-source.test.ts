import { describe, expect, it } from "vitest";

import {
  ContentValidationError,
  validateContentCatalog,
} from "@/lib/content/content-validation";
import { validateAssetReferences } from "@/lib/content/asset-validation";
import { validateProjectMdxStructure } from "@/lib/content/project-source";
import { createValidCatalogInput } from "@/tests/fixtures/content-records";

const validBody = `## Overview

Project overview.

<ProjectGallery />

## Features

Project features.

## Architecture

Project architecture.

<ProjectTechnologies />

## Challenges

Documented challenges.

## Lessons learned

Documented lessons.

<ProjectActions />
`;

describe("project source validation", () => {
  it("accepts the constrained case-study structure", () => {
    expect(() =>
      validateProjectMdxStructure(
        validBody,
        "content/projects/valid-project.mdx",
      ),
    ).not.toThrow();
  });

  it("rejects imports and reports the project source and body field", () => {
    let error: ContentValidationError | undefined;

    try {
      validateProjectMdxStructure(
        `import Component from "./component"\n\n${validBody}`,
        "content/projects/invalid-project.mdx",
      );
    } catch (caught) {
      error = caught as ContentValidationError;
    }

    expect(error).toBeInstanceOf(ContentValidationError);
    expect(error?.issues).toContainEqual(
      expect.objectContaining({
        code: "invalid-mdx",
        source: "content/projects/invalid-project.mdx",
        path: ["body"],
      }),
    );
  });

  it("rejects unknown blocks, authored props, and invalid section order", () => {
    const invalidBody = validBody
      .replace("<ProjectGallery />", '<ProjectGallery layout="grid" />')
      .replace("<ProjectActions />", "<UnknownBlock />");

    expect(() =>
      validateProjectMdxStructure(
        invalidBody,
        "content/projects/invalid-template.mdx",
      ),
    ).toThrowError(
      expect.objectContaining({
        name: "ContentValidationError",
        issues: expect.arrayContaining([
          expect.objectContaining({ code: "invalid-mdx", path: ["body"] }),
        ]),
      }),
    );
  });

  it("reports a missing local asset with its source field", async () => {
    const input = createValidCatalogInput();
    const catalog = validateContentCatalog(input);

    await expect(
      validateAssetReferences(
        catalog,
        {
          profile: input.profile.source,
          navigation: input.navigation.source,
          socialLinks: input.socialLinks.source,
          skillGroups: input.skillGroups.source,
          testimonials: input.testimonials.source,
          siteMetadata: input.siteMetadata.source,
          pages: input.pages.map(({ source, filenameId }) => ({
            source,
            filenameId,
          })),
          projects: input.projects.map(({ source, filenameSlug }) => ({
            source,
            filenameSlug,
          })),
        },
        "/directory-that-does-not-exist",
      ),
    ).rejects.toMatchObject({
      name: "ContentValidationError",
      issues: expect.arrayContaining([
        expect.objectContaining({
          code: "missing-asset",
          source: "content/profile.ts",
          path: ["portrait"],
        }),
        expect.objectContaining({
          code: "missing-asset",
          source: "content/projects/messaging-app.mdx",
          path: ["cover"],
        }),
      ]),
    });
  });
});
