import { Tag } from "@/components/ui/tag";
import type { Skill, SkillCategory } from "@/types/content";

const categoryOrder: readonly SkillCategory[] = [
  "frontend",
  "backend",
  "database",
  "mobile",
  "ai-data",
  "creative-coding",
  "tools",
];

const categoryLabels: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  mobile: "Mobile",
  "ai-data": "AI, data & scientific",
  "creative-coding": "Creative coding",
  tools: "Tools",
};

export interface ProjectTechnologiesProps {
  readonly skills: readonly Skill[];
  readonly variant?: "list" | "grouped";
}

function TechnologyList({ skills }: { readonly skills: readonly Skill[] }) {
  return (
    <div role="list" className="flex flex-wrap gap-space-2">
      {skills.map((skill) => (
        <span key={skill.id} role="listitem">
          <Tag variant="outline" size="md">
            {skill.name}
          </Tag>
        </span>
      ))}
    </div>
  );
}

export function ProjectTechnologies({
  skills,
  variant = "list",
}: ProjectTechnologiesProps) {
  return (
    <section
      aria-labelledby="project-technologies-heading"
      data-slot="project-technologies"
      data-variant={variant}
      className="rounded-lg border border-border bg-surface p-space-6 lg:p-space-8"
    >
      <h3
        id="project-technologies-heading"
        className="text-heading-md font-semibold text-text"
      >
        Technologies
      </h3>

      {variant === "list" ? (
        <div className="mt-space-6">
          <TechnologyList skills={skills} />
        </div>
      ) : (
        <div className="mt-space-8 grid gap-space-8 sm:grid-cols-2">
          {categoryOrder.map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category,
            );

            return categorySkills.length > 0 ? (
              <div key={category}>
                <h4 className="text-heading-sm font-semibold text-text">
                  {categoryLabels[category]}
                </h4>
                <div className="mt-space-4">
                  <TechnologyList skills={categorySkills} />
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}
    </section>
  );
}
