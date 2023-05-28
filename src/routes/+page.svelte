<script lang="ts">
  import tree1 from '$assets/tree-1.png';
  import { MousePos } from '$lib/stores/mouse';
	import { onMount } from 'svelte';

  const layer1ParallaxThreshold = 0.04;

  const config = {
    parallax: {
      enabled: true,
      layers: {
        1: {
          threshold: layer1ParallaxThreshold,
        },
      },
    }
  }

  const parallax = {
    tree1: { x: 0, y: 0 },
  }

  $: {
    parallax.tree1 = {
      x: $MousePos.relativeCoords.x * config.parallax.layers[1].threshold,
      y: $MousePos.relativeCoords.y * config.parallax.layers[1].threshold
    }
  }
</script>

<img
  class="tree1"
  src={tree1}
  style={`transform: translate3d(calc(-45% + ${parallax.tree1.x}px), ${parallax.tree1.y}px, 0);`}
  alt="A crooked, leafless tree with a few branches rising from a barren mound of soil with a few small patches of grass."
/>

<style>
  .tree1 {
    position: absolute;
    top: 0;
    left: 0;
    height: 107%;
  }
</style>