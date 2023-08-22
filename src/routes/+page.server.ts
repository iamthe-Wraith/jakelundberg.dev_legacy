import type { PageServerLoad } from './$types';
import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import { processError } from '$lib/utils/errors';
import { getRecentBlogPosts } from '$lib/services/blog';
import type { IBlogPost } from '$lib/types/blog-posts';
import type { IRecommendation } from '$lib/types/recommendations';
import { getRandomRecommendations } from '$lib/services/recommendations';

interface IHomepageData {
	blog_posts?: IBlogPost[];
	recommendations?: IRecommendation[];
}

export const load = wrapServerLoadWithSentry(async () => {
	const data: IHomepageData = {};

	try {
		const results = await Promise.allSettled([getRecentBlogPosts(3), getRandomRecommendations(3)]);

		if (results[0].status === 'fulfilled') {
			data.blog_posts = results[0].value;
		}

		if (results[1].status === 'fulfilled') {
			data.recommendations = results[1].value;
		}

		return data;
	} catch (err) {
		processError(err as Error, () => {
			console.error('Error getting blog posts: ', err);
		});
	}

	return data;
}) satisfies PageServerLoad;
