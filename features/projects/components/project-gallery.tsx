import { MediaFrame } from "@/components/ui/media-frame";
import { ProjectCarousel } from "@/features/projects/components/project-carousel";
import { cn } from "@/lib/utils/cn";
import type { GalleryLayout, MediaAsset } from "@/types/content";

export interface ProjectGalleryProps {
  readonly items: readonly MediaAsset[];
  readonly projectTitle: string;
  readonly variant?: GalleryLayout;
}

export function ProjectGallery({
  items,
  projectTitle,
  variant = "stack",
}: ProjectGalleryProps) {
  if (variant === "carousel") {
    return <ProjectCarousel items={items} projectTitle={projectTitle} />;
  }

  return (
    <section
      aria-label={`${projectTitle} gallery`}
      data-slot="project-gallery"
      data-variant={variant}
    >
      <div
        className={cn(
          "grid gap-space-8",
          variant === "grid" && "md:grid-cols-2",
        )}
      >
        {items.map((item) => (
          <MediaFrame
            key={item.src}
            asset={item}
            sizes={
              variant === "grid"
                ? "(min-width: 768px) 32rem, 100vw"
                : "(min-width: 1024px) 65rem, 100vw"
            }
            variant="browser"
            radius="xl"
          />
        ))}
      </div>
    </section>
  );
}
