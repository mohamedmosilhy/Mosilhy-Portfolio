import "server-only";

import { getRepositoryContent } from "@/lib/content/repository";
import type {
  ProjectDetail,
  ProjectFrontmatter,
  ProjectSummary,
  Skill,
} from "@/types/content";

function resolveSkills(
  technologyIds: readonly string[],
  skillsById: ReadonlyMap<string, Skill>,
) {
  return Object.freeze(
    technologyIds.map((technologyId) => {
      const skill = skillsById.get(technologyId);

      if (skill === undefined) {
        throw new Error(
          `Validated technology "${technologyId}" could not be resolved`,
        );
      }

      return skill;
    }),
  );
}

function toSummary(
  project: ProjectFrontmatter,
  skillsById: ReadonlyMap<string, Skill>,
): ProjectSummary {
  return Object.freeze({
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    role: project.role,
    category: project.category,
    technologies: resolveSkills(project.technologies, skillsById),
    links: project.links,
    cover: project.cover,
    featured: project.featured,
    featuredOrder: project.featuredOrder,
    projectOrder: project.projectOrder,
  });
}

async function getPublishedProjects() {
  const repository = await getRepositoryContent();
  const skillsById = new Map(
    repository.catalog.skillGroups.flatMap((group) =>
      group.skills.map((skill) => [skill.id, skill] as const),
    ),
  );
  const projects = repository.catalog.projects
    .filter((project) => project.status === "published")
    .sort((left, right) => left.projectOrder - right.projectOrder);

  return {
    repository,
    projects,
    skillsById,
  };
}

export async function getAllProjectSummaries(): Promise<
  readonly ProjectSummary[]
> {
  const { projects, skillsById } = await getPublishedProjects();

  return Object.freeze(
    projects.map((project) => toSummary(project, skillsById)),
  );
}

export async function getFeaturedProjects(): Promise<
  readonly ProjectSummary[]
> {
  const summaries = await getAllProjectSummaries();

  return Object.freeze(
    summaries
      .filter((project) => project.featured)
      .sort(
        (left, right) =>
          (left.featuredOrder ?? Number.MAX_SAFE_INTEGER) -
          (right.featuredOrder ?? Number.MAX_SAFE_INTEGER),
      ),
  );
}

export async function getProjectSlugs(): Promise<readonly string[]> {
  const summaries = await getAllProjectSummaries();

  return Object.freeze(summaries.map((project) => project.slug));
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetail | null> {
  const { repository, projects, skillsById } = await getPublishedProjects();
  const project = projects.find((candidate) => candidate.slug === slug);

  if (project === undefined) {
    return null;
  }

  const body = repository.projectBodies.get(project.slug);

  if (body === undefined) {
    throw new Error(
      `Validated project "${project.slug}" has no compiled MDX body`,
    );
  }

  return Object.freeze({
    ...toSummary(project, skillsById),
    timeline: project.timeline,
    gallery: project.gallery,
    seo: project.seo,
    body,
  });
}

export async function getAdjacentProjects(slug: string): Promise<{
  readonly previous: ProjectSummary | null;
  readonly next: ProjectSummary | null;
}> {
  const summaries = await getAllProjectSummaries();
  const index = summaries.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return Object.freeze({ previous: null, next: null });
  }

  return Object.freeze({
    previous: summaries[index - 1] ?? null,
    next: summaries[index + 1] ?? null,
  });
}
