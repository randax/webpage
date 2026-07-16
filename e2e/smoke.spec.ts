import { test, expect } from "@playwright/test";

test("homepage serves and shows the site owner", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Øyvind Randa/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Øyvind Randa",
  );
});
