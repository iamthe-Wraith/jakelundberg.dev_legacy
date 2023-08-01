import { test, expect } from '@playwright/experimental-ct-svelte';
import Loading from '../../src/lib/components/Loading.svelte';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
  const component = await mount(Loading);
  await expect(component).toContainText('loading...');
});