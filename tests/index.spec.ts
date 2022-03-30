import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL);
});

async function lookupCar(page: Page, state: string, number: string) {
  await page.locator('text=StateState >> input[type="text"]').fill(state);
  await page
    .locator('text=StateState >> input[type="text"]')
    .press('ArrowDown');
  await page.locator('text=StateState >> input[type="text"]').press('Enter');
  await page.locator('text=NumberNumber >> input[type="text"]').click();
  await page.locator('text=NumberNumber >> input[type="text"]').fill(number);
  await page.locator('text=Search').click();
}

test.describe('Not Logged In Cars', () => {
  test.describe('Testing MA AAAAAA', () => {
    test.beforeEach(async ({ page }) => {
      await lookupCar(page, 'MA', 'AAAAAA');
    });

    test('expect license plate and car name to be on screen', async ({
      page,
    }) => {
      await expect(page.locator('#plate-img')).toHaveCount(1);
      await expect(page.locator('#car-info')).toContainText('1988 ROLLS ROYCE');
      await expect(page.locator('#add-comment-form')).toHaveCount(0);
    });
  });

  test.describe('Testing NY ABC', () => {
    test.beforeEach(async ({ page }) => {
      await lookupCar(page, 'NY', 'ABC');
    });

    test('expect license plate and car name to be on screen', async ({
      page,
    }) => {
      await expect(page.locator('#plate-img')).toHaveCount(1);
      await expect(page.locator('#car-info')).toContainText(
        '2006 LINCOLN Town Car'
      );
      await expect(page.locator('#add-comment-form')).toHaveCount(0);
    });
  });

  test.describe('Testing HI HI', () => {
    test.beforeEach(async ({ page }) => {
      await lookupCar(page, 'HI', 'HI');
    });

    test('expect license plate and car name to be on screen', async ({
      page,
    }) => {
      await expect(page.locator('#plate-img')).toHaveCount(1);
      await expect(page.locator('#car-info')).toContainText('2013 RAM 1500');
      await expect(page.locator('#add-comment-form')).toHaveCount(0);
    });
  });
});

test.describe('Login', () => {
  test.describe('login with test test', () => {
    test.beforeEach(async ({ page }) => {
      // Log In
      await page.locator('text=Log in').click();
      await page.locator('input[name="Username"]').click();
      await page.locator('input[name="Username"]').fill('test');
      await page.locator('input[name="Username"]').press('Tab');
      await page.locator('input[name="password"]').fill('test');
      await page.locator('button:has-text("Sign In")').click();
    });

    test('home page doesnt have cars or comments', async ({ page }) => {
      await expect(page.locator('#add-comment-form')).toHaveCount(0);
      await expect(page.locator('#car-info h3')).toHaveCount(0);
      await expect(page.locator('#plate-img')).toHaveCount(0);
      await expect(page.locator('.comment')).toHaveCount(0);
    });

    test('lookup car and add comment', async ({ page }) => {
      await lookupCar(page, 'MA', 'AAAAAA');
      await page.locator('#add-comment').fill('testcomment');
      await page.locator('#add-comment').press('Tab');
      await page.locator('[aria-label="upload picture"]').press('Enter');
      await expect(page.locator('#car-container ul')).toContainText('testcomment');
      // await page.locator('#car-container ul li:nth-child(1) button').hover()
      await page.click('#car-container ul li:nth-child(1) button', {
        force: true,
      });
    });
  });
});
