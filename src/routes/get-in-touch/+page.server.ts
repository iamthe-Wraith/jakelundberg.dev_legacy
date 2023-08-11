import type { Actions } from '@sveltejs/kit';
import { parseFormData } from '$lib/helpers/request';
import type { IGetInTouchEmailRequest } from '$lib/types/email';
import { sendGetInTouchEmail } from '$lib/services/email';

export const actions = {
  default: async ({ request }) => {
    try {
      const data = await parseFormData<IGetInTouchEmailRequest>(request);
      return await sendGetInTouchEmail(data);
    } catch (err: any) {
      console.error(err);
      return { status: 'error', error: err.message };
    }
  },
} satisfies Actions;
