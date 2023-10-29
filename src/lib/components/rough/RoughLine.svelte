<script lang="ts">
	import { secondary500Color } from '$lib/constants/colors';
	import { removeChildren } from '$lib/utils/dom';
	import rough from 'roughjs';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let id: string;
	export let width = '100%';

	onMount(() => {
		drawRoughLine(id);
	});

	function drawRoughLine(id: string, count = 0) {
		const svg = document.getElementById(id) as unknown as SVGSVGElement;

		if (!svg) {
			if (count > 10) return;

			return setTimeout(() => {
				drawRoughLine(id, count + 1);
			}, 50);
		}

		removeChildren(svg);
		const rect = svg.getBoundingClientRect();
		const roughSvg = rough.svg(svg);

		const line = roughSvg.line(0, rect.height / 2, rect.width, rect.height / 2, {
			stroke: secondary500Color,
			strokeWidth: 2,
			roughness: 1.5
		});
		svg.appendChild(line);
	}
</script>

<svg {id} transition:fade={{ duration: 200 }} style="width: {width}" />

<style>
	svg {
		display: block;
		height: 14px;
	}
</style>
