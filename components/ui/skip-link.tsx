export interface SkipLinkProps {
  readonly targetId: string;
  readonly label?: string;
}

export function SkipLink({
  targetId,
  label = "Skip to main content",
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="fixed start-space-4 top-space-4 z-[var(--layer-skip-link)] -translate-y-[calc(100%+var(--space-4))] rounded-md border border-border-strong bg-surface-raised px-space-4 py-space-3 font-medium text-text opacity-0 shadow-lg transition-[opacity,transform] duration-[var(--motion-fast)] ease-[var(--ease-enter)] outline-none focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none"
    >
      {label}
    </a>
  );
}
