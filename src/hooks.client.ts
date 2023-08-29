import * as Sentry from '@sentry/sveltekit';
import { PUBLIC_SENTRY_DSN, PUBLIC_APP_ENV } from '$env/static/public';
import type { HandleClientError } from '@sveltejs/kit';

const errorHandler = (({ error, event }) => {
	console.error('An error occurred on the client side:', error, event);
}) satisfies HandleClientError;

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	environment: PUBLIC_APP_ENV,
	tracesSampleRate: 0.25,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
	integrations: [new Sentry.Replay()]
});

export const handleError = Sentry.handleErrorWithSentry(errorHandler);
