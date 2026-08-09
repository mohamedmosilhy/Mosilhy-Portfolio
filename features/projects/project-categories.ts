import type { ProjectCategory } from "@/types/content";

export const projectCategoryOrder = [
  "frontend-web",
  "backend-full-stack",
  "mobile-applications",
  "ai-data-scientific",
  "cs50-work",
] as const satisfies readonly ProjectCategory[];

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  "frontend-web": "Frontend Web",
  "backend-full-stack": "Backend & Full-stack",
  "mobile-applications": "Mobile Applications",
  "ai-data-scientific": "AI, Data & Scientific",
  "cs50-work": "CS50 Work",
};
