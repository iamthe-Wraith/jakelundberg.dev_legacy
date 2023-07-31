import { test, expect } from '@playwright/experimental-ct-svelte';
import Nav from '../../src/lib/components/Nav/Nav.svelte';

test.use({ viewport: { width: 500, height: 500 } });

test.skip('should work', async ({ mount }) => {
  const component = await mount(Nav);
  await expect(component).toContainText('Vite + Svelte');
});