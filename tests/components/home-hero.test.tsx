import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { HeroSection } from "@/features/home/hero-section";
import { SocialLinks } from "@/features/home/social-links";
import {
  validProfile,
  validSocialLinks,
} from "@/tests/fixtures/content-records";

afterEach(cleanup);

describe("HeroSection", () => {
  it("renders the complete model-provided introduction with one primary heading", () => {
    render(
      <HeroSection profile={validProfile} socialLinks={validSocialLinks} />,
    );

    const hero = screen.getByRole("region", {
      name: validProfile.name,
    });

    expect(
      within(hero).getByRole("heading", {
        level: 1,
        name: validProfile.name,
      }),
    ).toBeInTheDocument();
    expect(hero).toHaveTextContent(validProfile.greeting);
    expect(hero).toHaveTextContent(validProfile.role);
    expect(hero).toHaveTextContent(validProfile.introduction);
    expect(hero).toHaveTextContent(validProfile.location);
    expect(hero).toHaveTextContent(validProfile.availability);
    expect(
      within(hero).getByRole("link", {
        name: validProfile.primaryCta.label,
      }),
    ).toHaveAttribute("href", validProfile.primaryCta.href);
    expect(
      within(hero).getByRole("link", {
        name: validProfile.secondaryCta.label,
      }),
    ).toHaveAttribute("href", validProfile.secondaryCta.href);
  });

  it("keeps project and contact actions keyboard reachable in source order", async () => {
    const user = userEvent.setup();

    render(
      <HeroSection profile={validProfile} socialLinks={validSocialLinks} />,
    );

    const projectAction = screen.getByRole("link", {
      name: validProfile.primaryCta.label,
    });
    const contactAction = screen.getByRole("link", {
      name: validProfile.secondaryCta.label,
    });

    await user.tab();
    expect(projectAction).toHaveFocus();

    await user.tab();
    expect(contactAction).toHaveFocus();
  });

  it("keeps four authored hero groups paintable without client motion", () => {
    render(
      <HeroSection profile={validProfile} socialLinks={validSocialLinks} />,
    );

    const hero = screen.getByRole("region", {
      name: validProfile.name,
    });
    const groups = [...hero.querySelectorAll<HTMLElement>("[data-hero-group]")];

    expect(groups).toHaveLength(4);
    expect(
      hero.querySelector('[data-motion="reveal"]'),
    ).not.toBeInTheDocument();
    expect(groups[0]).toHaveTextContent(validProfile.greeting);
    expect(groups[1]).toHaveTextContent(validProfile.name);
    expect(groups[1]).toHaveTextContent(validProfile.role);
    expect(groups[2]).toHaveTextContent(validProfile.introduction);
    expect(groups[3]).toHaveTextContent(validProfile.primaryCta.label);
    expect(groups[3]).toHaveTextContent(validSocialLinks[0].label);
  });
});

describe("SocialLinks", () => {
  it("preserves the page-model order in the compact variant", () => {
    render(<SocialLinks links={validSocialLinks} variant="compact" />);

    const navigation = screen.getByRole("navigation", {
      name: "Hero social and contact links",
    });
    const links = within(navigation).getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual(
      validSocialLinks.map((link) => link.label),
    );
    expect(links[0]).not.toHaveAttribute("target");
    expect(links[1]).toHaveAttribute("target", "_blank");
    expect(links[1]).toHaveAttribute("rel", "noopener noreferrer");
  });

  it.each(["icons", "labelled"] as const)(
    "provides accessible destination names in the %s variant",
    (variant) => {
      render(<SocialLinks links={validSocialLinks} variant={variant} />);

      for (const link of validSocialLinks) {
        const accessibleName = `${link.label}${
          link.newTab ? " (opens in a new tab)" : ""
        }`;

        expect(
          screen.getByRole("link", { name: accessibleName }),
        ).toHaveAttribute("href", link.href);
      }
    },
  );
});

describe("home feature architecture guardrails", () => {
  const featureSources = ["hero-section.tsx", "social-links.tsx"].map(
    (file) => ({
      file,
      source: readFileSync(
        resolve(process.cwd(), "features/home", file),
        "utf8",
      ),
    }),
  );

  it("keeps the hero server-rendered and page-model driven", () => {
    for (const { file, source } of featureSources) {
      expect(source, file).not.toMatch(/^["']use client["'];?/m);
      expect(source, file).not.toContain("@/content/");
      expect(source, file).not.toContain("@/lib/content/");
      expect(source, file).not.toMatch(
        /Mohamed Mosilhy|Nova E-commerce|Where’s Waldo|Blacktape/,
      );
    }
  });

  it("uses semantic design tokens instead of raw palette values", () => {
    for (const { file, source } of featureSources) {
      expect(source, file).not.toMatch(/#[\da-f]{3,8}\b/i);
      expect(source, file).not.toMatch(
        /\b(?:bg|text|border)-(?:zinc|slate|gray|neutral|indigo|rose|teal|amber)-\d+/,
      );
    }
  });
});
