<script lang="ts">
	import { onMount } from 'svelte';
	import { nanoid } from 'nanoid';
	import rough from 'roughjs';
	import { removeChildren } from '$lib/utils/dom';
	import { dark500, secondaryColor } from '$lib/constants/colors';
	import { getRandomNum } from '$lib/utils/number';

	export let id = `button-${nanoid()}`;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let kind: 'primary' | 'secondary' | 'neutral' = 'primary';
	export let size: 'small' | 'large' = 'large';
	export let className = '';
	export let disabled = false;

	const minorRadius = getRandomNum(13, 19);
	const majorRadius = getRandomNum(230, 260);
	const outlineStroke = kind === 'primary' || kind === 'neutral' ? secondaryColor : dark500;

	onMount(() => {
		drawOutline();
	});

	function drawOutline(count = 0) {
		const svg = document.querySelector(`#${id} svg`) as unknown as SVGSVGElement;

		if (!svg) {
			if (count < 10) setTimeout(() => drawOutline(count + 1), 100);
			return;
		}

		removeChildren(svg);
		const rect = svg.getBoundingClientRect();
		const roughSvg = rough.svg(svg);
		const offset = 8;
		const rectangle = roughSvg.rectangle(
			offset,
			offset,
			rect.width - offset * 2,
			rect.height - offset * 2,
			{
				stroke: outlineStroke,
				strokeWidth: 2,
				roughness: 1.5
			}
		);
		svg.appendChild(rectangle);
	}
</script>

<button
	{id}
	{type}
	{disabled}
	class={`${kind} ${size} ${className}`}
	style="
    border-top-left-radius: {majorRadius}px {minorRadius}px;
    border-top-right-radius: {minorRadius}px {majorRadius}px;
    border-bottom-right-radius: {majorRadius}px {minorRadius}px;
    border-bottom-left-radius: {minorRadius}px {majorRadius}px;
  "
	on:click
>
	<slot />
	<svg />
</button>

<style lang="scss">
	button {
		position: relative;
		background: none;
		border-style: solid;
		border-radius: 0.25rem;
		outline: none;

		&:hover,
		&:focus {
			cursor: pointer;

			svg {
				opacity: 1;
			}
		}

		&:disabled {
			opacity: 0.5;
		}

		&.small {
			padding: 0.25rem 0.5rem;
			font-size: 0.75rem;
			border-width: 2px;
		}

		&.large {
			padding: 0.5rem 1rem;
			font-size: 1rem;
			border-width: 3px;
		}

		&.primary {
			border-color: var(--primary-500);
			background: var(--primary-500);
			color: var(--light-500);
		}

		&.secondary {
			border-color: var(--secondary-500);
			background: var(--secondary-500);
			color: var(--dark-500);
		}

		&.neutral {
			border-color: var(--light-500);
			background: var(--light-500);
			color: var(--dark-500);
		}

		svg {
			--button-svg-offset: 24px;

			position: absolute;
			top: calc(var(--button-svg-offset) / 2 * -1);
			left: calc(var(--button-svg-offset) / 2 * -1);
			width: calc(100% + var(--button-svg-offset));
			height: calc(100% + var(--button-svg-offset));
			z-index: 1;
			opacity: 0;
		}
	}
</style>
