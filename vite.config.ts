import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from '@sentry/sveltekit';
import { defineConfig } from 'vitest/config';
import { searchForWorkspaceRoot } from 'vite';

export default defineConfig({
  plugins: [
    sentrySvelteKit(), 
    sveltekit(),
  ],
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'jsdom',
    globals: true,
  },
  root: '.',
  server: {
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
      ]
    }
  }
});
