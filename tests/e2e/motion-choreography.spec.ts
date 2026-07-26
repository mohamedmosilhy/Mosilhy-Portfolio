import { expect, test } from "@playwright/test";

test("keeps the hero paintable and applies motion below the fold", async ({
  page,
}) => {
  await page.goto("/");

  const heroGroups = page.locator(
    '[data-slot="hero-section"] [data-hero-group]',
  );

  await expect(heroGroups).toHaveCount(4);
  expect(
    await heroGroups.evaluateAll((groups) =>
      groups.every((group) => {
        const style = getComputedStyle(group);
        return style.opacity === "1" && style.transform === "none";
      }),
    ),
  ).toBe(true);

  const projectCollection = page.locator('#projects [data-motion="stagger"]');

  await projectCollection.scrollIntoViewIfNeeded();
  await expect(projectCollection).toHaveAttribute(
    "data-motion-state",
    "visible",
  );
  await expect
    .poll(() =>
      projectCollection
        .locator(':scope > [data-motion="stagger-item"]')
        .evaluateAll((items) =>
          items.every((item) => {
            const style = getComputedStyle(item);
            return style.opacity === "1" && style.transform === "none";
          }),
        ),
    )
    .toBe(true);
});

test("removes spatial motion for reduced-motion users", async ({ browser }) => {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 320, height: 720 },
  });
  const page = await context.newPage();

  await page.goto("/");

  const motionRegions = page.locator('[data-motion-state="reduced"]');
  await expect(motionRegions.first()).toBeVisible();
  expect(await motionRegions.count()).toBeGreaterThan(0);

  const spatialMotionIsRemoved = await motionRegions.evaluateAll((regions) =>
    regions.every((region) => {
      const style = getComputedStyle(region);
      return (
        style.opacity === "1" &&
        (style.transform === "none" ||
          style.transform === "matrix(1, 0, 0, 1, 0, 0)")
      );
    }),
  );

  expect(spatialMotionIsRemoved).toBe(true);

  const trigger = page.locator("header button[aria-controls]");
  await trigger.click();

  const panel = page.locator('[data-slot="mobile-navigation-panel"]');
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toHaveCSS("transform", "none");
  await expect(panel).toHaveCSS("opacity", "1");
  expect(
    await panel.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).transitionDuration),
    ),
  ).toBeLessThanOrEqual(0.001);

  const card = page.locator('[data-slot="project-card"]').first();
  await card.scrollIntoViewIfNeeded();
  await card.hover();
  await expect(card).toHaveCSS("translate", "none");
  await expect(
    card.locator('[data-slot="media-frame"]').locator(".."),
  ).toHaveCSS("scale", "none");

  await context.close();
});

test("uses tokenized header and mobile-menu transition states", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const header = page.getByRole("banner");
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(header).toHaveAttribute("data-scrolled", "true");
  await expect(header).toHaveCSS("transition-duration", "0.18s");

  const trigger = page.locator("header button[aria-controls]");
  const panel = page.locator('[data-slot="mobile-navigation-panel"]');

  await trigger.click();
  await expect(panel).toHaveAttribute("data-state", "open");
  await expect(panel).toHaveCSS("transition-duration", "0.26s");

  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toHaveAttribute("data-state", "closing");
  await expect(panel).toHaveAttribute("inert", "");
  await expect(panel).toHaveCSS("transition-duration", "0.18s");
});

test("matches project-card hover emphasis with a keyboard focus cue", async ({
  page,
}) => {
  await page.goto("/");

  const card = page.locator('[data-slot="project-card"]').first();
  const caseStudy = card.getByRole("link", { name: /case study$/ });

  await card.scrollIntoViewIfNeeded();
  const restingSurface = await card.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
    };
  });

  await card.hover();
  await expect
    .poll(() => card.evaluate((element) => getComputedStyle(element).translate))
    .toBe("0px -4px");
  await expect
    .poll(() =>
      card.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
        };
      }),
    )
    .not.toEqual(restingSurface);

  const hoverSurface = await card.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
    };
  });

  await page.mouse.move(0, 0);
  await caseStudy.focus();
  await expect(caseStudy).toBeFocused();
  await expect
    .poll(() =>
      card.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
        };
      }),
    )
    .toEqual(hoverSurface);
  await expect(card).toHaveCSS("translate", "none");
});
