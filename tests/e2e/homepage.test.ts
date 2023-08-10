import { expect, test } from '@playwright/test';
import { desktopNavExists, mobileNavExists } from './shared/nav';
import { desktopMainMenuExists, mobileMainMenuExists } from './shared/main-menu';

const path = '/';

test.describe('homepage', () => {
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

  test('has recommendations', async ({ page }) => {
    const container = page.locator('.recommendations-section');
    await expect(container).toBeVisible();

    const header = container.locator('h2');
    await expect(header).toBeVisible();

    const recommendations = await container.locator('.recommendation').all();
    await expect(recommendations).toHaveLength(3);

    for (let i = 0; i < recommendations.length; i++) {
      const recommendation = recommendations[i];

      await expect(recommendation).toBeVisible();

      const header = recommendation.locator('header');
      await expect(header).toBeVisible();

      const image = header.locator('img');
      await expect(image).toBeVisible();
      await expect(image.getAttribute('src')).toBeDefined();
      await expect(image.getAttribute('alt')).toBeDefined();

      const author = header.locator('p');
      await expect(author).toBeVisible();
      await expect(author).not.toBeEmpty();

      const quote = recommendation.locator('blockquote');
      await expect(quote).toBeVisible();
      await expect(quote).not.toBeEmpty();
    }

    const readMore = container.getByText('Read More');
    // should not be visible until new recommendations page is added.
    await expect(readMore).not.toBeVisible();
  });
});
