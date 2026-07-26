import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StructuredData } from "@/components/metadata/structured-data";
import { PageEntrance } from "@/components/motion/page-entrance";
import { ProjectCaseStudy } from "@/features/projects/project-case-study";
import { getProjectSlugs } from "@/lib/content/projects";
import {
  getHomePageModel,
  getProjectPageModel,
} from "@/lib/content/site-content";
import { createProjectMetadata } from "@/lib/metadata/create-metadata";
import { createProjectStructuredData } from "@/lib/metadata/structured-data";

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

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = await getProjectPageModel(slug);

  if (model === null) {
    notFound();
  }

  return createProjectMetadata(model.metadata, model.project);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [model, homeModel] = await Promise.all([
    getProjectPageModel(slug),
    getHomePageModel(),
  ]);

  if (model === null) {
    notFound();
  }

  return (
    <>
      <StructuredData
        data={createProjectStructuredData(
          model.metadata,
          homeModel.profile,
          model.project,
        )}
      />
      <PageEntrance>
        <ProjectCaseStudy
          project={model.project}
          previousProject={model.previousProject}
          nextProject={model.nextProject}
          allProjectsHref="/#projects"
        />
      </PageEntrance>
    </>
  );
}
