<script lang="ts">
	import { getRandom } from "$lib/utils/number";

  export let hoverable = false;
  export let hovered = false;
  export let thickness = 3;
  export let type: 'primary' | 'secondary' | 'neutral' = 'neutral';
  export let background: 'transparent' | 'semi-transparent' | 'opaque' = 'semi-transparent';

  const minorRadius = getRandom(13, 19);
  const majorRadius = getRandom(230, 260);
</script>

<div
  class="hand-drawn-container {hovered ? 'hovered' : ''} {hoverable ? 'hoverable' : ''} {type} {background}"
  on:mouseenter
  on:mouseleave
  style="
    border-width: {thickness}px;
    border-top-left-radius: {majorRadius}px {minorRadius}px;
    border-top-right-radius: {minorRadius}px {majorRadius}px;
    border-bottom-right-radius: {majorRadius}px {minorRadius}px;
    border-bottom-left-radius: {minorRadius}px {majorRadius}px;
  "
>
  <slot />
</div>

<style lang="scss">
  .hand-drawn-container {
    width: var(--hand-drawn-container-width);
    height: var(--hand-drawn-container-height);
    padding: 1rem 1.5rem;
    border-style: solid;
    transition: border-color 0.25s ease-in-out;

    @keyframes wiggle {
      0% {
        transform: rotate(-0.6deg);
      }

      50% {
        transform: rotate(0.6deg);
      }

      100% {
        transform: rotate(-0.6deg);
      }
    }

    &.hoverable {
      &.primary.hovered,
      &.secondary.hovered,
      &.primary:hover,
      &.secondary:hover {
        border-color: var(--dark-500);
        animation: wiggle 0.5s ease-in-out infinite;
      }

      &.neutral.hovered,
      &.neutral:hover {
        border-color: var(--secondary-500);
        animation: wiggle 0.5s ease-in-out infinite;
      }
    }

    &.primary {
      border-color: var(--primary-500);
    }

    &.secondary {
      border-color: var(--secondary-500);
    }

    &.neutral {
      border-color: var(--dark-500);
    }

    &.transparent {
      background: none;
    }

    &.semi-transparent {
      background: oklch(0% 0 0 / 0.5);
    }

    &.opaque {
      background: oklch(0% 0 0 / 1);
    }
  }
</style>