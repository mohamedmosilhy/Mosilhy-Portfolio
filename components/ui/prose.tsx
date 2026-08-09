import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const proseVariants = cva(
  "max-w-prose text-body-md text-text-secondary [&_a]:rounded-sm [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:decoration-border-strong [&_a]:underline-offset-4 [&_a]:outline-none [&_a]:transition-colors [&_a]:duration-[var(--motion-fast)] [&_a:focus-visible]:ring-2 [&_a:focus-visible]:ring-accent [&_a:focus-visible]:ring-offset-2 [&_a:focus-visible]:ring-offset-canvas [&_a:hover]:text-accent-hover [&_a:visited]:text-accent-hover [&_blockquote]:border-s-2 [&_blockquote]:border-accent [&_blockquote]:ps-space-6 [&_blockquote]:text-body-lg [&_blockquote]:text-text [&_code]:rounded-sm [&_code]:bg-surface-raised [&_code]:px-space-1 [&_code]:py-space-1 [&_code]:font-mono [&_code]:text-body-sm [&_code]:text-text [&_h2]:font-display [&_h2]:text-heading-lg [&_h2]:font-semibold [&_h2]:text-text [&_h3]:font-display [&_h3]:text-heading-md [&_h3]:font-semibold [&_h3]:text-text [&_h4]:font-display [&_h4]:text-heading-sm [&_h4]:font-semibold [&_h4]:text-text [&_li]:ps-space-1 [&_ol]:list-decimal [&_ol]:ps-space-6 [&_p]:text-pretty [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface [&_pre]:p-space-5 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_strong]:text-text [&_ul]:list-disc [&_ul]:ps-space-6 motion-reduce:[&_a]:transition-none",
  {
    variants: {
      variant: {
        default:
          "[&>*+*]:mt-space-6 [&_h2]:mt-space-16 [&_h3]:mt-space-10 [&_h4]:mt-space-8",
        compact:
          "text-body-sm [&>*+*]:mt-space-4 [&_h2]:mt-space-10 [&_h3]:mt-space-8 [&_h4]:mt-space-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ProseProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof proseVariants> {}

export function Prose({ children, className, variant, ...props }: ProseProps) {
  return (
    <div
      {...props}
      data-slot="prose"
      data-variant={variant ?? "default"}
      className={cn(proseVariants({ variant }), className)}
    >
      {children}
    </div>
  );
}
