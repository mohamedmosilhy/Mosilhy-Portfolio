import "server-only";

import { run } from "@mdx-js/mdx";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

import { Prose } from "@/components/ui/prose";
import { Callout } from "@/features/projects/components/callout";
import { Metric } from "@/features/projects/components/metric";
import { ProjectActions } from "@/features/projects/components/project-actions";
import { ProjectGallery } from "@/features/projects/components/project-gallery";
import { ProjectTechnologies } from "@/features/projects/components/project-technologies";
import type { ProjectDetail } from "@/types/content";

function MdxWrapper({ children }: { readonly children?: ReactNode }) {
  return <Prose>{children}</Prose>;
}

function MdxLink({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  const safeHref =
    href?.startsWith("/") ||
    href?.startsWith("#") ||
    href?.startsWith("https://") ||
    href?.startsWith("mailto:");

  if (!href || !safeHref) {
    throw new Error(`Project MDX contains an unsupported link: ${href ?? ""}`);
  }

  return (
    <a {...props} href={href}>
      {children}
    </a>
  );
}

export function createMdxComponents(project: ProjectDetail) {
  return {
    wrapper: MdxWrapper,
    a: MdxLink,
    Callout,
    Metric,
    ProjectGallery: () => (
      <ProjectGallery
        items={project.gallery.items}
        projectTitle={project.title}
        variant={project.gallery.layout}
      />
    ),
    ProjectTechnologies: () => (
      <ProjectTechnologies skills={project.technologies} />
    ),
    ProjectActions: () => (
      <ProjectActions
        links={project.links}
        projectTitle={project.title}
        variant="links"
      />
    ),
  };
}

export async function renderProjectMdx(
  project: ProjectDetail,
): Promise<ReactElement> {
  const mdxModule = await run(project.body.code, {
    Fragment,
    jsx,
    jsxs,
  });
  const Content = mdxModule.default;

  return <Content components={createMdxComponents(project)} />;
}
