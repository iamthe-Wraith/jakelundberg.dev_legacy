import { captureException } from '@sentry/sveltekit';

export const processError = (error: Error, cb: (e: Error) => void) => {
  try {
    captureException(error);
  } finally {
    cb(error);
  }
};