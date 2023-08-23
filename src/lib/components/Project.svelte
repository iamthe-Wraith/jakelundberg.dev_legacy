<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fly, fade } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import type { IProject } from '$lib/types/projects';
	import Tag from './Tag.svelte';

	export let project: IProject;
	export let transitionDelay = 100;
	export let transitionDuration = 300;
	export let onClose: () => void;
</script>

<div
	class="project"
	in:fly={{
		delay: transitionDelay,
		duration: transitionDuration,
		x: 0,
		y: -100,
		opacity: 0,
		easing: quintOut
	}}
	out:fade={{ duration: transitionDelay }}
>
	<button class="close" on:click={onClose}>
		<Icon icon="ion:close" />
		<svg class="rough-engageable-link" />
	</button>

	<h2>{project.title}</h2>

	<div class="tags">
		{#each project.tags as tag}
			<Tag>{tag}</Tag>
		{/each}
	</div>

	<div class="desc">
		{@html project.desc}
	</div>

	<div class="engageables">
		<div class="links">
			{#each Object.entries(project.urls) as [key, url]}
				<a class="link" href={url} target="_blank" rel="noopener noreferrer">
					{#if key === 'github'}
						<Icon icon="ion:logo-github" />
					{:else if key === 'download'}
						<Icon icon="ion:cloud-download-outline" />
					{:else}
						<Icon icon="ion:browsers" />
					{/if}
					<svg class="rough-engageable-link" />
				</a>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
</style>
