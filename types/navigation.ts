import type { InternalHref, Slug } from "@/types/content";

export type NavigationSectionId = "projects" | "skills" | "about" | "contact";

export interface NavigationItem {
  readonly id: Slug;
  readonly label: string;
  readonly href: InternalHref;
  readonly sectionId?: NavigationSectionId;
  readonly order: number;
  readonly showInHeader: boolean;
  readonly showInFooter: boolean;
}
