export interface IArticle {
	title: string;
	author: string;
	url: string;
	description: string;
}

export const articles: IArticle[] = [
	{
		title: 'How to Take Smart Notes',
		author: 'Sönke Ahrens',
		url: 'https://www.goodreads.com/book/show/34507927-how-to-take-smart-notes',
		description:
			'This book is a must-read for anyone who wants to write, think, or learn. It will transform the way you work and learn.'
	}
];
