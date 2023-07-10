export interface IBook {
  title: string;
  author: string;
  url: string;
  cover: string;
  description: string;
}

export const books: IBook[] =[
  {
    title: 'How to Take Smart Notes',
    author: 'Sönke Ahrens',
    url: 'https://www.goodreads.com/book/show/34507927-how-to-take-smart-notes',
    cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1496027154l/34507927._SY475_.jpg',
    description: 'This book is a must-read for anyone who wants to write, think, or learn. It will transform the way you work and learn.',
  }
];