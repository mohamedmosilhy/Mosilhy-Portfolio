import type { SocialLink } from "@/types/content";

export const socialLinks = [
  {
    id: "email",
    platform: "email",
    label: "Email",
    href: "mailto:mmosilhyofficial@gmail.com",
    newTab: false,
    order: 1,
  },
  {
    id: "github",
    platform: "github",
    label: "GitHub",
    href: "https://github.com/mohamedmosilhy",
    newTab: true,
    order: 2,
  },
  {
    id: "linkedin",
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-mosilhy",
    newTab: true,
    order: 3,
  },
] as const satisfies readonly SocialLink[];
