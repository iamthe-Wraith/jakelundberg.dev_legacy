import { projects } from '$lib/data/projects';
import type { PageServerLoad } from './$types';
import { wrapServerLoadWithSentry } from '@sentry/sveltekit';

export const load = wrapServerLoadWithSentry(async () => {
  return { projects };
}) satisfies PageServerLoad;