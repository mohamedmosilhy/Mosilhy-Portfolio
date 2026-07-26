import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const mergeClasses = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "canvas",
        "surface",
        "surface-raised",
        "surface-hover",
        "surface-inverse",
        "text",
        "text-secondary",
        "text-muted",
        "text-subtle",
        "text-disabled",
        "accent",
        "accent-hover",
        "accent-muted",
        "border",
        "border-strong",
        "focus",
        "success",
        "warning",
        "danger",
      ],
      text: [
        "display-xl",
        "display-lg",
        "heading-xl",
        "heading-lg",
        "heading-md",
        "heading-sm",
        "body-lg",
        "body-md",
        "body-sm",
        "label",
        "eyebrow",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return mergeClasses(clsx(inputs));
}
