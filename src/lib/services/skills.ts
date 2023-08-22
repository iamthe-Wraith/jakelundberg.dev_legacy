import { skills } from '$lib/data/skills';
import type { ISkill } from '$lib/types/skills';

export function getSkills(): Promise<ISkill[]> {
	// fakes the promise for now. will retrieve from a database later
	return Promise.resolve(skills);
}
