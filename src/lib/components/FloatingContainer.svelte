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
	export let translate = '-50%, -50%';
</script>

<div
	class="floating-container"
	style="top: {top}; right: {right}; bottom: {bottom}; left: {left}; transform: translate({translate})"
>
	<div class="floating-container-inner" transition:scale={{ delay, duration, start, opacity }}>
		<slot />
	</div>
</div>

<style>
	.floating-container {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}
</style>
