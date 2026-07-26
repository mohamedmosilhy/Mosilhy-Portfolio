"use client";

import { useEffect, useRef } from "react";

export interface HeaderScrollObserverProps {
  readonly headerId: string;
}

export function HeaderScrollObserver({ headerId }: HeaderScrollObserverProps) {
  const sentinelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const header = document.getElementById(headerId);

    if (
      sentinel === null ||
      header === null ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry !== undefined) {
          header.dataset.scrolled = String(!entry.isIntersecting);
        }
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [headerId]);

  return (
    <span
      ref={sentinelRef}
      aria-hidden="true"
      data-slot="header-scroll-sentinel"
      className="pointer-events-none absolute top-0 h-px w-px"
    />
  );
}
