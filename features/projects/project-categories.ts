import type { ProjectCategory } from "@/types/content";

export const projectCategoryOrder = [
  "full-stack",
  "frontend",
  "backend",
  "mobile",
  "ai-data",
  "creative-coding",
] as const satisfies readonly ProjectCategory[];

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  "full-stack": "Full-stack",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  "ai-data": "AI & data",
  "creative-coding": "Creative coding",
};
