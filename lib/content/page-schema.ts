import { z } from "zod";

import {
  internalHrefSchema,
  isoDateSchema,
  seoFieldsSchema,
  slugSchema,
} from "@/lib/content/content-schemas";
import type { PageFrontmatter } from "@/types/content";

export const pageFrontmatterSchema: z.ZodType<PageFrontmatter> = z
  .strictObject({
    id: slugSchema,
    path: internalHrefSchema.refine(
      (value) =>
        !value.includes("#") &&
        !value.includes("?") &&
        (value === "/" || !value.endsWith("/")),
      "must be a canonical page path without query, fragment, or trailing slash",
    ),
    title: z.string().trim().min(2).max(80),
    summary: z.string().trim().min(40).max(180),
    status: z.enum(["draft", "published"]),
    pageOrder: z.number().int().positive().optional(),
    publishedAt: isoDateSchema.optional(),
    updatedAt: isoDateSchema,
    seo: seoFieldsSchema,
  })
  .superRefine((page, context) => {
    if (page.status === "published" && page.publishedAt === undefined) {
      context.addIssue({
        code: "custom",
        path: ["publishedAt"],
        message: "is required for a published page",
      });
    }

    if (
      page.publishedAt !== undefined &&
      Date.parse(page.updatedAt) < Date.parse(page.publishedAt)
    ) {
      context.addIssue({
        code: "custom",
        path: ["updatedAt"],
        message: "must not be earlier than publishedAt",
      });
    }

    if (
      page.seo.canonicalPath !== undefined &&
      page.seo.canonicalPath !== page.path
    ) {
      context.addIssue({
        code: "custom",
        path: ["seo", "canonicalPath"],
        message: "must match the page path",
      });
    }

    if (page.status === "published" && page.seo.noIndex === true) {
      context.addIssue({
        code: "custom",
        path: ["seo", "noIndex"],
        message: "must not be true for a published page",
      });
    }
  })
  .readonly();
