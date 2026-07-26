"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { NavigationItem } from "@/types/navigation";

export interface MobileNavigationProps {
  readonly items: readonly NavigationItem[];
  readonly brandLabel: string;
}

type MenuPhase = "closed" | "opening" | "open" | "closing";

export function MobileNavigation({ items, brandLabel }: MobileNavigationProps) {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState<{
    readonly phase: MenuPhase;
    readonly pathname: string;
  }>({ phase: "closed", pathname });
  const phase =
    menuState.pathname === pathname ? menuState.phase : ("closed" as const);
  const open = phase === "opening" || phase === "open";
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openingFrameRef = useRef<number | null>(null);
  const visibleItems = items.filter((item) => item.showInHeader);

  const closeMenu = useCallback(() => {
    if (openingFrameRef.current !== null) {
      window.cancelAnimationFrame(openingFrameRef.current);
      openingFrameRef.current = null;
    }

    setMenuState({ phase: "closing", pathname });
  }, [pathname]);

  const openMenu = useCallback(() => {
    setMenuState({ phase: "opening", pathname });
    openingFrameRef.current = window.requestAnimationFrame(() => {
      openingFrameRef.current = null;
      setMenuState((current) =>
        current.pathname === pathname && current.phase === "opening"
          ? { phase: "open", pathname }
          : current,
      );
    });
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeMenu, open]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 48rem)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMenu();
      }
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, [closeMenu]);

  useEffect(
    () => () => {
      if (openingFrameRef.current !== null) {
        window.cancelAnimationFrame(openingFrameRef.current);
      }
    },
    [],
  );

  return (
    <div className="relative md:hidden">
      <Button
        ref={triggerRef}
        size="icon"
        variant="ghost"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? closeMenu() : openMenu())}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </Button>

      <div
        id={panelId}
        inert={!open}
        aria-hidden={!open}
        data-slot="mobile-navigation-panel"
        data-state={phase}
        className="pointer-events-none absolute end-0 top-[calc(100%+var(--space-2))] w-[calc(100vw-var(--space-8))] max-w-narrow translate-y-space-4 rounded-lg border border-border bg-surface-raised p-space-2 opacity-0 shadow-lg transition-[opacity,transform] data-[state=closed]:duration-[var(--motion-instant)] data-[state=closing]:translate-y-space-2 data-[state=closing]:duration-[var(--motion-fast)] data-[state=closing]:ease-[var(--ease-exit)] data-[state=open]:pointer-events-auto data-[state=open]:translate-y-0 data-[state=open]:opacity-100 data-[state=open]:duration-[var(--motion-base)] data-[state=open]:ease-[var(--ease-enter)] data-[state=opening]:pointer-events-auto data-[state=opening]:duration-[var(--motion-instant)] motion-reduce:transform-none motion-reduce:transition-none motion-reduce:data-[state=opening]:opacity-100"
      >
        <nav aria-label={`${brandLabel} mobile`}>
          <ul>
            {visibleItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center rounded-md px-space-4 text-body-md font-medium text-text-secondary transition-colors duration-[var(--motion-fast)] outline-none hover:bg-surface-hover hover:text-text focus-visible:bg-surface-hover focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset motion-reduce:transition-none"
                  onClick={closeMenu}
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
