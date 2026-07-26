import { expect, test } from "@playwright/test";

import { profile } from "@/content/profile";

const viewports = [
  { name: "narrow mobile", width: 320, height: 720 },
  { name: "short mobile", width: 320, height: 568 },
  { name: "tablet", width: 768, height: 900 },
  { name: "desktop", width: 1280, height: 900 },
  { name: "large desktop", width: 1536, height: 960 },
] as const;

for (const viewport of viewports) {
  test(`keeps the hero's identity and actions clear at ${viewport.name}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const hero = page.locator('[data-slot="hero-section"]');
    const projectAction = hero.getByRole("link", {
      name: profile.primaryCta.label,
    });
    const contactAction = hero.getByRole("link", {
      name: profile.secondaryCta.label,
    });

    await expect(
      hero.getByRole("heading", { level: 1, name: profile.name }),
    ).toBeVisible();
    await expect(hero.getByText(profile.role, { exact: true })).toBeVisible();
    await expect(projectAction).toBeVisible();
    await expect(contactAction).toBeVisible();

    const actionBounds = await Promise.all([
      projectAction.boundingBox(),
      contactAction.boundingBox(),
    ]);

    for (const bounds of actionBounds) {
      expect(bounds).not.toBeNull();
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
    }
  });
}

test("activates project and contact paths from the keyboard", async ({
  page,
}) => {
  await page.goto("/");

  const hero = page.locator('[data-slot="hero-section"]');
  const projectAction = hero.getByRole("link", {
    name: profile.primaryCta.label,
  });
  const contactAction = hero.getByRole("link", {
    name: profile.secondaryCta.label,
  });

  await projectAction.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#projects$/);

  await contactAction.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contact$/);
});

test("keeps the complete hero available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 568 },
  });
  const page = await context.newPage();

  await page.goto("/");

  const hero = page.locator('[data-slot="hero-section"]');

  await expect(
    hero.getByRole("heading", { level: 1, name: profile.name }),
  ).toBeVisible();
  await expect(hero.getByText(profile.introduction)).toBeVisible();
  await expect(
    hero.getByRole("link", { name: profile.primaryCta.label }),
  ).toHaveAttribute("href", profile.primaryCta.href);
  await expect(
    hero.getByRole("link", { name: profile.secondaryCta.label }),
  ).toHaveAttribute("href", profile.secondaryCta.href);
  await expect(
    hero.getByRole("navigation", { name: "Hero social and contact links" }),
  ).toBeVisible();

  await context.close();
});
