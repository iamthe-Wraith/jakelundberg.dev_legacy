import { recommendations } from '$lib/data/recommendations';
import type { IRecommendation } from '$lib/types/recommendations';
import { getRandomNum } from '$lib/utils/number';

export function getAllRecommendations(): Promise<IRecommendation[]> {
  // fakes the promise for now. will be replaced with api call later
  return Promise.resolve(recommendations);
}

export async function getRandomRecommendations(count = 3): Promise<IRecommendation[]> {
  const shuffled = await recommendations.sort(() => 0.5 - getRandomNum());
  return shuffled.slice(0, count);
}