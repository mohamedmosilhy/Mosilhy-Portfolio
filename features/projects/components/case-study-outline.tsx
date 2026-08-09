const caseStudySections = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "architecture", label: "Architecture" },
  { id: "challenges", label: "Challenges" },
  { id: "lessons-learned", label: "Lessons learned" },
] as const;

export function CaseStudyOutline() {
  return (
    <aside className="lg:col-span-3">
      <div className="lg:sticky lg:top-32">
        <p className="font-sans text-eyebrow font-semibold tracking-[var(--eyebrow-tracking)] text-accent uppercase">
          Reading path
        </p>
        <nav aria-label="Case study outline" className="mt-space-5">
          <ol className="grid grid-cols-2 gap-x-space-4 gap-y-space-2 sm:grid-cols-3 lg:grid-cols-1">
            {caseStudySections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex min-h-10 items-center gap-space-3 rounded-md text-body-sm text-text-muted transition-colors outline-none hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none"
                >
                  <span
                    aria-hidden="true"
                    className="font-sans text-eyebrow font-semibold text-text-muted group-hover:text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{section.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
