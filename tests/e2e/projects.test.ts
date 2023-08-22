import { expect, test } from '@playwright/test';
import { desktopNavExists, mobileNavExists } from './shared/nav';
import { desktopMainMenuExists, mobileMainMenuExists } from './shared/main-menu';

const path = '/projects';

test.describe('projects', () => {
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

	test('displays intro header and text on mobile', async ({ page, isMobile }) => {
		if (isMobile) {
			const ui = page.locator('.ui-layer');
			await expect(ui).toBeVisible({ timeout: 30000 });
			await expect(ui).toHaveCSS('position', 'relative');
			await expect(ui).toHaveCSS('z-index', '10');

			const header = ui.getByRole('heading', { name: 'I see you found my Project Cemetery.' });
			await expect(header).toBeVisible();

			const intro = page.getByTestId('mobile-cemetery-welcome');
			await expect(intro).toBeVisible();
		}
	});

	test('displays intro header and text on desktop', async ({ page, isMobile }) => {
		if (!isMobile) {
			const ui = page.locator('.ui-layer');
			await expect(ui).toBeVisible({ timeout: 30000 });
			await expect(ui).toHaveCSS('position', 'relative');
			await expect(ui).toHaveCSS('z-index', '10');

			const header = ui.getByRole('heading', { name: 'I see you found my Project Cemetery.' });
			await expect(header).toBeVisible();

			const intro = page.getByTestId('desktop-cemetery-welcome');
			await expect(intro).toBeVisible();
		}
	});

	test('displays a list of projects on mobile', async ({ page, isMobile }) => {
		if (isMobile) {
			const ui = page.locator('.ui-layer');
			await expect(ui).toBeVisible({ timeout: 30000 });
			const projects = await ui.locator('.left-col .project').all();
			await expect(projects.length).toBeGreaterThan(0);

			for (let i = 0; i < projects.length; i++) {
				const project = projects[i];

				await expect(project).toHaveClass(/mobile-project/);
				await project.scrollIntoViewIfNeeded();

				// await expect(project.locator('button.project-title')).not.toBeVisible();
				await expect(project.locator('h2.mobile-header')).toBeVisible();

				const tags = await project.locator('.tags .tag').all();
				await expect(tags.length).toBeGreaterThan(0);

				const links = await project.locator('.links a').all();
				await expect(links.length).toBeGreaterThan(0);

				const viewDetailsButton = project.locator('button.view-details-btn');
				await expect(viewDetailsButton).toBeVisible();
				await expect(viewDetailsButton).toHaveText('View Details');

				let details = project.locator('.desc.mobile-desc');
				await expect(details).not.toBeVisible();

				await viewDetailsButton.click();

				details = project.locator('.desc.mobile-desc');
				await expect(details).toBeVisible();
			}
		}
	});

	test('displays a list of project names in the left rail on desktop', async ({
		page,
		isMobile
	}) => {
		if (!isMobile) {
			const ui = page.locator('.ui-layer');
			await expect(ui).toBeVisible({ timeout: 30000 });
			const projects = await ui.locator('.left-col .project').all();
			await expect(projects.length).toBeGreaterThan(0);

			for (let i = 0; i < projects.length; i++) {
				const project = projects[i];

				await project.scrollIntoViewIfNeeded();

				const header = project.locator('button.project-title');
				await expect(header).toBeVisible();
				await expect(project.locator('h2.mobile-header')).not.toBeVisible();

				const tags = await project.locator('.tags .tag').all();
				await expect(tags.length).toBeGreaterThan(0);

				for (let i = 0; i < tags.length; i++) {
					const tag = tags[i];
					await expect(tag).not.toBeVisible();
				}

				const details = project.locator('.desc');
				await expect(details).not.toBeVisible();

				const links = await project.locator('.links a').all();
				await expect(links.length).toBeGreaterThan(0);

				for (let i = 0; i < links.length; i++) {
					const link = links[i];
					await expect(link).not.toBeVisible();
				}
			}
		}
	});

	test("displays a project's details when a project name is clicked in the left rail on desktop", async ({
		page,
		isMobile
	}) => {
		if (!isMobile) {
			const ui = page.locator('.ui-layer');
			await expect(ui).toBeVisible({ timeout: 30000 });
			const projects = await ui.locator('.left-col .project').all();
			await expect(projects.length).toBeGreaterThan(0);

			for (let i = 0; i < projects.length; i++) {
				const project = projects[i];

				await project.scrollIntoViewIfNeeded();

				const header = project.locator('button.project-title');
				await expect(header).toBeVisible();

				await header.click();

				// wait for animation to complete so do not get elements from previous project
				await page.waitForTimeout(300);

				const desktopProject = page.locator('.details .project');
				await expect(desktopProject).toBeVisible();

				const tags = await desktopProject.locator('.tags .tag').all();
				await expect(tags.length).toBeGreaterThan(0);

				for (let i = 0; i < tags.length; i++) {
					const tag = tags[i];
					await expect(tag).toBeVisible();
				}

				await expect(desktopProject.locator('.desc.mobile-desc')).not.toBeVisible();

				const details = desktopProject.locator('.desc');
				await expect(details).toBeVisible();

				const links = await desktopProject.locator('.links a').all();
				await expect(links.length).toBeGreaterThan(0);

				for (let i = 0; i < links.length; i++) {
					const link = links[i];
					await expect(link).toBeVisible();
				}
			}
		}
	});
});
