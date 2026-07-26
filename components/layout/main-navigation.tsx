import { NavigationLinks } from "@/components/layout/navigation-links";
import { ObservedNavigation } from "@/components/layout/observed-navigation";
import type { NavigationItem } from "@/types/navigation";

export interface MainNavigationProps {
  readonly items: readonly NavigationItem[];
  readonly currentPath?: string;
  readonly observeSections?: boolean;
  readonly variant?: "desktop" | "footer";
}

export function MainNavigation({
  items,
  currentPath,
  observeSections = false,
  variant = "desktop",
}: MainNavigationProps) {
  if (variant === "desktop" && observeSections) {
    return <ObservedNavigation items={items} currentPath={currentPath} />;
  }

  return (
    <NavigationLinks
      items={items}
      variant={variant}
      currentPath={currentPath}
    />
  );
}
