import { test } from '@playwright/test';
import { desktopNavExists, mobileNavExists } from './shared/nav';
import { desktopMainMenuExists, mobileMainMenuExists } from './shared/main-menu';

const path = '/about';

test.describe('about', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(path);
  });

  test('has mobile navigation', async ({ page, isMobile }) => {
    if (isMobile) await mobileNavExists(page, path);
  });

  test('has desktop navigation', async ({ page, isMobile }) => {
    if (!isMobile) await desktopNavExists(page, path);
  });

  test('has a main menu on mobile', async ({ page, isMobile }) => {
    if (isMobile) await mobileMainMenuExists(page);
  });

  test('has a main menu on desktop', async ({ page, isMobile }) => {
    if (!isMobile) await desktopMainMenuExists(page);
  });
});