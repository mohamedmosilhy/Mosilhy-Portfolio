import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/metadata/create-metadata";
import type { ProjectDetail, SiteMetadata } from "@/types/content";

export function createSitemap(
  site: SiteMetadata,
  projects: readonly ProjectDetail[],
): MetadataRoute.Sitemap {
  const latestProjectUpdate = projects
    .map((project) => project.timeline.updatedAt)
    .sort()
    .at(-1);

  return [
    {
      url: site.siteUrl,
      lastModified: latestProjectUpdate,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(site.siteUrl, site.defaultSocialImage.src)],
    },
    ...projects.map((project) => ({
      url: absoluteUrl(
        site.siteUrl,
        project.seo.canonicalPath ?? `/projects/${project.slug}`,
      ),
      lastModified: project.timeline.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [
        absoluteUrl(
          site.siteUrl,
          (project.seo.socialImage ?? project.cover ?? site.defaultSocialImage)
            .src,
        ),
      ],
    })),
  ];
}

export function createRobots(site: SiteMetadata): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl(site.siteUrl, "/sitemap.xml"),
    host: site.siteUrl,
  };
}
