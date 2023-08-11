<script lang="ts">
	import { onMount } from "svelte";
  import rough from 'roughjs';
	import { removeChildren } from "$lib/utils/dom";
	import { dark500, secondaryColor } from "$lib/constants/colors";

  export let id = `button-${crypto.randomUUID()}`;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let kind: 'primary' | 'secondary' | 'neutral' = 'primary';
  export let size: 'small' | 'large' = 'large'
  export let className: string = '';
  export let disabled = false;

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
    const offset = 5;
    const rectangle = roughSvg.rectangle(offset, offset, rect.width - (offset * 2), rect.height - (offset * 2), {
      stroke: outlineStroke,
      strokeWidth: 2,
      roughness: 1.5,
    });
    svg.appendChild(rectangle);
  }
</script>

<button
  {id}
  {type}
  {disabled}
  class={`${kind} ${size} ${className}`}
  on:click
>
  <slot />
  <svg />
</button>

<style lang="scss">
  button {
    position: relative;
    background: none;
    border: none;
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
    }

    &.large {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    &.primary {
      background: var(--primary-500);
      color: var(--light-500);
    }

    &.secondary {
      background: var(--secondary-500);
      color: var(--dark-500);
    }

    &.neutral {
      background: var(--light-500);
      color: var(--dark-500);
    }

    svg {
      --button-svg-offset: 10px;

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