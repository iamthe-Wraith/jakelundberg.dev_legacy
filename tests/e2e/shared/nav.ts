import { expect, type Page } from '@playwright/test';
import { navItems } from '../../../src/lib/components/Nav/nav-config';

export async function openMobileNav(page: Page) {
	const navToggle = page.locator('.nav-toggle');
	const navOverlay = page.locator('.nav-overlay');
	const nav = page.locator('nav');

	await expect(navToggle).toBeVisible();
	await expect(navOverlay).not.toBeVisible();
	await expect(nav).not.toBeVisible();

	await navToggle.click();
}

export async function mobileNavExists(page: Page, path: string) {
	const navOverlay = page.locator('.nav-overlay');
	const nav = page.locator('nav');
	const navItemContainers = await nav.locator('.nav-item-container').all();

	await openMobileNav(page);

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

	const otherNav = page.locator('.other-nav');
	await expect(otherNav).toBeVisible();

	const otherNavItems = await otherNav.locator('.other-nav-item').all();
	await expect(otherNavItems).toHaveLength(1);

	for (let i = 0; i < otherNavItems.length; i++) {
		const otherNavItem = otherNavItems[i];
		await expect(otherNavItem).toBeVisible();
		await expect(otherNavItem).toHaveText('Main Menu');
	}
}

export async function desktopNavExists(page: Page, path: string) {
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
