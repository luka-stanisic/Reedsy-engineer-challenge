import { Comment } from './comment';

export class Book {
	rank?: number;
	author: string;
	cover: string;
	rating: string;
	slug: string;
	synopsis: string;
	title: string;
	upvoted: boolean;
	upvotes: number;
	comments?: Comment[];
}
