import { expect, test } from "@playwright/test";

const siteUrl = "https://portfolio-omega-six-23.vercel.app";

test("home publishes canonical metadata and aligned structured data", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Mohamed Mosilhy — Full-stack Developer");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    siteUrl,
  );

  const graph = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      "{}",
  ) as { "@graph"?: { "@type"?: string; name?: string }[] };

  expect(graph["@graph"]).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        "@type": "Person",
        name: "Mohamed Mosilhy",
      }),
      expect.objectContaining({
        "@type": "WebSite",
      }),
    ]),
  );
});

test("project route publishes canonical metadata and project JSON-LD", async ({
  page,
}) => {
  await page.goto("/projects/nova-ecommerce");

  await expect(page).toHaveTitle(
    "Nova E-commerce Platform Case Study | Mohamed Mosilhy",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${siteUrl}/projects/nova-ecommerce`,
  );

  const graph = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      "{}",
  ) as { "@graph"?: { "@type"?: string; name?: string }[] };

  expect(graph["@graph"]).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        "@type": "SoftwareSourceCode",
        name: "Nova E-commerce Platform",
      }),
    ]),
  );
});

test("robots and sitemap expose the canonical published routes", async ({
  request,
}) => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    request.get("/robots.txt"),
    request.get("/sitemap.xml"),
  ]);

  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain(
    `Sitemap: ${siteUrl}/sitemap.xml`,
  );

  expect(sitemapResponse.ok()).toBe(true);
  const sitemapBody = await sitemapResponse.text();
  expect(sitemapBody).toContain(`<loc>${siteUrl}</loc>`);
  expect(sitemapBody).toContain(
    `<loc>${siteUrl}/projects/nova-ecommerce</loc>`,
  );
});
