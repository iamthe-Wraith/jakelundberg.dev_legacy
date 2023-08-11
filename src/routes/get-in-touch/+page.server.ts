import { fail, type Actions } from '@sveltejs/kit';
import { parseFormData } from '$lib/helpers/request';
import type { IGetInTouchEmailRequest } from '$lib/types/email';
import { sendGetInTouchEmail } from '$lib/services/email';
import { ApiError } from '$lib/models/ApiError';

export const actions = {
  default: async ({ request }) => {
    try {
      const data = await parseFormData<IGetInTouchEmailRequest>(request);
      await sendGetInTouchEmail(data);
    } catch (err: any) {
      const error = err instanceof ApiError
        ? err
        : new ApiError('Error authenticating user.', 500);
      
      return fail(error.status, (error as ApiError).toJSON());
    }
  },
} satisfies Actions;
