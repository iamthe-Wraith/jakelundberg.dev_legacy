import { getLearning } from '$lib/services/github';
import { json } from '@sveltejs/kit';

export async function GET() {
	const readingList = await getLearning();
	return json(readingList);
}
