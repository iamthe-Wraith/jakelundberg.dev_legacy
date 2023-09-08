<script>
	import { scale } from 'svelte/transition';

	export let delay = 0;
	export let duration = 800;
	export let start = 1.65;
	export let opacity = 0;
	export let top = '50%';
	export let right = 'auto';
	export let bottom = 'auto';
	export let left = '50%';
	export let translateX = '-50%';
	export let translateY = '-50%';
</script>

<div
	class="floating-container"
	transition:scale={{ delay, duration, start, opacity }}
	style="top: {top}; right: {right}; bottom: {bottom}; left: {left}; transform: translate({translateX}, {translateY})"
>
	<slot />
</div>

<style>
	.floating-container {
		position: absolute;
		z-index: 1;
	}
</style>
