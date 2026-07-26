import type { MetadataRoute } from "next";

import { getProjectBySlug, getProjectSlugs } from "@/lib/content/projects";
import { getHomePageModel } from "@/lib/content/site-content";
import { createSitemap } from "@/lib/metadata/discovery";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [homeModel, slugs] = await Promise.all([
    getHomePageModel(),
    getProjectSlugs(),
  ]);
  const projects = (
    await Promise.all(slugs.map((slug) => getProjectBySlug(slug)))
  ).filter((project) => project !== null);

  return createSitemap(homeModel.metadata, projects);
}
