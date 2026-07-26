import { describe, expect, expectTypeOf, it } from "vitest";
import { z } from "zod";

import {
  absoluteUrlSchema,
  imageAssetSchema,
  isoDateSchema,
  navigationItemSchema,
  profileSchema,
  siteMetadataSchema,
  skillGroupSchema,
  socialLinkSchema,
  testimonialSchema,
  videoAssetSchema,
} from "@/lib/content/content-schemas";
import { pageFrontmatterSchema } from "@/lib/content/page-schema";
import { projectFrontmatterSchema } from "@/lib/content/project-schema";
import {
  invalidDecorativeImage,
  invalidEmailSocialLink,
  invalidFeaturedProject,
  validImage,
  validNavigation,
  validPage,
  validProfile,
  validProject,
  validSiteMetadata,
  validSkillGroups,
  validSocialLinks,
  validTestimonial,
} from "@/tests/fixtures/content-records";
import type {
  AbsoluteUrl,
  ImageAsset,
  PageFrontmatter,
  Profile,
  ProjectFrontmatter,
  SiteMetadata,
  SkillGroup,
  SocialLink,
  Testimonial,
  VideoAsset,
} from "@/types/content";
import type { NavigationItem } from "@/types/navigation";

describe("content schemas", () => {
  it("keeps schema output types aligned with public content contracts", () => {
    expectTypeOf<
      z.infer<typeof absoluteUrlSchema>
    >().toEqualTypeOf<AbsoluteUrl>();
    expectTypeOf<
      z.infer<typeof imageAssetSchema>
    >().toEqualTypeOf<ImageAsset>();
    expectTypeOf<
      z.infer<typeof videoAssetSchema>
    >().toEqualTypeOf<VideoAsset>();
    expectTypeOf<
      z.infer<typeof socialLinkSchema>
    >().toEqualTypeOf<SocialLink>();
    expectTypeOf<
      z.infer<typeof navigationItemSchema>
    >().toEqualTypeOf<NavigationItem>();
    expectTypeOf<
      z.infer<typeof skillGroupSchema>
    >().toEqualTypeOf<SkillGroup>();
    expectTypeOf<
      z.infer<typeof testimonialSchema>
    >().toEqualTypeOf<Testimonial>();
    expectTypeOf<z.infer<typeof profileSchema>>().toEqualTypeOf<Profile>();
    expectTypeOf<
      z.infer<typeof projectFrontmatterSchema>
    >().toEqualTypeOf<ProjectFrontmatter>();
    expectTypeOf<
      z.infer<typeof pageFrontmatterSchema>
    >().toEqualTypeOf<PageFrontmatter>();
    expectTypeOf<
      z.infer<typeof siteMetadataSchema>
    >().toEqualTypeOf<SiteMetadata>();
  });

  it("accepts the complete valid fixture set", () => {
    expect(imageAssetSchema.parse(validImage)).toEqual(validImage);
    expect(socialLinkSchema.parse(validSocialLinks[0])).toEqual(
      validSocialLinks[0],
    );
    expect(navigationItemSchema.parse(validNavigation[0])).toEqual(
      validNavigation[0],
    );
    expect(skillGroupSchema.parse(validSkillGroups[0])).toEqual(
      validSkillGroups[0],
    );
    expect(testimonialSchema.parse(validTestimonial)).toEqual(validTestimonial);
    expect(profileSchema.parse(validProfile)).toEqual(validProfile);
    expect(projectFrontmatterSchema.parse(validProject)).toEqual(validProject);
    expect(pageFrontmatterSchema.parse(validPage)).toEqual(validPage);
    expect(siteMetadataSchema.parse(validSiteMetadata)).toEqual(
      validSiteMetadata,
    );
  });

  it("validates stable identifiers, HTTPS URLs, and real ISO calendar dates", () => {
    expect(absoluteUrlSchema.safeParse("http://portfolio.dev").success).toBe(
      false,
    );
    expect(absoluteUrlSchema.safeParse("https://portfolio.dev").success).toBe(
      true,
    );
    expect(isoDateSchema.safeParse("2025-02-29").success).toBe(false);
    expect(isoDateSchema.safeParse("2024-02-29").success).toBe(true);
    expect(isoDateSchema.safeParse("March 20, 2025").success).toBe(false);
    expect(isoDateSchema.safeParse("2025-03-20T14:30:00+02:00").success).toBe(
      true,
    );
    expect(
      projectFrontmatterSchema.safeParse({
        ...validProject,
        slug: "Messaging App",
      }).success,
    ).toBe(false);
  });

  it("enforces asset semantics and rejects undeclared CMS fields", () => {
    expect(imageAssetSchema.safeParse(invalidDecorativeImage).success).toBe(
      false,
    );
    expect(
      imageAssetSchema.safeParse({
        ...validImage,
        alt: "",
      }).success,
    ).toBe(false);
    expect(
      imageAssetSchema.safeParse({
        ...validImage,
        unknownPresentationHint: "rounded-xl",
      }).success,
    ).toBe(false);
    expect(
      videoAssetSchema.safeParse({
        kind: "video",
        src: "/videos/demo.mov",
        poster: validImage,
        title: "Product demonstration",
      }).success,
    ).toBe(false);
  });

  it("enforces platform and navigation relationships within records", () => {
    expect(socialLinkSchema.safeParse(invalidEmailSocialLink).success).toBe(
      false,
    );
    expect(
      navigationItemSchema.safeParse({
        ...validNavigation[0],
        sectionId: "about",
      }).success,
    ).toBe(false);
    expect(
      navigationItemSchema.safeParse({
        ...validNavigation[4],
        sectionId: "about",
      }).success,
    ).toBe(false);
  });

  it("enforces project lifecycle, ordering, and timeline boundaries", () => {
    expect(
      projectFrontmatterSchema.safeParse(invalidFeaturedProject).success,
    ).toBe(false);
    expect(
      projectFrontmatterSchema.safeParse({
        ...validProject,
        timeline: {
          startedAt: "2025-03",
          completedAt: "2025-02",
          updatedAt: "2025-03-20",
        },
      }).success,
    ).toBe(false);
    expect(
      projectFrontmatterSchema.safeParse({
        ...validProject,
        technologies: ["next-js", "next-js"],
      }).success,
    ).toBe(false);
    expect(
      projectFrontmatterSchema.safeParse({
        ...validProject,
        seo: {
          ...validProject.seo,
          canonicalPath: "/projects/another-project",
        },
      }).success,
    ).toBe(false);
  });

  it("supports conventional future pages without exposing templates to content", () => {
    expect(
      pageFrontmatterSchema.safeParse({
        ...validPage,
        id: "engineering-notes",
        path: "/writing/engineering-notes",
        seo: {
          ...validPage.seo,
          canonicalPath: "/writing/engineering-notes",
        },
      }).success,
    ).toBe(true);
    expect(
      pageFrontmatterSchema.safeParse({
        ...validPage,
        status: "published",
        publishedAt: undefined,
      }).success,
    ).toBe(false);
    expect(
      pageFrontmatterSchema.safeParse({
        ...validPage,
        path: "/uses?view=compact",
      }).success,
    ).toBe(false);
    expect(
      pageFrontmatterSchema.safeParse({
        ...validPage,
        path: "/uses/",
      }).success,
    ).toBe(false);
    expect(
      siteMetadataSchema.safeParse({
        ...validSiteMetadata,
        siteUrl: "https://portfolio.dev/about",
      }).success,
    ).toBe(false);
  });
});
