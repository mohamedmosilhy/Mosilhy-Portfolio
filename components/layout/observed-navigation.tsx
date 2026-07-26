"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { NavigationLinks } from "@/components/layout/navigation-links";
import type { NavigationItem } from "@/types/navigation";

export interface ObservedNavigationProps {
  readonly items: readonly NavigationItem[];
  readonly currentPath?: string;
}

export function ObservedNavigation({
  items,
  currentPath,
}: ObservedNavigationProps) {
  const routerPath = usePathname();
  const pathname = currentPath ?? routerPath;
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const observableItems = useMemo(
    () =>
      items.filter((item) => item.showInHeader && item.sectionId !== undefined),
    [items],
  );

  useEffect(() => {
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") {
      return;
    }

    const targets = observableItems.flatMap((item) => {
      const target = document.getElementById(item.sectionId!);
      return target === null ? [] : [[item.sectionId!, target] as const];
    });

    if (targets.length === 0) {
      return;
    }

    const intersectionRatios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          intersectionRatios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        const nextActiveSection = targets.reduce<{
          readonly id: string | null;
          readonly ratio: number;
        }>(
          (current, [id]) => {
            const ratio = intersectionRatios.get(id) ?? 0;
            return ratio > current.ratio ? { id, ratio } : current;
          },
          { id: null, ratio: 0 },
        ).id;

        setActiveSectionId((current) =>
          current === nextActiveSection ? current : nextActiveSection,
        );
      },
      {
        rootMargin: "0px 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const [, target] of targets) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
      intersectionRatios.clear();
    };
  }, [observableItems, pathname]);

  return (
    <NavigationLinks
      items={items}
      variant="desktop"
      currentPath={pathname}
      activeSectionId={pathname === "/" ? activeSectionId : null}
    />
  );
}
