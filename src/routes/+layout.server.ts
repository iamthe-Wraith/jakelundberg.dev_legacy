import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import type { LayoutServerLoad } from './$types';
import type { IQuote } from '$lib/types/quotes';

const quotes: IQuote[] = [
  {
    quote: 'Great things are done by a series of small things put together.',
    author: 'Vincent van Gogh',
  },
  {
    quote: 'If insight becomes a threat to your academic or writing success, you\'re doing it wrong.',
    author: 'Sönke Ahrens',
  },
  {
    quote: 'If you can\'t say it clearly you don\'t understand it yourself.',
    author: 'John Searle',
  },
];

export const load = wrapServerLoadWithSentry(async () => {
  return { quotes };
}) satisfies LayoutServerLoad;