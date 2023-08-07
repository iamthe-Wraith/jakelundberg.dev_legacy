<script lang="ts">
	import { onMount } from "svelte";
  import rough from 'roughjs';
	import { secondaryColor } from "$lib/constants/colors";
	import { removeChildren } from "$lib/utils/dom";

  const maxAttempts = 10;

  onMount(() => {
    drawArrows();
  });

  function drawArrows(count = 0) {
    const id = `scroll-arrow`;
    const svg = document.getElementById(id) as unknown as SVGSVGElement;

    if (!svg && count < maxAttempts) {
      // wait for element to exist
      setTimeout(() => drawArrows(count + 1), 100);
      return;
    }

    if (!svg) return;
    removeChildren(svg);
    const rect = svg.getBoundingClientRect();
    const roughSvg = rough.svg(svg);

    const options = {
      stroke: secondaryColor,
      strokeWidth: 2,
      roughness: 1.5,
    }

    const offset = 4;

    const line1 = roughSvg.line(offset, offset, ((rect.width - offset) / 2), (rect.height - offset), options);
    const line2 = roughSvg.line(rect.width - offset, offset, ((rect.width - offset) / 2), (rect.height - offset), options);
    svg.appendChild(line1);
    svg.appendChild(line2);
  }
</script>

<div class="scroll-down">
  <svg id="scroll-arrow" />
</div>

<style lang="scss">
  @keyframes hover-up-and-down {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-1rem);
    }

    100% {
      transform: translateY(0);
    }
  }

  .scroll-down {
    width: 4rem;
    height: 2rem;
    animation: hover-up-and-down 1.5s infinite ease-in-out;

    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>