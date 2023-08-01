import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import type { LayoutServerLoad } from './$types';
import { quotes } from '$lib/data/quotes';

export const load = wrapServerLoadWithSentry(async () => {
  return { quotes };
}) satisfies LayoutServerLoad;