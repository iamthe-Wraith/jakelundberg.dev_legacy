import { DEV_TO_API_KEY } from '$env/static/private';
import type { IBlogPost, IDevToBlogPost } from '$lib/types/blog-posts';

export async function getBlogPosts(page = 1, perPage = 30): Promise<IDevToBlogPost[]> {
	const res = await fetch(`https://dev.to/api/articles/me?page=${page}&per_page=${perPage}`, {
		headers: {
			'api-key': DEV_TO_API_KEY,
			'Content-Type': 'application/json'
		}
	});

	const posts = await res.json();

	return posts.filter((post: any) => post.type_of === 'article');
}

export async function getRecentBlogPosts(count = 3): Promise<IBlogPost[]> {
	const posts = await getBlogPosts();

	return posts
		.filter((post: any) => post.type_of === 'article')
		.filter((post: any, i: number) => i < count)
		.map((post: any) => ({
			id: `blog-post-${post.id}`,
			title: post.title,
			description: post.description,
			url: post.url,
			tags: post.tag_list || []
		}));
}
