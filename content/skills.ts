import type { SkillGroup } from "@/types/content";

export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    description:
      "Frameworks and libraries used to build browser interfaces and interactions.",
    order: 1,
    skills: [
      {
        id: "react",
        name: "React",
        category: "frontend",
        featured: true,
        order: 1,
      },
      {
        id: "next-js",
        name: "Next.js",
        category: "frontend",
        featured: true,
        order: 2,
      },
      {
        id: "typescript",
        name: "TypeScript",
        category: "frontend",
        featured: true,
        order: 3,
      },
      {
        id: "tailwind-css",
        name: "Tailwind CSS",
        category: "frontend",
        featured: true,
        order: 4,
      },
      {
        id: "zustand",
        name: "Zustand",
        category: "frontend",
        featured: false,
        order: 5,
      },
      {
        id: "tanstack-query",
        name: "TanStack Query",
        category: "frontend",
        featured: false,
        order: 6,
      },
      {
        id: "gsap",
        name: "GSAP",
        category: "frontend",
        featured: true,
        order: 7,
      },
      {
        id: "scrolltrigger",
        name: "GSAP ScrollTrigger",
        category: "frontend",
        featured: false,
        order: 8,
      },
      {
        id: "splittext",
        name: "GSAP SplitText",
        category: "frontend",
        featured: false,
        order: 9,
      },
      {
        id: "three-js",
        name: "Three.js",
        category: "frontend",
        featured: true,
        order: 10,
      },
      {
        id: "react-three-fiber",
        name: "React Three Fiber",
        category: "frontend",
        featured: false,
        order: 11,
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description:
      "Server-side application and data-access technologies used by the selected projects.",
    order: 2,
    skills: [
      {
        id: "next-js-server-actions",
        name: "Next.js Server Actions",
        category: "backend",
        featured: true,
        order: 1,
      },
      {
        id: "prisma",
        name: "Prisma",
        category: "backend",
        featured: true,
        order: 2,
      },
      {
        id: "auth-js",
        name: "Auth.js",
        category: "backend",
        featured: true,
        order: 3,
      },
    ],
  },
  {
    id: "database",
    label: "Database",
    description:
      "Relational data systems represented in the selected case studies.",
    order: 3,
    skills: [
      {
        id: "postgresql",
        name: "PostgreSQL",
        category: "database",
        featured: true,
        order: 1,
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    description:
      "Build, deployment, and monitoring tools used by the selected projects.",
    order: 4,
    skills: [
      {
        id: "vite",
        name: "Vite",
        category: "tools",
        featured: true,
        order: 1,
      },
      {
        id: "sentry",
        name: "Sentry",
        category: "tools",
        featured: false,
        order: 2,
      },
      {
        id: "zod",
        name: "Zod",
        category: "tools",
        featured: true,
        order: 3,
      },
      {
        id: "vitest",
        name: "Vitest",
        category: "tools",
        featured: true,
        order: 4,
      },
      {
        id: "playwright",
        name: "Playwright",
        category: "tools",
        featured: true,
        order: 5,
      },
    ],
  },
] as const satisfies readonly SkillGroup[];
