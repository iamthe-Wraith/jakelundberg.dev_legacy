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
	export let rotate3d = '0, 0, 0, 0';
	export let translate3d = '-50%, -50%, 0';
	export let transformOrigin = 'center center';
</script>

<div
	class="floating-container"
	transition:scale={{ delay, duration, start, opacity }}
	style="top: {top}; right: {right}; bottom: {bottom}; left: {left}; transform-origin: {transformOrigin}; transform: perspective(500px)  rotate3d({rotate3d}) translate3d({translate3d})"
>
	<slot />
</div>

<style>
	.floating-container {
		position: absolute;
		z-index: 1;
	}
</style>
