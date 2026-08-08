import { cn } from "@/lib/utils/cn";

export interface BrandMarkProps {
  readonly className?: string;
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      data-slot="brand-mark"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-md border border-accent/35 bg-accent-subtle text-accent shadow-accent",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="size-7"
        aria-hidden="true"
      >
        <path
          d="M6.5 23V9.5L16 20l9.5-10.5V23"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 23h12"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
