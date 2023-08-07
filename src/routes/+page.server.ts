import type { PageServerLoad } from './$types';
import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import { DEV_TO_API_KEY } from '$env/static/private';

interface IBlogPost {
  title: string;
  description: string;
  url: string;
  tags: string[];
}

interface IHomepageData {
  blog_posts?: IBlogPost[];
}

export const load = wrapServerLoadWithSentry(async () => {
  const data: IHomepageData = {};

  try {
    const res = await fetch('https://dev.to/api/articles/me?page=1&per_page=10', {
      headers: {
        'api-key': DEV_TO_API_KEY,
        'Content-Type': 'application/json',
      }
    });

    const posts = await res.json();

    // get 3 most recent blog posts
    const [first, second, third] = posts
      .filter((post: any) => post.type_of === 'article')
      .map((post: any) => ({
        title: post.title,
        description: post.description,
        url: post.url,
        tags: post.tag_list || [],
      }));

    data.blog_posts = [first, second, third];
  } catch (err) {
    console.log('error: ', err);
  }

  return data;
}) satisfies PageServerLoad;