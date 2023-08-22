<script lang="ts">
	import { assets } from '$app/paths';
	import type { ISkill } from '$lib/types/skills';
	import { getContext } from 'svelte';

	const skills = getContext<ISkill[]>('skills');
</script>

<div class="skills">
	{#each skills || [] as skill}
		<div class="skill">
			<div class="skill-logo">
				<img src={`${assets}/skills/${skill.image}`} alt={`${skill.name} logo`} />
			</div>
			<div class="skill-details">
				<p class="skill-name">{skill.name}</p>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.skills {
		padding: 0 0 2rem;
		column-count: 1;

		@media (min-width: 768px) {
			padding: 0 1rem 2rem;
			column-count: 2;
		}
	}

	.skill {
		display: flex;
		align-items: center;

		&:not(:last-child) {
			margin-bottom: 1rem;
		}

		.skill-logo {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 4rem;
			height: 4rem;
			padding: 0.5rem;
			border: 3px solid var(--dark-500);
			border-top-left-radius: 250px 15px;
			border-top-right-radius: 15px 250px;
			border-bottom-right-radius: 250px 15px;
			border-bottom-left-radius: 15px 250px;
			background: var(--dark-300);
			z-index: 1;

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				transform: rotate(-3deg);
			}

			@media (min-width: 768px) {
				width: 5rem;
				height: 5rem;
			}
		}

		.skill-details {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			margin-left: -0.25rem;
			padding: 0.25rem 0.5rem;
			border: 3px solid var(--dark-500);
			border-top-left-radius: 250px 15px;
			border-top-right-radius: 15px 250px;
			border-bottom-right-radius: 250px 15px;
			border-bottom-left-radius: 15px 250px;

			p {
				font-size: 0.8rem;
				text-indent: 0;
			}

			@media (min-width: 768px) {
				padding: 0.5rem;

				p {
					font-size: 1rem;
				}
			}
		}
	}
</style>
