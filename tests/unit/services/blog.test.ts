import { beforeAll, afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { getBlogPosts, getRecentBlogPosts } from '$lib/services/blog';

global.fetch = vi.fn();

const mockBlogPosts = [
	{
		type_of: 'article',
		id: 1,
		title: 'Blog Post 1',
		description: 'this is a blog post...',
		published: true,
		published_at: '2023-04-22T13:23:18.359Z',
		slug: 'blog-post-1',
		path: '/wraith/blog-post-1',
		url: 'https://dev.to/wraith/blob-post-1',
		comments_count: 0,
		public_reactions_count: 2,
		page_views_count: 116,
		published_timestamp: '2023-04-22T13:23:18Z',
		body_markdown: 'Some content...',
		positive_reactions_count: 2,
		cover_image:
			'https://res.cloudinary.com/practicaldev/image/fetch/s--pfm-ctOu--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3edpm5mnelsshp9h64dz.jpg',
		tag_list: ['svelte', 'webdev'],
		canonical_url: 'https://dev.to/wraith/blog-post-1',
		reading_time_minutes: 8,
		user: {
			name: 'Jake Lundberg',
			username: 'wraith',
			twitter_username: null,
			github_username: 'iamthe-Wraith',
			user_id: 1023909,
			website_url: null,
			profile_image:
				'https://res.cloudinary.com/practicaldev/image/fetch/s--aghmJdku--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1023909/cb8b60bf-80e4-4c84-a573-b81b8282055d.png',
			profile_image_90:
				'https://res.cloudinary.com/practicaldev/image/fetch/s--UuYCbUQk--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1023909/cb8b60bf-80e4-4c84-a573-b81b8282055d.png'
		}
	},
	{
		type_of: 'article',
		id: 2,
		title: 'Blog Post 2',
		description: 'this is another blog post...',
		published: true,
		published_at: '2023-04-22T13:23:18.359Z',
		slug: 'blog-post-2',
		path: '/wraith/blog-post-2',
		url: 'https://dev.to/wraith/blob-post-2',
		comments_count: 0,
		public_reactions_count: 8,
		page_views_count: 123,
		published_timestamp: '2023-04-22T13:23:18Z',
		body_markdown: 'Some different content...',
		positive_reactions_count: 8,
		cover_image:
			'https://res.cloudinary.com/practicaldev/image/fetch/s--pfm-ctOu--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3edpm5mnelsshp9h64dz.jpg',
		tag_list: ['svelte', 'webdev'],
		canonical_url: 'https://dev.to/wraith/blog-post-2',
		reading_time_minutes: 6,
		user: {
			name: 'Jake Lundberg',
			username: 'wraith',
			twitter_username: null,
			github_username: 'iamthe-Wraith',
			user_id: 1023909,
			website_url: null,
			profile_image:
				'https://res.cloudinary.com/practicaldev/image/fetch/s--aghmJdku--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1023909/cb8b60bf-80e4-4c84-a573-b81b8282055d.png',
			profile_image_90:
				'https://res.cloudinary.com/practicaldev/image/fetch/s--UuYCbUQk--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1023909/cb8b60bf-80e4-4c84-a573-b81b8282055d.png'
		}
	},
	{
		type_of: 'discussion',
		id: 3,
		title: 'Discussion 1',
		description: 'this is a discussion...',
		published: true,
		published_at: '2023-04-22T13:23:18.359Z',
		slug: 'discussion-1',
		path: '/wraith/discussion-1',
		url: 'https://dev.to/wraith/discussion-1',
		comments_count: 0,
		public_reactions_count: 2,
		page_views_count: 116,
		published_timestamp: '2023-04-22T13:23:18Z',
		body_markdown: 'Some content...',
		positive_reactions_count: 2,
		cover_image:
			'https://res.cloudinary.com/practicaldev/image/fetch/s--pfm-ctOu--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3edpm5mnelsshp9h64dz.jpg',
		tag_list: ['svelte', 'webdev'],
		canonical_url: 'https://dev.to/wraith/blog-post-1',
		reading_time_minutes: 8,
		user: {
			name: 'Jake Lundberg',
			username: 'wraith',
			twitter_username: null,
			github_username: 'iamthe-Wraith',
			user_id: 1023909,
			website_url: null,
			profile_image:
				'https://res.cloudinary.com/practicaldev/image/fetch/s--aghmJdku--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1023909/cb8b60bf-80e4-4c84-a573-b81b8282055d.png',
			profile_image_90:
				'https://res.cloudinary.com/practicaldev/image/fetch/s--UuYCbUQk--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1023909/cb8b60bf-80e4-4c84-a573-b81b8282055d.png'
		}
	}
];

export const handlers = [
	rest.get('https://dev.to/api/articles/me', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockBlogPosts));
	})
];

export const server = setupServer(...handlers);

describe('Dev.to Service', () => {
	beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
	afterAll(() => server.close());
	afterEach(() => server.resetHandlers());

	describe('getBlogPosts', () => {
		it('should return an array of blog posts', async () => {
			const blogPosts = await getBlogPosts();

			expect(blogPosts.length).toEqual(2);

			expect(blogPosts[0].type_of).toEqual(mockBlogPosts[0].type_of);
			expect(blogPosts[0].id).toEqual(mockBlogPosts[0].id);
			expect(blogPosts[0].title).toEqual(mockBlogPosts[0].title);
			expect(blogPosts[0].description).toEqual(mockBlogPosts[0].description);
			expect(blogPosts[0].published).toEqual(mockBlogPosts[0].published);
			expect(blogPosts[0].published_at).toEqual(mockBlogPosts[0].published_at);
			expect(blogPosts[0].slug).toEqual(mockBlogPosts[0].slug);
			expect(blogPosts[0].path).toEqual(mockBlogPosts[0].path);
			expect(blogPosts[0].url).toEqual(mockBlogPosts[0].url);
			expect(blogPosts[0].comments_count).toEqual(mockBlogPosts[0].comments_count);
			expect(blogPosts[0].public_reactions_count).toEqual(mockBlogPosts[0].public_reactions_count);
			expect(blogPosts[0].page_views_count).toEqual(mockBlogPosts[0].page_views_count);
			expect(blogPosts[0].published_timestamp).toEqual(mockBlogPosts[0].published_timestamp);
			expect(blogPosts[0].body_markdown).toEqual(mockBlogPosts[0].body_markdown);
			expect(blogPosts[0].positive_reactions_count).toEqual(
				mockBlogPosts[0].positive_reactions_count
			);
			expect(blogPosts[0].cover_image).toEqual(mockBlogPosts[0].cover_image);
			expect(blogPosts[0].tag_list).toEqual(mockBlogPosts[0].tag_list);
			expect(blogPosts[0].canonical_url).toEqual(mockBlogPosts[0].canonical_url);
			expect(blogPosts[0].reading_time_minutes).toEqual(mockBlogPosts[0].reading_time_minutes);
			expect(blogPosts[0].user).toEqual(mockBlogPosts[0].user);

			expect(blogPosts[1].type_of).toEqual(mockBlogPosts[1].type_of);
			expect(blogPosts[1].id).toEqual(mockBlogPosts[1].id);
			expect(blogPosts[1].title).toEqual(mockBlogPosts[1].title);
			expect(blogPosts[1].description).toEqual(mockBlogPosts[1].description);
			expect(blogPosts[1].published).toEqual(mockBlogPosts[1].published);
			expect(blogPosts[1].published_at).toEqual(mockBlogPosts[1].published_at);
			expect(blogPosts[1].slug).toEqual(mockBlogPosts[1].slug);
			expect(blogPosts[1].path).toEqual(mockBlogPosts[1].path);
			expect(blogPosts[1].url).toEqual(mockBlogPosts[1].url);
			expect(blogPosts[1].comments_count).toEqual(mockBlogPosts[1].comments_count);
			expect(blogPosts[1].public_reactions_count).toEqual(mockBlogPosts[1].public_reactions_count);
			expect(blogPosts[1].page_views_count).toEqual(mockBlogPosts[1].page_views_count);
			expect(blogPosts[1].published_timestamp).toEqual(mockBlogPosts[1].published_timestamp);
			expect(blogPosts[1].body_markdown).toEqual(mockBlogPosts[1].body_markdown);
			expect(blogPosts[1].positive_reactions_count).toEqual(
				mockBlogPosts[1].positive_reactions_count
			);
			expect(blogPosts[1].cover_image).toEqual(mockBlogPosts[1].cover_image);
			expect(blogPosts[1].tag_list).toEqual(mockBlogPosts[1].tag_list);
			expect(blogPosts[1].canonical_url).toEqual(mockBlogPosts[1].canonical_url);
			expect(blogPosts[1].reading_time_minutes).toEqual(mockBlogPosts[1].reading_time_minutes);
			expect(blogPosts[1].user).toEqual(mockBlogPosts[1].user);
		});
	});

	describe('getRecentBlogPosts', () => {
		it('should return an array of blog posts', async () => {
			const blogPosts = await getRecentBlogPosts();

			expect(blogPosts.length).toEqual(2);

			expect(blogPosts[0].id).toEqual('blog-post-1');
			expect(blogPosts[0].title).toEqual('Blog Post 1');
			expect(blogPosts[0].description).toEqual('this is a blog post...');
			expect(blogPosts[0].url).toEqual('https://dev.to/wraith/blob-post-1');
			expect(blogPosts[0].tags).toEqual(['svelte', 'webdev']);

			expect(blogPosts[1].id).toEqual('blog-post-2');
			expect(blogPosts[1].title).toEqual('Blog Post 2');
			expect(blogPosts[1].description).toEqual('this is another blog post...');
			expect(blogPosts[1].url).toEqual('https://dev.to/wraith/blob-post-2');
			expect(blogPosts[1].tags).toEqual(['svelte', 'webdev']);
		});
	});
});
