import type { ContentCatalogInput } from "@/lib/content/content-validation";
import type {
  ImageAsset,
  PageFrontmatter,
  Profile,
  ProjectFrontmatter,
  SiteMetadata,
  SkillGroup,
  SocialLink,
  Testimonial,
} from "@/types/content";
import type { NavigationItem } from "@/types/navigation";

export const validImage = {
  kind: "image",
  src: "/images/projects/messaging-app/cover.webp",
  alt: "Messaging application conversation view",
  width: 1_600,
  height: 1_000,
} as const satisfies ImageAsset;

export const validSocialLinks = [
  {
    id: "email",
    platform: "email",
    label: "Email",
    href: "mailto:developer@portfolio.dev",
    newTab: false,
    order: 1,
  },
  {
    id: "github",
    platform: "github",
    label: "GitHub",
    href: "https://github.com/portfolio-developer",
    newTab: true,
    order: 2,
  },
  {
    id: "linkedin",
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/portfolio-developer",
    newTab: true,
    order: 3,
  },
] as const satisfies readonly SocialLink[];

export const validNavigation = [
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
  {
    id: "uses",
    label: "Uses",
    href: "/uses",
    order: 5,
    showInHeader: false,
    showInFooter: true,
  },
] as const satisfies readonly NavigationItem[];

export const validSkillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Interface engineering and client-side application skills.",
    order: 1,
    skills: [
      {
        id: "next-js",
        name: "Next.js",
        category: "frontend",
        description: "Server-rendered React applications using App Router.",
        featured: true,
        order: 1,
      },
      {
        id: "typescript",
        name: "TypeScript",
        category: "frontend",
        featured: true,
        order: 2,
      },
    ],
  },
] as const satisfies readonly SkillGroup[];

export const validProfile = {
  greeting: "Hello, I am",
  name: "Portfolio Developer",
  role: "Full-stack software engineer",
  introduction:
    "I build thoughtful web products with reliable systems and accessible interfaces.",
  biography: [
    "I approach product work through clear architecture, careful implementation, and evidence-based iteration.",
  ],
  experience: [
    {
      id: "projects-built",
      label: "Projects built",
      value: "20+",
      order: 1,
    },
  ],
  interests: [
    {
      id: "product-engineering",
      label: "Product engineering",
      description: "Turning complex requirements into maintainable products.",
      order: 1,
    },
  ],
  location: "Cairo, Egypt",
  availability: "Available for selected engineering opportunities.",
  portrait: {
    kind: "image",
    src: "/images/profile/portrait.webp",
    alt: "Portrait of Portfolio Developer",
    width: 800,
    height: 1_000,
  },
  email: "mailto:developer@portfolio.dev",
  primaryCta: {
    label: "View projects",
    href: "/#projects",
  },
  secondaryCta: {
    label: "Get in touch",
    href: "/#contact",
  },
} as const satisfies Profile;

export const validProject = {
  slug: "messaging-app",
  title: "Messaging App",
  summary:
    "A full-stack messaging application with authenticated conversations and structured data flows.",
  role: "Full-stack developer",
  category: "full-stack",
  status: "published",
  featured: true,
  featuredOrder: 1,
  projectOrder: 1,
  timeline: {
    startedAt: "2025-01",
    completedAt: "2025-03",
    updatedAt: "2025-03-20",
  },
  technologies: ["next-js", "typescript"],
  links: {
    github: "https://github.com/portfolio-developer/messaging-app",
    live: "https://messaging.portfolio.dev",
  },
  cover: validImage,
  gallery: {
    layout: "stack",
    items: [
      validImage,
      {
        kind: "video",
        src: "/videos/projects/messaging-app/demo.webm",
        poster: validImage,
        title: "Messaging workflow demonstration",
      },
    ],
  },
  seo: {
    title: "Messaging App Engineering Case Study",
    description:
      "An engineering case study covering the architecture and implementation of a full-stack messaging application.",
    canonicalPath: "/projects/messaging-app",
  },
} as const satisfies ProjectFrontmatter;

export const validTestimonial = {
  id: "technical-lead",
  quote:
    "The implementation was carefully structured, clearly communicated, and delivered with strong attention to detail.",
  person: {
    name: "Test Collaborator",
    position: "Technical Lead",
    company: "Fixture Company",
    photo: {
      kind: "image",
      src: "/images/testimonials/technical-lead.webp",
      alt: "Test Collaborator, Technical Lead at Fixture Company",
      width: 400,
      height: 400,
    },
  },
  projectSlug: "messaging-app",
  featured: true,
  order: 1,
} as const satisfies Testimonial;

export const validPage = {
  id: "uses",
  path: "/uses",
  title: "Tools and workflow",
  summary:
    "A maintained overview of the tools, processes, and working principles used to build software.",
  status: "published",
  pageOrder: 1,
  publishedAt: "2025-03-01",
  updatedAt: "2025-03-20",
  seo: {
    title: "Tools and Engineering Workflow",
    description:
      "A practical overview of the tools, processes, and engineering principles used throughout product development.",
    canonicalPath: "/uses",
  },
} as const satisfies PageFrontmatter;

export const validSiteMetadata = {
  siteName: "Portfolio Developer",
  shortName: "Portfolio",
  titleTemplate: "%s | Portfolio Developer",
  defaultTitle: "Portfolio Developer — Full-stack Software Engineer",
  description:
    "The engineering portfolio of a full-stack software developer building reliable products and accessible interfaces.",
  siteUrl: "https://portfolio.dev",
  locale: "en",
  authorName: "Portfolio Developer",
  keywords: ["Software engineer", "Next.js", "TypeScript"],
  defaultSocialImage: {
    kind: "image",
    src: "/images/social/default-card.webp",
    alt: "Portfolio Developer engineering portfolio",
    width: 1_200,
    height: 630,
  },
  socialLinks: validSocialLinks,
} as const satisfies SiteMetadata;

export const invalidDecorativeImage = {
  ...validImage,
  alt: "This text should not be present",
  decorative: true,
} as const;

export const invalidEmailSocialLink = {
  ...validSocialLinks[0],
  newTab: true,
} as const;

export const invalidFeaturedProject = {
  ...validProject,
  status: "draft",
  featuredOrder: undefined,
} as const;

export function createValidCatalogInput(): ContentCatalogInput {
  return {
    profile: {
      source: "content/profile.ts",
      value: validProfile,
    },
    navigation: {
      source: "content/navigation.ts",
      value: validNavigation,
    },
    socialLinks: {
      source: "content/social-links.ts",
      value: validSocialLinks,
    },
    skillGroups: {
      source: "content/skills.ts",
      value: validSkillGroups,
    },
    testimonials: {
      source: "content/testimonials.ts",
      value: [validTestimonial],
    },
    siteMetadata: {
      source: "content/site-metadata.ts",
      value: validSiteMetadata,
    },
    pages: [
      {
        source: "content/pages/uses.mdx",
        filenameId: "uses",
        value: validPage,
      },
    ],
    projects: [
      {
        source: "content/projects/messaging-app.mdx",
        filenameSlug: "messaging-app",
        value: validProject,
      },
    ],
  };
}
