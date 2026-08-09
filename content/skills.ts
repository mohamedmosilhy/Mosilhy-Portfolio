import type { Skill, SkillCategory, SkillGroup } from "@/types/content";

type SkillEntry = readonly [id: string, name: string, featured?: boolean];

function createSkills(
  category: SkillCategory,
  entries: readonly SkillEntry[],
): readonly Skill[] {
  return entries.map(([id, name, featured = false], index) => ({
    id,
    name,
    category,
    featured,
    order: index + 1,
  }));
}

export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend engineering",
    description:
      "Accessible interfaces, application state, motion systems, and interactive 3D experiences.",
    order: 1,
    skills: createSkills("frontend", [
      ["html", "HTML"],
      ["css", "CSS"],
      ["javascript", "JavaScript", true],
      ["typescript", "TypeScript", true],
      ["react", "React", true],
      ["next-js", "Next.js", true],
      ["tailwind-css", "Tailwind CSS", true],
      ["zustand", "Zustand"],
      ["tanstack-query", "TanStack Query"],
      ["gsap", "GSAP", true],
      ["scrolltrigger", "ScrollTrigger"],
      ["splittext", "SplitText"],
      ["three-js", "Three.js", true],
      ["react-three-fiber", "React Three Fiber"],
      ["responsive-design", "Responsive design", true],
    ]),
  },
  {
    id: "backend",
    label: "Backend & architecture",
    description:
      "Secure APIs, modular services, authentication, validation, and server-owned business logic.",
    order: 2,
    skills: createSkills("backend", [
      ["node-js", "Node.js", true],
      ["express", "Express", true],
      ["next-js-server-actions", "Next.js Server Actions", true],
      ["rest-api-design", "REST API design", true],
      ["prisma", "Prisma", true],
      ["auth-js", "Auth.js"],
      ["passport", "Passport.js"],
      ["authentication-authorization", "Authentication & authorization", true],
    ]),
  },
  {
    id: "database",
    label: "Data & cloud",
    description:
      "Relational modeling, managed backends, cloud storage, and offline persistence.",
    order: 3,
    skills: createSkills("database", [
      ["postgresql", "PostgreSQL", true],
      ["sql", "SQL", true],
      ["sqlite", "SQLite"],
      ["supabase", "Supabase", true],
      ["firebase", "Firebase / Firestore", true],
      ["hive", "Hive offline storage"],
    ]),
  },
  {
    id: "mobile",
    label: "Mobile development",
    description:
      "Cross-platform Flutter applications with layered state, cloud services, and offline behavior.",
    order: 4,
    skills: createSkills("mobile", [
      ["flutter", "Flutter", true],
      ["dart", "Dart", true],
      ["bloc", "Bloc / Cubit", true],
      ["clean-architecture", "Clean Architecture", true],
      ["dependency-injection", "Dependency injection"],
      ["offline-first", "Offline-first applications"],
    ]),
  },
  {
    id: "ai-data",
    label: "AI & scientific computing",
    description:
      "Machine learning, computer vision, biomedical imaging, signal processing, and scientific visualization.",
    order: 5,
    skills: createSkills("ai-data", [
      ["python", "Python", true],
      ["pytorch", "PyTorch", true],
      ["scikit-learn", "scikit-learn", true],
      ["transformers", "Transformers / BLIP"],
      ["opencv", "OpenCV", true],
      ["pandas", "Pandas"],
      ["numpy", "NumPy", true],
      ["scipy", "SciPy"],
      ["jupyter", "Jupyter"],
      ["pyqt", "PyQt / PyQtGraph", true],
      ["computer-vision", "Computer vision", true],
      ["digital-signal-processing", "Digital signal processing", true],
    ]),
  },
  {
    id: "creative-coding",
    label: "Creative coding & games",
    description:
      "Real-time game loops, collision systems, low-level coursework, and interactive visual experiments.",
    order: 6,
    skills: createSkills("creative-coding", [
      ["c", "C"],
      ["lua", "Lua", true],
      ["love2d", "LÖVE2D", true],
      ["webgl", "WebGL"],
      ["game-state-architecture", "Game-state architecture"],
    ]),
  },
  {
    id: "tools",
    label: "Quality & delivery",
    description:
      "Testing, validation, monitoring, build tooling, version control, and production delivery.",
    order: 7,
    skills: createSkills("tools", [
      ["git", "Git", true],
      ["vite", "Vite", true],
      ["webpack", "Webpack"],
      ["jest", "Jest"],
      ["vitest", "Vitest", true],
      ["playwright", "Playwright", true],
      ["sentry", "Sentry"],
      ["zod", "Zod", true],
      ["accessibility-testing", "Accessibility testing", true],
      ["vercel", "Vercel"],
    ]),
  },
] as const satisfies readonly SkillGroup[];
