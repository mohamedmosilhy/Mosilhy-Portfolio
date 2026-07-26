import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const projectRoutes = [
  "/projects/nova-ecommerce",
  "/projects/wheres-waldo",
  "/projects/blacktape",
  "/projects/iphone-15-pro",
] as const;
const keyRoutes = ["/", ...projectRoutes, "/projects/not-found"] as const;

function violationSummary(
  violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"],
) {
  return violations
    .map(
      (violation) =>
        `${violation.impact ?? "unknown"} ${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`,
    )
    .join("\n");
}

for (const route of keyRoutes) {
  test(`has no automated accessibility violations on ${route}`, async ({
    page,
  }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations, violationSummary(results.violations)).toEqual(
      [],
    );
  });

  test(`keeps landmarks and heading order coherent on ${route}`, async ({
    page,
  }) => {
    await page.goto(route);

    await expect(page.getByRole("banner")).toHaveCount(1);
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("contentinfo")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

    const levels = await page
      .locator("h1, h2, h3, h4, h5, h6")
      .evaluateAll((headings) =>
        headings.map((heading) => Number(heading.tagName.slice(1))),
      );

    expect(levels[0]).toBe(1);
    for (let index = 1; index < levels.length; index += 1) {
      expect(
        levels[index]! - levels[index - 1]!,
        `heading level jumps from h${levels[index - 1]} to h${levels[index]} on ${route}`,
      ).toBeLessThanOrEqual(1);
    }
  });
}

test("mobile disclosure remains accessible in its revealed state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const trigger = page.locator("header button[aria-controls]");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("navigation", { name: "Mosilhy mobile" }),
  ).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations, violationSummary(results.violations)).toEqual([]);
});

test("primary home and project journeys complete by keyboard", async ({
  page,
}) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  const caseStudy = page.getByRole("link", {
    name: "View Nova E-commerce Platform case study",
  });
  await caseStudy.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/nova-ecommerce$/);

  const allProjects = page.getByRole("link", { name: "All projects" });
  await allProjects.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(
    page.getByRole("region", { name: "Selected projects" }),
  ).toBeVisible();
});

for (const width of [320, 640] as const) {
  test(`reflows key routes at ${width} CSS pixels`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });

    for (const route of ["/", "/projects/nova-ecommerce"] as const) {
      await page.goto(route);

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(dimensions.scrollWidth, `${route} overflows at ${width}px`).toBe(
        dimensions.clientWidth,
      );
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });
}

test("preserves focus and content in forced-colors mode", async ({
  browser,
}) => {
  const context = await browser.newContext({
    forcedColors: "active",
    viewport: { width: 320, height: 720 },
  });
  const page = await context.newPage();

  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveCSS("outline-style", "solid");
  await expect(skipLink).toHaveCSS("outline-width", "2px");

  const trigger = page.getByRole("button", {
    name: "Open navigation menu",
  });
  await trigger.focus();
  await expect(trigger).toHaveCSS("outline-style", "solid");
  await trigger.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Mosilhy mobile" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await context.close();
});
