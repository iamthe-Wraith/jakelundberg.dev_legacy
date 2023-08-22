import { recommendations } from '$lib/data/recommendations';
import { getAllRecommendations, getRandomRecommendations } from '$lib/services/recommendations';
import { describe, expect, it } from 'vitest';

describe('Recommendations Service', () => {
	describe('getAllRecommendations', () => {
		it('should return an array of all recommendations', async () => {
			const recs = await getAllRecommendations();

			expect(recs.length).toEqual(recommendations.length);

			for (let i = 0; i < recs.length; i++) {
				expect(recs[i].id).toEqual(recommendations[i].id);
				expect(recs[i].author).toEqual(recommendations[i].author);
				expect(recs[i].image_path).toEqual(recommendations[i].image_path);
				expect(recs[i].html).toEqual(recommendations[i].html);
			}
		});
	});

	describe('getRandomRecommendations', () => {
		it('should return an array of N random recommendations where N is the number passed as an argument', async () => {
			const recs = await getRandomRecommendations(3);

			expect(recs.length).toEqual(3);

			for (let i = 0; i < recs.length; i++) {
				expect(recs).toContainEqual(recs[i]);
			}
		});

		it('should return all recommendations in random order if count argument is greater than total of all recommendations', async () => {
			const recs = await getRandomRecommendations(100);

			expect(recs.length).toEqual(recommendations.length);

			for (let i = 0; i < recs.length; i++) {
				expect(recs).toContainEqual(recs[i]);
			}
		});
	});
});
