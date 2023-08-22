<script lang="ts">
	import { removeChildren } from '$lib/utils/dom';
	import rough from 'roughjs';
	import Icon from '@iconify/svelte';
	import { secondaryColor } from '$lib/constants/colors';
	import { onMount } from 'svelte';

	export let id: string = crypto.randomUUID();

	onMount(() => {
		drawRoughEngageables();
	});

	function drawRoughEngageables(count = 0) {
		const svg = document.querySelector(`#${id} .rough-engageable`) as unknown as SVGSVGElement;

		// hack to get around timing issue of seps being rendered
		if (!svg && count < 10) {
			setTimeout(() => drawRoughEngageables(count + 1), 100);
			return;
		}

		if (!svg) return;

		const rect = svg.getBoundingClientRect();

		removeChildren(svg);
		const roughSvg = rough.svg(svg);
		const circle = roughSvg.circle(rect.width / 2, rect.height / 2, rect.width - 10, {
			stroke: secondaryColor,
			strokeWidth: 2,
			roughness: 1.5
		});
		svg.appendChild(circle);
	}
</script>

<button {id} class="close" on:click>
	<Icon icon="ion:close" />
	<svg class="rough-engageable" />
</button>

<style lang="scss">
	.close {
		position: relative;
		width: 3rem;
		height: 3rem;
		padding: 0.5rem;
		font-size: 2rem;
		outline: none;
		border: none;
		background: none;

		&:hover,
		&:focus {
			.rough-engageable {
				opacity: 1;
			}
		}

		.rough-engageable {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			transition: opacity 0.25s ease-in-out;
		}
	}
</style>
