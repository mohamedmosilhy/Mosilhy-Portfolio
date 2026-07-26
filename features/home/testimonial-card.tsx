import Image from "next/image";

import { cn } from "@/lib/utils/cn";
import type { Testimonial } from "@/types/content";

const variants = {
  surface: "rounded-lg border border-border bg-surface p-space-6 lg:p-space-8",
  editorial: "border-t border-border pt-space-6",
} as const;

export interface TestimonialCardProps {
  readonly testimonial: Testimonial;
  readonly variant?: keyof typeof variants;
}

export function TestimonialCard({
  testimonial,
  variant = "surface",
}: TestimonialCardProps) {
  return (
    <article
      data-slot="testimonial-card"
      data-variant={variant}
      className={cn(variants[variant])}
    >
      <blockquote>
        <p className="font-display text-heading-md font-medium text-pretty text-text">
          “{testimonial.quote}”
        </p>
        <footer className="mt-space-8 flex items-center gap-space-4">
          <Image
            src={testimonial.person.photo.src}
            alt={testimonial.person.photo.alt}
            width={testimonial.person.photo.width}
            height={testimonial.person.photo.height}
            sizes="48px"
            className="size-12 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 text-body-sm">
            <cite className="font-semibold text-text not-italic">
              {testimonial.person.name}
            </cite>
            <p className="mt-space-1 text-text-muted">
              {testimonial.person.position}, {testimonial.person.company}
            </p>
          </div>
        </footer>
      </blockquote>
    </article>
  );
}
