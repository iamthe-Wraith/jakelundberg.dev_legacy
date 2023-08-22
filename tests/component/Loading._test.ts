import { test, expect } from '@playwright/experimental-ct-svelte';
import Loading from '../../src/lib/components/Loading.svelte';

test.use({ viewport: { width: 500, height: 500 } });

test.describe('Loading', () => {
	test('should should display a default loading message', async ({ mount }) => {
		const component = await mount(Loading);

		const loadingText = component.locator('.loading-indicator');
		await expect(loadingText).toContainText('loading...');

		const sep = component.locator('.sep-line');
		await expect(sep).not.toBeInViewport();

		const quote = component.locator('.quote');
		await expect(quote).not.toBeInViewport();

		const author = component.locator('.quote-author');
		await expect(author).not.toBeInViewport();
	});

	test('should display a custom loading message', async ({ mount }) => {
		const text = 'Doing stuff...';

		const component = await mount(Loading, {
			props: { text }
		});

		const loadingText = component.locator('.loading-indicator');
		await expect(loadingText).toContainText(`${text}...`);

		const sep = component.locator('.sep-line');
		await expect(sep).not.toBeInViewport();

		const quote = component.locator('.quote');
		await expect(quote).not.toBeInViewport();

		const author = component.locator('.quote-author');
		await expect(author).not.toBeInViewport();
	});

	// requesting help from community: https://discord.com/channels/807756831384403968/1136266913438253156
	// test('should display a quote when quotes are passed in', async ({ mount }) => {
	//   const quotes: IQuote[] = [
	//     {
	//       quote: 'some quote.',
	//       author: 'some person'
	//     }
	//   ];

	//   const component = await mount(Loading, {
	//     props: { quotes },
	//   });

	//   const loadingText = component.locator('.loading-indicator');
	//   await expect(loadingText).toContainText('loading...');

	// const sep = component.locator('.sep-line');
	// await expect(sep).toBeVisible();

	// const quote = component.locator('.quote');
	// await expect(quote).toBeVisible();
	// await expect(quote).toContain(quotes[0].quote);

	// const author = component.locator('.quote-author');
	// await expect(author).toBeVisible();
	// await expect(quote).toContain(quotes[0].author);
	// });
});
