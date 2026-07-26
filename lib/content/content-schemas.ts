import { z } from "zod";

import type {
  AbsoluteUrl,
  ExperienceSummary,
  ExternalHref,
  ImageAsset,
  Interest,
  InternalHref,
  MediaAsset,
  Profile,
  SeoFields,
  SiteMetadata,
  Skill,
  SkillGroup,
  Slug,
  SocialLink,
  Testimonial,
  TestimonialPerson,
  VideoAsset,
} from "@/types/content";
import type { NavigationItem, NavigationSectionId } from "@/types/navigation";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoMonthPattern = /^(\d{4})-(\d{2})$/;
const isoDayPattern = /^(\d{4})-(\d{2})-(\d{2})$/;
const isoYearPattern = /^\d{4}$/;
const isoTimestampPattern =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;
const imageExtensionPattern = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
const localVideoExtensionPattern = /\.(?:mp4|ogg|webm)$/i;

const shortTextSchema = z.string().trim().min(1).max(120);
const labelSchema = z.string().trim().min(1).max(60);
const paragraphSchema = z.string().trim().min(1).max(2_000);
const orderSchema = z.number().int().positive();

function hasValidCalendarDate(value: string): boolean {
  const monthMatch = isoMonthPattern.exec(value);

  if (monthMatch) {
    const month = Number(monthMatch[2]);

    return month >= 1 && month <= 12;
  }

  const dayMatch = isoDayPattern.exec(value);

  if (dayMatch) {
    const year = Number(dayMatch[1]);
    const month = Number(dayMatch[2]);
    const day = Number(dayMatch[3]);
    const parsed = new Date(Date.UTC(year, month - 1, day));

    return (
      parsed.getUTCFullYear() === year &&
      parsed.getUTCMonth() === month - 1 &&
      parsed.getUTCDate() === day
    );
  }

  if (isoYearPattern.test(value)) {
    return true;
  }

  return (
    isoTimestampPattern.test(value) &&
    hasValidCalendarDate(value.slice(0, 10)) &&
    !Number.isNaN(Date.parse(value))
  );
}

function isInternalHref(value: string): value is InternalHref {
  return (
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\") &&
    !/\s/.test(value)
  );
}

function isLocalAssetPath(value: string): value is `/${string}` {
  return (
    isInternalHref(value) &&
    !value.includes("#") &&
    !value.includes("?") &&
    !value.split("/").includes("..")
  );
}

function isAbsoluteHttpsUrl(value: string): value is AbsoluteUrl {
  try {
    const url = new URL(value);

    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function isMailtoHref(value: string) {
  if (!value.startsWith("mailto:")) {
    return false;
  }

  const address = value.slice("mailto:".length).split("?")[0];

  return z.email().safeParse(address).success;
}

function isExternalHref(value: string): value is ExternalHref {
  return isAbsoluteHttpsUrl(value) || isMailtoHref(value);
}

function addDuplicateIssues<T>(
  values: readonly T[],
  context: z.RefinementCtx,
  key: keyof T,
) {
  const firstIndexes = new Map<unknown, number>();

  values.forEach((value, index) => {
    const candidate = value[key];
    const firstIndex = firstIndexes.get(candidate);

    if (firstIndex === undefined) {
      firstIndexes.set(candidate, index);
      return;
    }

    context.addIssue({
      code: "custom",
      path: [index, key as string],
      message: `must be unique; duplicates item at index ${firstIndex}`,
    });
  });
}

export const slugSchema = z
  .string()
  .trim()
  .regex(slugPattern, "must be a lower-case kebab-case identifier")
  .transform((value) => value as Slug);

export const isoDateSchema = z
  .string()
  .trim()
  .refine(
    hasValidCalendarDate,
    "must be a valid ISO year, month, date, or timestamp",
  );

export const absoluteUrlSchema = z
  .string()
  .trim()
  .refine(isAbsoluteHttpsUrl, "must be an absolute HTTPS URL")
  .transform((value) => value as AbsoluteUrl);

export const internalHrefSchema = z
  .string()
  .trim()
  .refine(
    isInternalHref,
    "must be a root-relative internal path without whitespace",
  )
  .transform((value) => value as InternalHref);

export const externalHrefSchema = z
  .string()
  .trim()
  .refine(
    isExternalHref,
    "must be an absolute HTTPS URL or a valid mailto address",
  )
  .transform((value) => value as ExternalHref);

export const localAssetPathSchema = z
  .string()
  .trim()
  .refine(
    isLocalAssetPath,
    "must be a root-relative asset path without traversal, query, or fragment",
  )
  .transform((value) => value as `/${string}`);

export const imageAssetSchema: z.ZodType<ImageAsset> = z
  .strictObject({
    kind: z.literal("image"),
    src: localAssetPathSchema.refine(
      (value) => imageExtensionPattern.test(value),
      "must use a supported image file extension",
    ),
    alt: z.string().trim().max(250),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    caption: z.string().trim().min(1).max(300).optional(),
    decorative: z.boolean().optional(),
  })
  .superRefine((asset, context) => {
    if (asset.decorative === true && asset.alt !== "") {
      context.addIssue({
        code: "custom",
        path: ["alt"],
        message: "must be empty when the image is decorative",
      });
    }

    if (asset.decorative !== true && asset.alt.length === 0) {
      context.addIssue({
        code: "custom",
        path: ["alt"],
        message: "must describe an informative image",
      });
    }
  })
  .readonly();

export const videoAssetSchema: z.ZodType<VideoAsset> = z
  .strictObject({
    kind: z.literal("video"),
    src: z
      .union([localAssetPathSchema, absoluteUrlSchema])
      .refine(
        (value) =>
          value.startsWith("https://") ||
          localVideoExtensionPattern.test(value),
        "local videos must use MP4, OGG, or WebM",
      ),
    poster: imageAssetSchema,
    title: shortTextSchema,
    caption: z.string().trim().min(1).max(300).optional(),
  })
  .superRefine((video, context) => {
    if (video.poster.decorative === true) {
      context.addIssue({
        code: "custom",
        path: ["poster", "decorative"],
        message: "must not be true for a video poster",
      });
    }
  })
  .readonly();

export const mediaAssetSchema: z.ZodType<MediaAsset> = z.union([
  imageAssetSchema,
  videoAssetSchema,
]);

export const socialLinkSchema: z.ZodType<SocialLink> = z
  .strictObject({
    id: slugSchema,
    platform: z.enum(["github", "linkedin", "email", "website"]),
    label: labelSchema,
    href: externalHrefSchema,
    newTab: z.boolean(),
    order: orderSchema,
  })
  .superRefine((link, context) => {
    const isEmailHref = link.href.startsWith("mailto:");

    if (link.platform === "email" && !isEmailHref) {
      context.addIssue({
        code: "custom",
        path: ["href"],
        message: "must use mailto: for the email platform",
      });
    }

    if (link.platform !== "email" && isEmailHref) {
      context.addIssue({
        code: "custom",
        path: ["href"],
        message: "must use HTTPS for non-email platforms",
      });
    }

    if (link.platform === "email" && link.newTab) {
      context.addIssue({
        code: "custom",
        path: ["newTab"],
        message: "must be false for email links",
      });
    }
  })
  .readonly();

export const socialLinksSchema = z
  .array(socialLinkSchema)
  .superRefine((links, context) => {
    addDuplicateIssues(links, context, "id");
    addDuplicateIssues(links, context, "order");
  })
  .readonly();

export const navigationSectionIdSchema: z.ZodType<NavigationSectionId> = z.enum(
  ["projects", "skills", "about", "contact"],
);

export const navigationItemSchema: z.ZodType<NavigationItem> = z
  .strictObject({
    id: slugSchema,
    label: labelSchema,
    href: internalHrefSchema,
    sectionId: navigationSectionIdSchema.optional(),
    order: orderSchema,
    showInHeader: z.boolean(),
    showInFooter: z.boolean(),
  })
  .superRefine((item, context) => {
    const fragment = item.href.startsWith("/#")
      ? item.href.slice(2)
      : undefined;

    if (fragment && item.sectionId !== fragment) {
      context.addIssue({
        code: "custom",
        path: ["sectionId"],
        message: `must equal the "${fragment}" home-section fragment`,
      });
    }

    if (!fragment && item.sectionId !== undefined) {
      context.addIssue({
        code: "custom",
        path: ["sectionId"],
        message: "must be omitted when href is not a home-section fragment",
      });
    }
  })
  .readonly();

export const navigationSchema = z
  .array(navigationItemSchema)
  .superRefine((items, context) => {
    addDuplicateIssues(items, context, "id");
    addDuplicateIssues(items, context, "order");

    for (const region of ["showInHeader", "showInFooter"] as const) {
      const labels = new Map<string, number>();

      items.forEach((item, index) => {
        if (!item[region]) {
          return;
        }

        const normalizedLabel = item.label.toLocaleLowerCase("en");
        const firstIndex = labels.get(normalizedLabel);

        if (firstIndex === undefined) {
          labels.set(normalizedLabel, index);
          return;
        }

        context.addIssue({
          code: "custom",
          path: [index, "label"],
          message: `must be unique within ${region === "showInHeader" ? "header" : "footer"} navigation; duplicates item at index ${firstIndex}`,
        });
      });
    }
  })
  .readonly();

export const skillSchema: z.ZodType<Skill> = z
  .strictObject({
    id: slugSchema,
    name: shortTextSchema,
    category: z.enum(["frontend", "backend", "database", "tools"]),
    description: z.string().trim().min(1).max(300).optional(),
    featured: z.boolean(),
    order: orderSchema,
  })
  .readonly();

export const skillGroupSchema: z.ZodType<SkillGroup> = z
  .strictObject({
    id: z.enum(["frontend", "backend", "database", "tools"]),
    label: labelSchema,
    description: z.string().trim().min(1).max(300).optional(),
    order: orderSchema,
    skills: z
      .array(skillSchema)
      .superRefine((skills, context) => {
        addDuplicateIssues(skills, context, "id");
        addDuplicateIssues(skills, context, "order");
      })
      .readonly(),
  })
  .superRefine((group, context) => {
    group.skills.forEach((skill, index) => {
      if (skill.category !== group.id) {
        context.addIssue({
          code: "custom",
          path: ["skills", index, "category"],
          message: `must match the parent "${group.id}" category`,
        });
      }
    });
  })
  .readonly();

export const skillGroupsSchema = z
  .array(skillGroupSchema)
  .superRefine((groups, context) => {
    addDuplicateIssues(groups, context, "id");
    addDuplicateIssues(groups, context, "order");
  })
  .readonly();

export const testimonialPersonSchema: z.ZodType<TestimonialPerson> = z
  .strictObject({
    name: shortTextSchema,
    position: shortTextSchema,
    company: shortTextSchema,
    photo: imageAssetSchema,
  })
  .superRefine((person, context) => {
    if (person.photo.decorative === true) {
      context.addIssue({
        code: "custom",
        path: ["photo", "decorative"],
        message: "must not be true for a testimonial photo",
      });
    }
  })
  .readonly();

export const testimonialSchema: z.ZodType<Testimonial> = z
  .strictObject({
    id: slugSchema,
    quote: z.string().trim().min(20).max(1_000),
    person: testimonialPersonSchema,
    projectSlug: slugSchema.optional(),
    featured: z.boolean(),
    order: orderSchema,
  })
  .readonly();

export const testimonialsSchema = z
  .array(testimonialSchema)
  .superRefine((testimonials, context) => {
    addDuplicateIssues(testimonials, context, "id");
    addDuplicateIssues(testimonials, context, "order");
  })
  .readonly();

export const experienceSummarySchema: z.ZodType<ExperienceSummary> = z
  .strictObject({
    id: slugSchema,
    label: labelSchema,
    value: shortTextSchema,
    order: orderSchema,
  })
  .readonly();

export const interestSchema: z.ZodType<Interest> = z
  .strictObject({
    id: slugSchema,
    label: labelSchema,
    description: z.string().trim().min(1).max(300).optional(),
    order: orderSchema,
  })
  .readonly();

export const profileSchema: z.ZodType<Profile> = z
  .strictObject({
    greeting: shortTextSchema,
    name: z.string().trim().min(2).max(100),
    role: z.string().trim().min(2).max(120),
    introduction: z.string().trim().min(20).max(500),
    biography: z.array(paragraphSchema).min(1).max(12).readonly(),
    experience: z
      .array(experienceSummarySchema)
      .superRefine((items, context) => {
        addDuplicateIssues(items, context, "id");
        addDuplicateIssues(items, context, "order");
      })
      .readonly(),
    interests: z
      .array(interestSchema)
      .superRefine((items, context) => {
        addDuplicateIssues(items, context, "id");
        addDuplicateIssues(items, context, "order");
      })
      .readonly(),
    location: shortTextSchema.optional(),
    availability: z.string().trim().min(1).max(200).optional(),
    portrait: imageAssetSchema.optional(),
    email: externalHrefSchema.refine(
      (value) => value.startsWith("mailto:"),
      "must use a mailto: address",
    ),
    primaryCta: z
      .strictObject({
        label: labelSchema,
        href: internalHrefSchema,
      })
      .readonly(),
    secondaryCta: z
      .strictObject({
        label: labelSchema,
        href: z.union([internalHrefSchema, externalHrefSchema]),
      })
      .readonly(),
  })
  .readonly();

export const seoFieldsSchema: z.ZodType<SeoFields> = z
  .strictObject({
    title: z.string().trim().min(2).max(80),
    description: z.string().trim().min(40).max(180),
    canonicalPath: internalHrefSchema.optional(),
    socialImage: imageAssetSchema.optional(),
    noIndex: z.boolean().optional(),
  })
  .readonly();

export const siteMetadataSchema: z.ZodType<SiteMetadata> = z
  .strictObject({
    siteName: z.string().trim().min(2).max(80),
    shortName: z.string().trim().min(2).max(30),
    titleTemplate: z.string().trim().min(3).max(120),
    defaultTitle: z.string().trim().min(2).max(80),
    description: z.string().trim().min(40).max(180),
    siteUrl: absoluteUrlSchema,
    locale: z.literal("en"),
    authorName: z.string().trim().min(2).max(100),
    keywords: z.array(labelSchema).min(1).max(20).readonly(),
    defaultSocialImage: imageAssetSchema,
    socialLinks: socialLinksSchema,
  })
  .superRefine((metadata, context) => {
    if (new URL(metadata.siteUrl).origin !== metadata.siteUrl) {
      context.addIssue({
        code: "custom",
        path: ["siteUrl"],
        message: "must be a production origin without path, query, or fragment",
      });
    }

    if ((metadata.titleTemplate.match(/%s/g) ?? []).length !== 1) {
      context.addIssue({
        code: "custom",
        path: ["titleTemplate"],
        message: "must contain exactly one %s placeholder",
      });
    }

    if (metadata.defaultSocialImage.decorative === true) {
      context.addIssue({
        code: "custom",
        path: ["defaultSocialImage", "decorative"],
        message: "must not be true for the default social image",
      });
    }

    const keywordIndexes = new Map<string, number>();

    metadata.keywords.forEach((keyword, index) => {
      const normalized = keyword.toLocaleLowerCase("en");
      const firstIndex = keywordIndexes.get(normalized);

      if (firstIndex === undefined) {
        keywordIndexes.set(normalized, index);
        return;
      }

      context.addIssue({
        code: "custom",
        path: ["keywords", index],
        message: `must be unique; duplicates keyword at index ${firstIndex}`,
      });
    });
  })
  .readonly();
