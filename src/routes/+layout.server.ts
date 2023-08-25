import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import type { LayoutServerLoad } from './$types';
import { quotes } from '$lib/data/quotes';
import type { IQuote } from '$lib/types/quotes';
import { getSkills } from '$lib/services/skills';
import { processError } from '$lib/utils/errors';
import type { ISkill } from '$lib/types/skills';
import { getDevice, type IDevice } from '$lib/utils/device';

interface IData {
	quotes?: IQuote[];
	skills?: ISkill[];
	device?: IDevice;
}

export const load = wrapServerLoadWithSentry(async ({ request }) => {
	const data: IData = {};

	try {
		const results = await Promise.allSettled([getSkills()]);

		if (results[0].status === 'fulfilled') {
			data.skills = results[0].value;
		}

		data.device = getDevice(request.headers.get('user-agent')!);
		data.quotes = quotes;
	} catch (err) {
		processError(err as Error, () => {
			console.error('Error in layout data retrieval');
			console.error(err);
		});
	}

	return data;
}) satisfies LayoutServerLoad;
