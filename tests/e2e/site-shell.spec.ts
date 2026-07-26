import { expect, test } from "@playwright/test";

test("renders landmarks and root-qualified desktop navigation", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.locator("main#main-content")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  const primaryNavigation = page.getByRole("navigation", {
    name: "Primary",
  });
  const projectsLink = primaryNavigation.getByRole("link", {
    name: "Projects",
  });

  await page.evaluate(() => {
    const spacer = document.createElement("div");
    const target = document.createElement("section");
    const main = document.querySelector("main")!;

    spacer.style.height = "100vh";
    target.id = "projects";
    target.className = "scroll-mt-space-20";
    target.style.height = "100vh";
    main.append(spacer, target);
  });

  await expect(projectsLink).toHaveAttribute("href", "/#projects");
  await projectsLink.click();
  await expect(page).toHaveURL(/#projects$/);
  await expect
    .poll(() =>
      page.locator("#projects").evaluate((target) => {
        return target.getBoundingClientRect().top;
      }),
    )
    .toBeLessThanOrEqual(82);

  const positions = await page.evaluate(() => ({
    headerBottom: document.querySelector("header")!.getBoundingClientRect()
      .bottom,
    targetTop: document.getElementById("projects")!.getBoundingClientRect().top,
  }));

  expect(positions.targetTop).toBeGreaterThan(positions.headerBottom);
});

test("supports skip navigation and sticky header observation", async ({
  page,
}) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", {
    name: "Skip to main content",
  });

  await expect(skipLink).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator("main#main-content")).toBeFocused();

  const header = page.getByRole("banner");
  await page.evaluate(() => {
    document.body.style.minHeight = "200vh";
  });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(header).toHaveAttribute("data-scrolled", "true");
});

test("operates the mobile disclosure by keyboard and closes on navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const trigger = page.locator("header button[aria-controls]");

  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(trigger).toHaveAccessibleName("Close navigation menu");

  const mobileNavigation = page.getByRole("navigation", {
    name: "Mosilhy mobile",
  });
  const projectsLink = mobileNavigation.getByRole("link", {
    name: "Projects",
  });

  await page.keyboard.press("Tab");
  await expect(projectsLink).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toHaveAccessibleName("Open navigation menu");

  await trigger.click();
  await projectsLink.click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});
