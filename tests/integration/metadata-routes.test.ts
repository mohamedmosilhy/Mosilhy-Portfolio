import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/local", () => ({
  default: () => ({ variable: "--test-font" }),
}));

import { generateMetadata as generateHomeMetadata } from "@/app/(site)/page";
import {
  generateMetadata as generateProjectMetadata,
  generateStaticParams,
} from "@/app/(site)/projects/[slug]/page";
import { generateMetadata as generateRootMetadata } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

const siteUrl = "https://portfolio-omega-six-23.vercel.app";

describe("route metadata and discovery", () => {
  it("uses the production origin and content-backed root defaults", async () => {
    const metadata = await generateRootMetadata();

    expect(metadata.metadataBase?.toString()).toBe(`${siteUrl}/`);
    expect(metadata.title).toEqual({
      default: "Mohamed Mosilhy — Full-stack Developer",
      template: "%s | Mohamed Mosilhy",
    });
    expect(JSON.stringify(metadata)).not.toMatch(/create next app/i);
  });

  it("publishes canonical home and project metadata", async () => {
    const home = await generateHomeMetadata();
    const project = await generateProjectMetadata({
      params: Promise.resolve({ slug: "nova-ecommerce" }),
    });

    expect(home.alternates).toEqual({ canonical: siteUrl });
    expect(project.alternates).toEqual({
      canonical: `${siteUrl}/projects/nova-ecommerce`,
    });
    expect(project.openGraph).toMatchObject({
      type: "article",
      url: `${siteUrl}/projects/nova-ecommerce`,
    });
  });

  it("lists every published static project and no unpublished routes", async () => {
    const params = await generateStaticParams();
    const entries = await sitemap();
    const projectUrls = entries
      .map((entry) => entry.url)
      .filter((url) => url.includes("/projects/"));

    expect(projectUrls).toEqual(
      params.map(({ slug }) => `${siteUrl}/projects/${slug}`),
    );
    expect(entries).toHaveLength(params.length + 1);
  });

  it("publishes crawler directives for the same canonical origin", async () => {
    await expect(robots()).resolves.toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl,
    });
  });
});
