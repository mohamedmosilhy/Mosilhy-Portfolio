import { describe, expect, it } from "vitest";

import { serializeStructuredData } from "@/components/metadata/structured-data";
import {
  validProfile,
  validProject,
  validSiteMetadata,
  validSkillGroups,
} from "@/tests/fixtures/content-records";
import {
  absoluteUrl,
  createHomeMetadata,
  createProjectMetadata,
  createRootMetadata,
} from "@/lib/metadata/create-metadata";
import { createRobots, createSitemap } from "@/lib/metadata/discovery";
import {
  createHomeStructuredData,
  createProjectStructuredData,
} from "@/lib/metadata/structured-data";
import type { ProjectDetail } from "@/types/content";

const project = {
  slug: validProject.slug,
  title: validProject.title,
  summary: validProject.summary,
  role: validProject.role,
  category: validProject.category,
  technologies: validSkillGroups.flatMap((group) =>
    group.skills.filter((skill) =>
      validProject.technologies.includes(
        skill.id as (typeof validProject.technologies)[number],
      ),
    ),
  ),
  links: validProject.links,
  cover: validProject.cover,
  featured: validProject.featured,
  featuredOrder: validProject.featuredOrder,
  projectOrder: validProject.projectOrder,
  timeline: validProject.timeline,
  gallery: validProject.gallery,
  seo: validProject.seo,
  body: { code: "compiled fixture" },
} as const satisfies ProjectDetail;

describe("metadata factories", () => {
  it("creates a canonical root metadata policy", () => {
    const metadata = createRootMetadata(validSiteMetadata);

    expect(metadata.metadataBase?.toString()).toBe("https://portfolio.dev/");
    expect(metadata.title).toEqual({
      default: validSiteMetadata.defaultTitle,
      template: validSiteMetadata.titleTemplate,
    });
    expect(metadata.description).toBe(validSiteMetadata.description);
    expect(metadata.openGraph).toMatchObject({
      title: validSiteMetadata.defaultTitle,
      url: validSiteMetadata.siteUrl,
    });
  });

  it("creates canonical home and project metadata from content", () => {
    const home = createHomeMetadata(validSiteMetadata, validProfile);
    const detail = createProjectMetadata(validSiteMetadata, project);

    expect(home.alternates).toEqual({
      canonical: validSiteMetadata.siteUrl,
    });
    expect(home.twitter).toMatchObject({
      description: validProfile.introduction,
    });
    expect(detail.alternates).toEqual({
      canonical: "https://portfolio.dev/projects/messaging-app",
    });
    expect(detail.openGraph).toMatchObject({
      type: "article",
      title: validProject.seo.title,
      modifiedTime: validProject.timeline.updatedAt,
    });
    expect(detail.twitter).toMatchObject({
      title: validProject.seo.title,
      images: [
        "https://portfolio.dev/images/projects/messaging-app/cover.webp",
      ],
    });
  });

  it("resolves internal asset and route paths against the site origin", () => {
    expect(absoluteUrl(validSiteMetadata.siteUrl, "/projects/example")).toBe(
      "https://portfolio.dev/projects/example",
    );
  });
});

describe("structured data", () => {
  it("keeps visible home and project facts aligned with the content model", () => {
    const home = createHomeStructuredData(validSiteMetadata, validProfile);
    const detail = createProjectStructuredData(
      validSiteMetadata,
      validProfile,
      project,
    );

    expect(home["@graph"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "Person",
          name: validProfile.name,
          jobTitle: validProfile.role,
        }),
        expect.objectContaining({
          "@type": "WebSite",
          name: validSiteMetadata.siteName,
        }),
      ]),
    );
    expect(detail["@graph"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "SoftwareSourceCode",
          name: project.title,
          codeRepository: project.links.github,
          sameAs: project.links.live,
          keywords: project.technologies.map((technology) => technology.name),
        }),
      ]),
    );
  });

  it("serializes inline JSON-LD without leaving executable markup", () => {
    const serialized = serializeStructuredData({
      "@context": "https://schema.org",
      "@graph": [{ name: "</script><script>alert('unsafe')</script>" }],
    });

    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized)).toEqual({
      "@context": "https://schema.org",
      "@graph": [{ name: "</script><script>alert('unsafe')</script>" }],
    });
  });
});

describe("discovery metadata", () => {
  it("publishes canonical, image-backed sitemap entries", () => {
    expect(createSitemap(validSiteMetadata, [project])).toEqual([
      expect.objectContaining({
        url: validSiteMetadata.siteUrl,
        lastModified: validProject.timeline.updatedAt,
        priority: 1,
      }),
      expect.objectContaining({
        url: "https://portfolio.dev/projects/messaging-app",
        lastModified: validProject.timeline.updatedAt,
        priority: 0.8,
        images: [
          "https://portfolio.dev/images/projects/messaging-app/cover.webp",
        ],
      }),
    ]);
  });

  it("points robots directives at the canonical sitemap and host", () => {
    expect(createRobots(validSiteMetadata)).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://portfolio.dev/sitemap.xml",
      host: validSiteMetadata.siteUrl,
    });
  });
});
