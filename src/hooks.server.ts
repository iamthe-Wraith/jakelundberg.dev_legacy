import * as Sentry from '@sentry/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';
import type { HandleServerError } from '@sveltejs/kit';

const errorHandler = (({ error, event }) => {
  console.error('An error occurred on the server side:', error, event);
}) satisfies HandleServerError;

Sentry.init({
  dsn: PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});

import { handleErrorWithSentry } from '@sentry/sveltekit';

export const handleError = handleErrorWithSentry(errorHandler);
export const handle = sequence(Sentry.sentryHandle());