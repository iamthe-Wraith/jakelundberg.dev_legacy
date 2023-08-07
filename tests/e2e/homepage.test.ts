import { expect, test } from '@playwright/test';
import { navItems } from '../../src/lib/components/Nav/nav-config';

const path = '/';

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(path);
  });

  test('has mobile navigation', async ({ page, isMobile }) => {
    if (isMobile) {
      const navToggle = page.locator('.nav-toggle');
      const navOverlay = page.locator('.nav-overlay');
      const nav = page.locator('nav');
      const navItemContainers = await nav.locator('.nav-item-container').all();

      await expect(navToggle).toBeVisible();
      await expect(navOverlay).not.toBeVisible();
      await expect(nav).not.toBeVisible();

      await navToggle.click();

      await expect(navOverlay).toBeVisible();
      await expect(navOverlay).toHaveCSS('position', 'fixed');

      await expect(nav).toBeVisible();

      for (let i = 0; i < navItemContainers.length; i++) {
        const navItemContainer = navItemContainers[i];
        const navItem = navItems[i];
        await expect(navItemContainer).toBeVisible();
  
        const labelLink = navItemContainer.locator('.nav-item-label-link');
        await expect(labelLink).toBeVisible();
        await expect(labelLink).toHaveAttribute('href', navItem.href);

        const iconLink = navItemContainer.locator('.nav-item-icon-link');
        await expect(iconLink).toBeVisible();
        await expect(iconLink).toHaveAttribute('href', navItem.href);

        if (navItem.href === path) {
          await expect(labelLink).toHaveClass(/active-label/);
          await expect(iconLink).toHaveClass(/active/);
        }
      }
    }
  });

  test('has desktop navigation', async ({ page, isMobile }) => {
    if (!isMobile) {
      const navToggle = page.locator('.nav-toggle');
      const navOverlay = page.locator('.nav-overlay');
      const nav = page.locator('nav');
      const navItemContainers = await nav.locator('.nav-item-container').all();

      await expect(navToggle).not.toBeVisible();

      await expect(navOverlay).toBeVisible();
      await expect(navOverlay).toHaveCSS('position', 'static');

      await expect(nav).toBeVisible();
      await expect(nav).toHaveCSS('position', 'relative');
  
      for (let i = 0; i < navItemContainers.length; i++) {
        const navItemContainer = navItemContainers[i];
        const navItem = navItems[i];
        await expect(navItemContainer).toBeVisible();
  
        const labelLink = navItemContainer.locator('.nav-item-label-link');
        await expect(labelLink).not.toBeVisible();
        await expect(labelLink).toHaveAttribute('href', navItem.href);

        const iconLink = navItemContainer.locator('.nav-item-icon-link');
        await expect(iconLink).toBeVisible();
        await expect(iconLink).toHaveAttribute('href', navItem.href);

        if (navItem.href === path) {
          await expect(labelLink).toHaveClass(/active-label/);
          await expect(iconLink).toHaveClass(/active/);
        }
      }
    }
  });

  test('has intro header and text', async ({ page }) => {
    page.locator('.loading');

    const ui = page.locator('.ui-layer');
    await expect(ui).toBeVisible({ timeout: 30000 });
    await expect(ui).toHaveCSS('position', 'relative');
    await expect(ui).toHaveCSS('z-index', '10');

    const header = ui.getByRole('heading', { name: 'Hi, I\'m Jake Lundberg.' });
    await expect(header).toBeVisible();

    const subheader = ui.locator('.subheader');
    await expect(subheader).toBeVisible();
    await expect(subheader).toHaveText('I build stuff for the web.');

    const introText = ui.locator('.intro-text');
    await expect(introText).toBeVisible();
    await expect(introText).not.toBeEmpty();
  });

  test('has blog posts', async ({ page }) => {
    const container = page.locator('.blog-posts-section');
    await expect(container).toBeVisible();

    const header = container.locator('h2');
    await expect(header).toBeVisible();

    const blogPosts = await container.locator('.blog-post').all();
    await expect(blogPosts).toHaveLength(3);

    for (let i = 0; i < blogPosts.length; i++) {
      const blogPost = blogPosts[i];

      await expect(blogPost).toBeVisible();

      const blogPostLink = blogPost.getByRole('link');
      await expect(blogPostLink).toBeVisible();

      const blogPostTitle = blogPostLink.getByRole('heading');
      await expect(blogPostTitle).toBeVisible();
      await expect(blogPostTitle).not.toBeEmpty();

      const blogPostTags = blogPostLink.locator('.blog-post-tags');
      await expect(blogPostTags).toBeVisible();
      await expect(blogPostTags).not.toBeEmpty();

      const blogPostDescription = blogPostLink.locator('.blog-post-desc');
      await expect(blogPostDescription).toBeVisible();
      await expect(blogPostDescription).not.toBeEmpty();
    }
  });
});
