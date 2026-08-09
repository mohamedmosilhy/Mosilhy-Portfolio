import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AboutSection } from "@/features/home/about-section";
import { SkillGroup } from "@/features/home/skill-group";
import { SkillsSection } from "@/features/home/skills-section";
import { TestimonialCard } from "@/features/home/testimonial-card";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import {
  validProfile,
  validSkillGroups,
  validTestimonial,
} from "@/tests/fixtures/content-records";

afterEach(cleanup);

describe("skills", () => {
  it("renders ordered groups and every model-provided skill", () => {
    render(<SkillsSection groups={validSkillGroups} heading="Skills" />);

    const section = screen.getByRole("region", { name: "Skills" });
    const collection = section.querySelector('[data-motion="stagger"]');

    expect(collection).toHaveAttribute(
      "data-motion-item-count",
      String(validSkillGroups.length),
    );
    expect(
      [...section.querySelectorAll('[data-slot="skill-group"]')].every(
        (group) => group.getAttribute("data-variant") === "tags",
      ),
    ).toBe(true);

    for (const group of validSkillGroups) {
      expect(
        within(section).getByRole("heading", {
          level: 3,
          name: group.label,
        }),
      ).toBeInTheDocument();

      for (const skill of group.skills) {
        expect(section).toHaveTextContent(skill.name);
      }
    }
  });

  it("supports the documented list and tag group variants", () => {
    const { container, rerender } = render(
      <SkillGroup group={validSkillGroups[0]} variant="list" />,
    );

    expect(screen.getByRole("article")).toHaveAttribute("data-variant", "list");

    rerender(<SkillGroup group={validSkillGroups[0]} variant="tags" />);
    expect(screen.getByRole("article")).toHaveAttribute("data-variant", "tags");
    expect(container.querySelectorAll('[data-slot="tag"]')).toHaveLength(
      validSkillGroups[0].skills.length,
    );
  });
});

describe("testimonials", () => {
  it("uses semantic quote and attribution markup", () => {
    render(<TestimonialCard testimonial={validTestimonial} />);

    const quote = screen.getByText(`“${validTestimonial.quote}”`);

    expect(quote.closest("blockquote")).toBeInTheDocument();
    expect(screen.getByText(validTestimonial.person.name).tagName).toBe("CITE");
    expect(
      screen.getByRole("img", {
        name: validTestimonial.person.photo.alt,
      }),
    ).toHaveAttribute("width", String(validTestimonial.person.photo.width));
  });

  it("omits the section for an empty collection", () => {
    const { container } = render(
      <TestimonialsSection testimonials={[]} heading="Testimonials" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders verified testimonials when supplied", () => {
    render(
      <TestimonialsSection
        testimonials={[validTestimonial]}
        heading="Testimonials"
      />,
    );

    expect(
      screen.getByRole("region", { name: "Testimonials" }),
    ).toHaveTextContent(validTestimonial.quote);
  });
});

describe("about", () => {
  it("renders biography, optional experience, interests, and portrait from profile", () => {
    render(<AboutSection profile={validProfile} />);

    const about = screen.getByRole("region", { name: "About" });

    for (const paragraph of validProfile.biography) {
      expect(about).toHaveTextContent(paragraph);
    }

    for (const chapter of validProfile.journey) {
      expect(about).toHaveTextContent(chapter.eyebrow);
      expect(about).toHaveTextContent(chapter.title);

      for (const item of chapter.evidence) {
        expect(about).toHaveTextContent(item);
      }
    }

    for (const item of validProfile.experience) {
      expect(about).toHaveTextContent(item.label);
      expect(about).toHaveTextContent(item.value);
    }

    for (const interest of validProfile.interests) {
      expect(about).toHaveTextContent(interest.label);
    }

    expect(
      within(about).getByRole("img", { name: validProfile.portrait.alt }),
    ).toHaveAttribute("width", String(validProfile.portrait.width));
    expect(about.querySelector('[data-motion="reveal"]')).toBeInTheDocument();
  });
});

describe("supporting feature architecture guardrails", () => {
  const featureSources = [
    "about-section.tsx",
    "skill-group.tsx",
    "skills-section.tsx",
    "testimonial-card.tsx",
    "testimonials-section.tsx",
  ].map((file) => ({
    file,
    source: readFileSync(resolve(process.cwd(), "features/home", file), "utf8"),
  }));

  it("keeps supporting sections server-rendered and page-model driven", () => {
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
