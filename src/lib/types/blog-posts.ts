// https://developers.forem.com/api/v1#tag/articles/operation/getUserArticles
export interface IDevToUser {
	github_username: string | null;
	name: string;
	profile_image_90: string;
	profile_image: string;
	twitter_username: string | null;
	username: string;
	website_url: string | null;
}

// https://developers.forem.com/api/v1#tag/articles/operation/getUserArticles
export interface IDevToBlogPost {
	body_markdown: string;
	canonical_url: string;
	comments_count: number;
	cover_image: string;
	created_at: string;
	crossposted_at: string | null;
	description: string | null;
	edited_at: string | null;
	id: number;
	last_comment_at: string;
	page_views_count: number;
	path: string;
	positive_reactions_count: number;
	public_reactions_count: number;
	published_at: string;
	published_timestamp: string;
	published: boolean;
	readable_publish_date: string;
	reading_time_minutes: number;
	slug: string;
	social_image: string;
	tag_list: string[];
	tags: string;
	title: string;
	type_of: string;
	url: string;
	user: IDevToUser;
}

export interface IBlogPost {
	id: string;
	title: string;
	description: string;
	url: string;
	tags: string[];
}
