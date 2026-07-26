import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/features/projects/project-case-study";
import { getProjectSlugs } from "@/lib/content/projects";
import { getProjectPageModel } from "@/lib/content/site-content";

export const dynamicParams = false;

interface ProjectPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const model = await getProjectPageModel(slug);

  if (model === null) {
    notFound();
  }

  return (
    <ProjectCaseStudy
      project={model.project}
      previousProject={model.previousProject}
      nextProject={model.nextProject}
      allProjectsHref="/#projects"
    />
  );
}
