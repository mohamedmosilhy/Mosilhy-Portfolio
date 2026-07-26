import { expect, test } from "@playwright/test";

const sectionNames = ["Selected projects", "Skills", "About", "Contact"];

test("renders the complete home narrative in the required order", async ({
  page,
}) => {
  await page.goto("/");

  const main = page.locator("main");
  const sections = main.locator(":scope > section");

  await expect(sections).toHaveCount(5);
  await expect(sections.nth(0)).toHaveAttribute("data-slot", "hero-section");
  await expect(sections.nth(1)).toHaveAttribute("id", "projects");
  await expect(sections.nth(2)).toHaveAttribute("id", "skills");
  await expect(sections.nth(3)).toHaveAttribute("id", "about");
  await expect(sections.nth(4)).toHaveAttribute("id", "contact");
  await expect(page.getByRole("region", { name: "Testimonials" })).toHaveCount(
    0,
  );

  for (const name of sectionNames) {
    await expect(page.getByRole("region", { name })).toBeVisible();
  }
});

test("reaches every home section from keyboard-operable navigation", async ({
  page,
}) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Primary" });

  for (const item of [
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ]) {
    const link = navigation.getByRole("link", { name: item.label });

    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`#${item.id}$`));
    await expect(page.locator(`#${item.id}`)).toBeInViewport();
  }
});

test("keeps the complete home page available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 720 },
  });
  const page = await context.newPage();

  await page.goto("/");

  for (const name of sectionNames) {
    await expect(page.getByRole("region", { name })).toBeVisible();
  }

  await expect(
    page.getByRole("link", { name: "Send an email" }),
  ).toHaveAttribute("href", "mailto:mmosilhyofficial@gmail.com");
  await expect(page.getByRole("contentinfo")).toBeVisible();

  await context.close();
});

test("reflows without horizontal page overflow at 320 CSS pixels", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const widths = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));

  expect(widths.document).toBeLessThanOrEqual(widths.viewport);
});
