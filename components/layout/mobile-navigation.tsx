"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { NavigationItem } from "@/types/navigation";

export interface MobileNavigationProps {
  readonly items: readonly NavigationItem[];
  readonly brandLabel: string;
}

export function MobileNavigation({ items, brandLabel }: MobileNavigationProps) {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState({ open: false, pathname });
  const open = menuState.pathname === pathname && menuState.open;
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const visibleItems = items.filter((item) => item.showInHeader);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuState({ open: false, pathname });
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, pathname]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 48rem)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuState({ open: false, pathname });
      }
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, [pathname]);

  return (
    <div className="relative md:hidden">
      <Button
        ref={triggerRef}
        size="icon"
        variant="ghost"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setMenuState({ open: !open, pathname })}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </Button>

      <div
        id={panelId}
        hidden={!open}
        data-slot="mobile-navigation-panel"
        className="absolute end-0 top-[calc(100%+var(--space-2))] w-[calc(100vw-var(--space-8))] max-w-narrow rounded-lg border border-border bg-surface-raised p-space-2 shadow-lg"
      >
        <nav aria-label={`${brandLabel} mobile`}>
          <ul>
            {visibleItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center rounded-md px-space-4 text-body-md font-medium text-text-secondary outline-none hover:bg-surface-hover hover:text-text focus-visible:bg-surface-hover focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset motion-reduce:transition-none"
                  onClick={() => setMenuState({ open: false, pathname })}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
