import { writable } from 'svelte/store';
import type { IQuote } from '$lib/types/quotes';

function createQuotesStore() {
  const { subscribe, set } = writable<IQuote[] | null>(null);

  return {
    subscribe,
    set: (quotes: IQuote[]) => set(quotes),
    reset: () => set(null)
  };
}

export const quotes = createQuotesStore();