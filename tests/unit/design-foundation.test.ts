import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { motionTokens } from "@/components/motion/motion-tokens";

const globalsSource = readFileSync(
  resolve(process.cwd(), "app/globals.css"),
  "utf8",
);
const layoutSource = readFileSync(
  resolve(process.cwd(), "app/layout.tsx"),
  "utf8",
);

function readCustomProperties(source: string) {
  return new Map(
    [...source.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(
      ([, name, value]) => [name, value.trim()] as const,
    ),
  );
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");

  return [0, 2, 4].map((offset) =>
    Number.parseInt(normalized.slice(offset, offset + 2), 16),
  ) as [number, number, number];
}

function relativeLuminance(hex: string) {
  const [red, green, blue] = hexToRgb(hex).map((channel) => {
    const normalized = channel / 255;

    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  const darker = Math.min(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );

  return (lighter + 0.05) / (darker + 0.05);
}

const properties = readCustomProperties(globalsSource);

describe("design system foundation", () => {
  it("opts Next.js route transitions into the documented smooth-scroll override", () => {
    expect(layoutSource).toContain('data-scroll-behavior="smooth"');
  });

  it("encodes the documented primitive and semantic colors", () => {
    expect(Object.fromEntries(properties)).toMatchObject({
      "--neutral-950": "#080a0f",
      "--neutral-900": "#0e1118",
      "--neutral-850": "#141925",
      "--neutral-800": "#1c2330",
      "--neutral-700": "#2a3444",
      "--neutral-500": "#687386",
      "--neutral-400": "#929cae",
      "--neutral-200": "#d8dee8",
      "--neutral-50": "#f7f9fc",
      "--indigo-400": "#8b9cff",
      "--indigo-300": "#a8b4ff",
      "--indigo-950": "#141936",
      "--teal-400": "#5eead4",
      "--amber-400": "#f8c56a",
      "--rose-400": "#ff8096",
      "--color-canvas": "var(--neutral-950)",
      "--color-surface": "var(--neutral-900)",
      "--color-surface-raised": "var(--neutral-850)",
      "--color-surface-hover": "var(--neutral-800)",
      "--color-border": "rgb(255 255 255 / 10%)",
      "--color-border-strong": "var(--neutral-700)",
      "--color-text": "var(--neutral-50)",
      "--color-text-secondary": "var(--neutral-200)",
      "--color-text-muted": "var(--neutral-400)",
      "--color-text-disabled": "var(--neutral-500)",
      "--color-accent": "var(--indigo-400)",
      "--color-accent-hover": "var(--indigo-300)",
      "--color-accent-subtle": "var(--indigo-950)",
      "--color-success": "var(--teal-400)",
      "--color-warning": "var(--amber-400)",
      "--color-danger": "var(--rose-400)",
    });
  });

  it("encodes the documented type, spacing, shape, depth, and layout scales", () => {
    expect(Object.fromEntries(properties)).toMatchObject({
      "--display-xl": "clamp(3.5rem, 9vw, 7rem)",
      "--display-xl-line-height": "0.92",
      "--display-xl-tracking": "-0.045em",
      "--display-lg": "clamp(2.75rem, 7vw, 5rem)",
      "--display-lg-line-height": "0.98",
      "--display-lg-tracking": "-0.04em",
      "--heading-xl": "clamp(2.25rem, 5vw, 4rem)",
      "--heading-xl-line-height": "1.02",
      "--heading-xl-tracking": "-0.035em",
      "--heading-lg": "clamp(1.625rem, 3vw, 2.25rem)",
      "--heading-lg-line-height": "1.15",
      "--heading-lg-tracking": "-0.025em",
      "--heading-md": "1.5rem",
      "--heading-md-line-height": "1.25",
      "--heading-md-tracking": "-0.02em",
      "--heading-sm": "1.125rem",
      "--heading-sm-line-height": "1.35",
      "--heading-sm-tracking": "-0.01em",
      "--body-lg": "1.125rem",
      "--body-lg-line-height": "1.7",
      "--body-lg-tracking": "0",
      "--body-md": "1rem",
      "--body-md-line-height": "1.7",
      "--body-md-tracking": "0",
      "--body-sm": "0.875rem",
      "--body-sm-line-height": "1.6",
      "--body-sm-tracking": "0",
      "--label": "0.875rem",
      "--label-line-height": "1.25",
      "--label-tracking": "0.01em",
      "--eyebrow": "0.75rem",
      "--eyebrow-line-height": "1.3",
      "--eyebrow-tracking": "0.1em",
      "--space-0": "0",
      "--space-1": "0.25rem",
      "--space-2": "0.5rem",
      "--space-3": "0.75rem",
      "--space-4": "1rem",
      "--space-5": "1.25rem",
      "--space-6": "1.5rem",
      "--space-8": "2rem",
      "--space-10": "2.5rem",
      "--space-12": "3rem",
      "--space-16": "4rem",
      "--space-20": "5rem",
      "--space-24": "6rem",
      "--space-32": "8rem",
      "--radius-sm": "0.375rem",
      "--radius-md": "0.625rem",
      "--radius-lg": "1rem",
      "--radius-xl": "1.5rem",
      "--radius-full": "9999px",
      "--shadow-none": "none",
      "--shadow-sm": "0 1px 2px rgb(0 0 0 / 24%)",
      "--shadow-md": "0 12px 32px rgb(0 0 0 / 28%)",
      "--shadow-lg": "0 24px 64px rgb(0 0 0 / 36%)",
      "--shadow-accent": "0 0 40px rgb(139 156 255 / 14%)",
      "--container-wide": "80rem",
      "--container-content": "65rem",
      "--container-prose": "45rem",
      "--container-narrow": "36rem",
      "--breakpoint-sm": "40rem",
      "--breakpoint-md": "48rem",
      "--breakpoint-lg": "64rem",
      "--breakpoint-xl": "80rem",
      "--breakpoint-2xl": "96rem",
      "--layer-base": "0",
      "--layer-sticky": "20",
      "--layer-overlay": "40",
      "--layer-skip-link": "60",
    });
  });

  it("keeps CSS and TypeScript motion tokens synchronized", () => {
    expect(properties.get("--motion-instant")).toBe(
      `${motionTokens.duration.instant}ms`,
    );
    expect(properties.get("--motion-micro")).toBe(
      `${motionTokens.duration.micro}ms`,
    );
    expect(properties.get("--motion-fast")).toBe(
      `${motionTokens.duration.fast}ms`,
    );
    expect(properties.get("--motion-base")).toBe(
      `${motionTokens.duration.base}ms`,
    );
    expect(properties.get("--motion-slow")).toBe(
      `${motionTokens.duration.slow}ms`,
    );
    expect(properties.get("--motion-deliberate")).toBe(
      `${motionTokens.duration.deliberate}ms`,
    );
    expect(properties.get("--distance-subtle")).toBe(
      `${motionTokens.distance.subtle}px`,
    );
    expect(properties.get("--distance-small")).toBe(
      `${motionTokens.distance.small}px`,
    );
    expect(properties.get("--distance-medium")).toBe(
      `${motionTokens.distance.medium}px`,
    );
    expect(properties.get("--scale-hover")).toBe(
      String(motionTokens.scale.hover),
    );
    expect(properties.get("--lift-hover")).toBe(`${motionTokens.lift.hover}px`);
    expect(properties.get("--lift-button")).toBe(
      `${motionTokens.lift.button}px`,
    );

    for (const [name, easing] of Object.entries(motionTokens.easing)) {
      const expected =
        name === "linear" ? "linear" : `cubic-bezier(${easing.join(", ")})`;

      expect(properties.get(`--ease-${name}`)).toBe(expected);
    }

    expect(motionTokens.spring).toEqual({
      responsive: { stiffness: 420, damping: 32, mass: 0.8 },
      gentle: { stiffness: 220, damping: 28, mass: 1 },
    });
  });

  it("uses zero-request system font stacks", () => {
    expect(layoutSource).not.toContain("next/font");
    expect(globalsSource).toContain(
      '--font-display: "Caveat Variable", "Segoe Print", cursive;',
    );
    expect(globalsSource).toContain("ui-sans-serif");
    expect(globalsSource).toContain("ui-monospace");
    expect(globalsSource).not.toContain("@font-face");
  });

  it("provides accessible base contrast on every documented surface", () => {
    const surfaces = ["#080a0f", "#0e1118", "#141925"];
    const readableText = ["#f7f9fc", "#d8dee8", "#929cae"];

    for (const surface of surfaces) {
      for (const text of readableText) {
        expect(contrastRatio(text, surface)).toBeGreaterThanOrEqual(4.5);
      }

      expect(contrastRatio("#8b9cff", surface)).toBeGreaterThanOrEqual(3);
    }

    expect(contrastRatio("#080a0f", "#8b9cff")).toBeGreaterThanOrEqual(4.5);
  });

  it("defines selection, focus, and reduced-motion safeguards", () => {
    expect(globalsSource).toMatch(
      /::selection\s*\{[\s\S]*?background: var\(--color-accent\);[\s\S]*?color: var\(--color-canvas\);[\s\S]*?\}/,
    );
    expect(globalsSource).toMatch(
      /:focus-visible\s*\{[\s\S]*?outline: 2px solid var\(--color-accent\);[\s\S]*?outline-offset: 2px;[\s\S]*?\}/,
    );
    expect(globalsSource).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*?scroll-behavior: auto;[\s\S]*?animation-duration: 0\.01ms !important;[\s\S]*?animation-iteration-count: 1 !important;[\s\S]*?transition-duration: 0\.01ms !important;/,
    );
  });
});
