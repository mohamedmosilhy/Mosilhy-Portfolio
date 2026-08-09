import { z } from "zod";

import {
  absoluteUrlSchema,
  imageAssetSchema,
  isoDateSchema,
  mediaAssetSchema,
  seoFieldsSchema,
  slugSchema,
} from "@/lib/content/content-schemas";
import type {
  ProjectFrontmatter,
  ProjectGallery,
  ProjectLinks,
  ProjectTimeline,
} from "@/types/content";

const positiveOrderSchema = z.number().int().positive();

export const projectLinksSchema: z.ZodType<ProjectLinks> = z
  .strictObject({
    github: absoluteUrlSchema,
    live: absoluteUrlSchema.optional(),
    video: absoluteUrlSchema.optional(),
    paper: absoluteUrlSchema.optional(),
  })
  .readonly();

export const projectTimelineSchema: z.ZodType<ProjectTimeline> = z
  .strictObject({
    startedAt: isoDateSchema,
    completedAt: isoDateSchema.optional(),
    updatedAt: isoDateSchema,
  })
  .superRefine((timeline, context) => {
    const startedAt = Date.parse(timeline.startedAt);
    const completedAt =
      timeline.completedAt === undefined
        ? undefined
        : Date.parse(timeline.completedAt);
    const updatedAt = Date.parse(timeline.updatedAt);

    if (completedAt !== undefined && completedAt < startedAt) {
      context.addIssue({
        code: "custom",
        path: ["completedAt"],
        message: "must not be earlier than startedAt",
      });
    }

    if (completedAt !== undefined && updatedAt < completedAt) {
      context.addIssue({
        code: "custom",
        path: ["updatedAt"],
        message: "must not be earlier than completedAt",
      });
    }

    if (completedAt === undefined && updatedAt < startedAt) {
      context.addIssue({
        code: "custom",
        path: ["updatedAt"],
        message: "must not be earlier than startedAt",
      });
    }
  })
  .readonly();

export const projectGallerySchema: z.ZodType<ProjectGallery> = z
  .strictObject({
    layout: z.enum(["stack", "grid", "carousel"]),
    items: z.array(mediaAssetSchema).readonly(),
  })
  .readonly();

export const projectFrontmatterSchema: z.ZodType<ProjectFrontmatter> = z
  .strictObject({
    slug: slugSchema,
    title: z.string().trim().min(2).max(80),
    summary: z.string().trim().min(40).max(180),
    role: z.string().trim().min(2).max(80),
    category: z.enum([
      "frontend-web",
      "backend-full-stack",
      "mobile-applications",
      "ai-data-scientific",
      "cs50-work",
    ]),
    status: z.enum(["draft", "published"]),
    featured: z.boolean(),
    featuredOrder: positiveOrderSchema.optional(),
    projectOrder: positiveOrderSchema,
    timeline: projectTimelineSchema,
    technologies: z
      .array(slugSchema)
      .min(1)
      .superRefine((technologies, context) => {
        const firstIndexes = new Map<string, number>();

        technologies.forEach((technology, index) => {
          const firstIndex = firstIndexes.get(technology);

          if (firstIndex === undefined) {
            firstIndexes.set(technology, index);
            return;
          }

          context.addIssue({
            code: "custom",
            path: [index],
            message: `must be unique; duplicates technology at index ${firstIndex}`,
          });
        });
      })
      .readonly(),
    links: projectLinksSchema,
    cover: imageAssetSchema.optional(),
    gallery: projectGallerySchema,
    seo: seoFieldsSchema,
  })
  .superRefine((project, context) => {
    if (project.featured && project.status !== "published") {
      context.addIssue({
        code: "custom",
        path: ["featured"],
        message: "can be true only for a published project",
      });
    }

    if (project.featured && project.featuredOrder === undefined) {
      context.addIssue({
        code: "custom",
        path: ["featuredOrder"],
        message: "is required when the project is featured",
      });
    }

    if (!project.featured && project.featuredOrder !== undefined) {
      context.addIssue({
        code: "custom",
        path: ["featuredOrder"],
        message: "must be omitted when the project is not featured",
      });
    }

    if (project.status === "published" && project.seo.noIndex === true) {
      context.addIssue({
        code: "custom",
        path: ["seo", "noIndex"],
        message: "must not be true for a published project",
      });
    }

    const expectedCanonicalPath = `/projects/${project.slug}`;

    if (
      project.seo.canonicalPath !== undefined &&
      project.seo.canonicalPath !== expectedCanonicalPath
    ) {
      context.addIssue({
        code: "custom",
        path: ["seo", "canonicalPath"],
        message: `must equal "${expectedCanonicalPath}"`,
      });
    }

    if (project.cover?.decorative === true) {
      context.addIssue({
        code: "custom",
        path: ["cover", "decorative"],
        message: "must not be true for a project cover",
      });
    }
  })
  .readonly();
