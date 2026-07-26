import type { Testimonial } from "@/types/content";

/**
 * No repository-backed testimonials were found during the project audit.
 * Keep this collection empty until a quote and attribution are verified.
 */
export const testimonials = [] as const satisfies readonly Testimonial[];
