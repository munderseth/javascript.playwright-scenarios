const { test, expect } = require('@playwright/test');

test('hello world smoke test', async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await page.waitForTimeout(5000);
  await expect(page).toHaveTitle(/Example Domain/);
  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
});