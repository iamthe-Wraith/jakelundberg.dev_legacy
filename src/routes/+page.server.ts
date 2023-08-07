import type { PageServerLoad } from './$types';
import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import { processError } from '$lib/utils/errors';
import { getRecentBlogPosts } from '$lib/services/blog';
import type { IBlogPost } from '$lib/types/blog-posts';

interface IHomepageData {
  blog_posts?: IBlogPost[];
}

export const load = wrapServerLoadWithSentry(async () => {
  const data: IHomepageData = {};

  try {
    const blogPosts = await getRecentBlogPosts(3);
    data.blog_posts = blogPosts;
  } catch (err) {
    processError(err as Error, () => {
      console.error('Error getting blog posts: ', err);
    });
  }

  return data;
}) satisfies PageServerLoad;