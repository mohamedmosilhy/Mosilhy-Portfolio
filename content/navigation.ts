import type { NavigationItem } from "@/types/navigation";

export const navigation = [
  {
    id: "projects",
    label: "Projects",
    href: "/#projects",
    sectionId: "projects",
    order: 1,
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: "skills",
    label: "Skills",
    href: "/#skills",
    sectionId: "skills",
    order: 2,
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: "about",
    label: "About",
    href: "/#about",
    sectionId: "about",
    order: 3,
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: "contact",
    label: "Contact",
    href: "/#contact",
    sectionId: "contact",
    order: 4,
    showInHeader: true,
    showInFooter: true,
  },
] as const satisfies readonly NavigationItem[];
