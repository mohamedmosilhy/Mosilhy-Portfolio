"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import type { MediaAsset } from "@/types/content";

export interface ProjectCarouselProps {
  readonly items: readonly MediaAsset[];
  readonly projectTitle: string;
}

export function ProjectCarousel({ items, projectTitle }: ProjectCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  function moveTo(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), items.length - 1);
    const viewport = viewportRef.current;

    setCurrentIndex(nextIndex);
    viewport?.scrollTo({
      left: nextIndex * viewport.clientWidth,
    });
  }

  return (
    <div data-slot="project-carousel">
      <div
        ref={viewportRef}
        role="region"
        aria-label={`${projectTitle} gallery carousel`}
        aria-roledescription="carousel"
        tabIndex={0}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:scroll-auto"
      >
        {items.map((item, index) => (
          <div
            key={item.src}
            role="group"
            aria-label={`${index + 1} of ${items.length}`}
            aria-roledescription="slide"
            className="w-full shrink-0 snap-start"
          >
            <MediaFrame
              asset={item}
              sizes="(min-width: 1024px) 65rem, 100vw"
              variant="browser"
              radius="xl"
            />
          </div>
        ))}
      </div>

      <div className="mt-space-4 flex justify-end gap-space-2">
        <Button
          size="icon"
          variant="secondary"
          aria-label={`Show previous ${projectTitle} gallery item`}
          disabled={currentIndex === 0}
          onClick={() => moveTo(currentIndex - 1)}
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          aria-label={`Show next ${projectTitle} gallery item`}
          disabled={currentIndex === items.length - 1}
          onClick={() => moveTo(currentIndex + 1)}
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
