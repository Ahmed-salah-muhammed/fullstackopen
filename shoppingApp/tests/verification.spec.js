import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Mock products API
  await page.route('https://fakestoreapi.com/products', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          title: "Test Product",
          price: 109.95,
          description: "Test Description",
          category: "men's clothing",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
        }
      ]),
    });
  });
});

test('homepage renders and has correct title', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveTitle(/Atelier/);
  await expect(page.getByText('The Digital Atelier')).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.click('text=SHOP');
  await expect(page).toHaveURL(/.*shop/);
  await expect(page.getByText('Collection')).toBeVisible();
});
