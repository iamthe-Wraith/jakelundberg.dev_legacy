import { expect, test } from '@playwright/test';
import { navItems } from '../../src/lib/components/Nav/nav-config';

const path = '/projects';

test.describe('projects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(path);
  });

  test('has navigation', async ({ page, isMobile }) => {
    const navToggle = page.locator('.nav-toggle');
    const navOverlay = page.locator('.nav-overlay');
    const nav = page.locator('nav');
    const navItemContainers = await nav.locator('.nav-item-container').all();

    if (isMobile) {
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
    } else {
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

  test('has expected elements', async ({ page, isMobile }) => {
    const ui = page.locator('.ui-layer');
    await expect(ui).toBeVisible({ timeout: 30000 });
    await expect(ui).toHaveCSS('position', 'relative');
    await expect(ui).toHaveCSS('z-index', '10');

    const header = ui.getByRole('heading', { name: 'Welcome to My Project Cemetery' });
    await expect(header).toBeVisible();

    if (isMobile) {
      const intro = page.locator('.mobile-cemetery-welcome .cemetery-intro');
      await expect(intro).toBeVisible();
    } else {
      const intro = page.locator('.desktop-cemetery-welcome .cemetery-intro');
      await expect(intro).toBeVisible();
    }

    const projects = await ui.locator('.project').all();
    await expect(projects.length).toBeGreaterThan(0);

    await Promise.all(projects.map(async (project) => {
      project.scrollIntoViewIfNeeded();

      if (isMobile) {
        await expect(project).toHaveClass('.mobile-project');

        await expect(project.locator('button.project-title')).not.toBeVisible();
        await expect(project.locator('h2.mobile-header')).toBeVisible();

        const tags = await project.locator('.tags .tag').all();
        await expect(tags.length).toBeGreaterThan(0);

        const links = await project.locator('.links a').all();
        expect(links.length).toBeGreaterThan(0);

        const viewDetailsButton = project.locator('button.view-details-btn');
        await expect(viewDetailsButton).toBeVisible();
        await expect(viewDetailsButton).toHaveText('View Details');

        let details = project.locator('.desc.mobile-desc');
        expect(details).not.toBeVisible();

        viewDetailsButton.click();

        details = project.locator('.desc.mobile-desc');
        expect(details).toBeVisible();
      } else {
        const header = project.locator('button.project-title');
        await expect(header).toBeVisible();
        await expect(project.locator('h2.mobile-header')).not.toBeVisible();

        let tags = await project.locator('.tags .tag').all();
        await expect(tags.length).toBeGreaterThan(0);
        await Promise.all(tags.map(async (tag) => {
          await expect(tag).not.toBeVisible();
        }));

        let details = project.locator('.desc');
        expect(details).not.toBeVisible();

        let links = await project.locator('.links a').all();
        await expect(links.length).toBeGreaterThan(0);
        await Promise.all(links.map(async (link) => {
          await expect(link).not.toBeVisible();
        }));

        header.click();

        const desktopProject = page.locator('.details .project');
        await desktopProject.scrollIntoViewIfNeeded();
        await expect(desktopProject).toBeVisible();

        tags = await desktopProject.locator('.tags .tag').all();
        await expect(tags.length).toBeGreaterThan(0);
        await Promise.all(tags.map(async (tag) => {
          await expect(tag).toBeVisible();
        }));

        await expect(desktopProject.locator('.desc.mobile-desc')).not.toBeVisible();

        details = desktopProject.locator('.desc');
        expect(details).toBeVisible();

        links = await desktopProject.locator('.links a').all();
        expect(links.length).toBeGreaterThan(0);
        await Promise.all(links.map(async (link) => {
          await expect(link).toBeVisible();
        }));
      }
    }));
  });
});