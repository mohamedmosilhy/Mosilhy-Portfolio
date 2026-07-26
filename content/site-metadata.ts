import { socialLinks } from "@/content/social-links";
import type { SiteMetadata } from "@/types/content";

export const siteMetadata = {
  siteName: "Mohamed Mosilhy",
  shortName: "Mosilhy",
  titleTemplate: "%s | Mohamed Mosilhy",
  defaultTitle: "Mohamed Mosilhy — Full-stack Developer",
  description:
    "The portfolio of Mohamed Mosilhy, a full-stack developer working across web applications, interactive graphics, and scientific computing.",
  siteUrl: "https://mohamedmosilhy.github.io",
  locale: "en",
  authorName: "Mohamed Mosilhy",
  keywords: [
    "Full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Three.js",
  ],
  defaultSocialImage: {
    kind: "image",
    src: "/images/profile/mohamed-mosilhy.jpg",
    alt: "Portrait of Mohamed Mosilhy",
    width: 320,
    height: 320,
  },
  socialLinks,
} as const satisfies SiteMetadata;
