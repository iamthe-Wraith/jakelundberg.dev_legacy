import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import type { PageServerLoad } from './$types';
import { articles } from './articles';
import { books } from './books';

export const load = wrapServerLoadWithSentry(async () => {
  return { articles, books };
}) satisfies PageServerLoad;