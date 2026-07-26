import { cn } from "@/lib/utils/cn";

const variants = {
  subtle: "bg-border",
  strong: "bg-border-strong",
  accent: "bg-accent",
} as const;

export interface DividerProps {
  readonly orientation?: "horizontal" | "vertical";
  readonly variant?: keyof typeof variants;
  readonly decorative?: boolean;
}

export function Divider({
  orientation = "horizontal",
  variant = "subtle",
  decorative = true,
}: DividerProps) {
  return (
    <div
      role={decorative ? undefined : "separator"}
      aria-hidden={decorative || undefined}
      aria-orientation={decorative ? undefined : orientation}
      data-slot="divider"
      data-orientation={orientation}
      data-variant={variant}
      className={cn(
        "shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full min-h-6 w-px",
        variants[variant],
      )}
    />
  );
}
