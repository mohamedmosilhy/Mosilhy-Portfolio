import "server-only";

import {
  getAdjacentProjects,
  getFeaturedProjects,
  getProjectBySlug,
} from "@/lib/content/projects";
import { getRepositoryContent } from "@/lib/content/repository";
import type { CompiledMdx } from "@/types/content";
import type { HomePageModel, ProjectPageModel } from "@/types/page-models";

export async function getHomePageModel(): Promise<HomePageModel> {
  const [repository, featuredProjects] = await Promise.all([
    getRepositoryContent(),
    getFeaturedProjects(),
  ]);
  const { catalog } = repository;

  return Object.freeze({
    profile: catalog.profile,
    navigation: Object.freeze(
      [...catalog.navigation].sort((left, right) => left.order - right.order),
    ),
    socialLinks: Object.freeze(
      [...catalog.socialLinks].sort((left, right) => left.order - right.order),
    ),
    featuredProjects,
    skillGroups: Object.freeze(
      [...catalog.skillGroups].sort((left, right) => left.order - right.order),
    ),
    testimonials: Object.freeze(
      [...catalog.testimonials]
        .filter((testimonial) => testimonial.featured)
        .sort((left, right) => left.order - right.order),
    ),
    metadata: catalog.siteMetadata,
  });
}

export async function getProjectPageModel(
  slug: string,
): Promise<ProjectPageModel<CompiledMdx> | null> {
  const [repository, project, adjacent] = await Promise.all([
    getRepositoryContent(),
    getProjectBySlug(slug),
    getAdjacentProjects(slug),
  ]);

  if (project === null) {
    return null;
  }

  return Object.freeze({
    project,
    previousProject: adjacent.previous,
    nextProject: adjacent.next,
    navigation: Object.freeze(
      [...repository.catalog.navigation].sort(
        (left, right) => left.order - right.order,
      ),
    ),
    metadata: repository.catalog.siteMetadata,
  });
}
