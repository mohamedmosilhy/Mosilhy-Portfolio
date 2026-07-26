import "server-only";

import { join } from "node:path";

import { navigation } from "@/content/navigation";
import { profile } from "@/content/profile";
import { siteMetadata } from "@/content/site-metadata";
import { skillGroups } from "@/content/skills";
import { socialLinks } from "@/content/social-links";
import { testimonials } from "@/content/testimonials";
import { validateAssetReferences } from "@/lib/content/asset-validation";
import {
  validateContentCatalog,
  type ContentCatalogSourceContext,
  type ValidatedContentCatalog,
} from "@/lib/content/content-validation";
import {
  compileProjectBody,
  discoverProjectSources,
} from "@/lib/content/project-source";
import type { CompiledMdx } from "@/types/content";

export interface RepositoryContent {
  readonly catalog: ValidatedContentCatalog;
  readonly projectBodies: ReadonlyMap<string, CompiledMdx>;
}

interface RepositoryDirectories {
  readonly content: string;
  readonly public: string;
}

function sourceContext(
  projectSources: Awaited<ReturnType<typeof discoverProjectSources>>,
): ContentCatalogSourceContext {
  return {
    profile: "content/profile.ts",
    navigation: "content/navigation.ts",
    socialLinks: "content/social-links.ts",
    skillGroups: "content/skills.ts",
    testimonials: "content/testimonials.ts",
    siteMetadata: "content/site-metadata.ts",
    pages: [],
    projects: projectSources.map(({ source, filenameSlug }) => ({
      source,
      filenameSlug,
    })),
  };
}

export async function loadRepositoryContent(
  directories: RepositoryDirectories,
): Promise<RepositoryContent> {
  const projectSources = await discoverProjectSources(
    join(directories.content, "projects"),
  );
  const catalog = validateContentCatalog({
    profile: {
      source: "content/profile.ts",
      value: profile,
    },
    navigation: {
      source: "content/navigation.ts",
      value: navigation,
    },
    socialLinks: {
      source: "content/social-links.ts",
      value: socialLinks,
    },
    skillGroups: {
      source: "content/skills.ts",
      value: skillGroups,
    },
    testimonials: {
      source: "content/testimonials.ts",
      value: testimonials,
    },
    siteMetadata: {
      source: "content/site-metadata.ts",
      value: siteMetadata,
    },
    pages: [],
    projects: projectSources,
  });
  const sources = sourceContext(projectSources);

  await validateAssetReferences(catalog, sources, directories.public);

  const projectBodies = new Map<string, CompiledMdx>(
    await Promise.all(
      projectSources.map(
        async ({ body, filenameSlug, source }) =>
          [filenameSlug, await compileProjectBody(body, source)] as const,
      ),
    ),
  );

  return Object.freeze({
    catalog,
    projectBodies,
  });
}

let repositoryContentPromise: Promise<RepositoryContent> | undefined;

export function getRepositoryContent(): Promise<RepositoryContent> {
  repositoryContentPromise ??= loadRepositoryContent({
    content: join(/* turbopackIgnore: true */ process.cwd(), "content"),
    public: join(/* turbopackIgnore: true */ process.cwd(), "public"),
  });

  return repositoryContentPromise;
}
