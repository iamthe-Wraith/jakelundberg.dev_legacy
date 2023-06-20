<script lang="ts">
  import { MousePos } from '$lib/stores/mouse';
	import { onMount } from 'svelte';

  const config = {
    parallax: {
      enabled: true,
      layers: {
        1: {
          threshold: -0.003,
        },
        2: {
          threshold: -0.0015,
        },
        3: {
          threshold: -0.001,
        },
        4: {
          threshold: -0.0005,
        },
      },
    }
  }

  let parallax = {
    forestLayer1: { x: 0, y: 0 },
    forestLayer2: { x: 0, y: 0 },
    forestLayer3: { x: 0, y: 0 },
    forestLayer4: { x: 0, y: 0 },
  }

  let prefersReducedMotion = true;

  $: {
    if (!prefersReducedMotion) {
      parallax = {
        forestLayer1: {
          x: $MousePos.relativeCoords.x * config.parallax.layers[1].threshold,
          y: $MousePos.relativeCoords.y * config.parallax.layers[1].threshold
        },
        forestLayer2: {
          x: $MousePos.relativeCoords.x * config.parallax.layers[2].threshold,
          y: $MousePos.relativeCoords.y * config.parallax.layers[2].threshold
        },
        forestLayer3: {
          x: $MousePos.relativeCoords.x * config.parallax.layers[3].threshold,
          y: $MousePos.relativeCoords.y * config.parallax.layers[3].threshold
        },
        forestLayer4: {
          x: $MousePos.relativeCoords.x * config.parallax.layers[4].threshold,
          y: $MousePos.relativeCoords.y * config.parallax.layers[4].threshold
        }
      }
    }
  }

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  })
</script>

<div class="scene-container">
  <img
    class="layer forest-layer-4"
    src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1687102029/forest-layer-4_nyo3ko.png"
    style={`
      transform: translate3d(${parallax.forestLayer4.x}%, ${parallax.forestLayer4.y}%, 0);
      transform-style: preserve-3d;
      backface-visibility: hidden;
    `}
    alt="The silhouette of a forest, barely visible against the night sky."
  />

  <img
    class="layer forest-layer-3"
    src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1687102029/forest-layer-3_mmcl3h.png"
    style={`
      transform: translate3d(${parallax.forestLayer3.x}%, ${parallax.forestLayer3.y}%, 0);
      transform-style: preserve-3d;
      backface-visibility: hidden;
    `}
    alt="A forest of leafless tress, faintly illuminated by the moonlight. 2 paths rest among them, one to the left and one to the right."
  />

  <img
    class="layer forest-layer-2"
    src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1687102029/forest-layer-2_q0k1gq.png"
    style={`
      transform: translate3d(${parallax.forestLayer2.x}%, ${parallax.forestLayer2.y}%, 0);
      transform-style: preserve-3d;
      backface-visibility: hidden;
    `}
    alt="The beginning of a forest of leafless trees surrounding a dark path that forks to the left and right after a short distance."
  />

  <img
    class="layer forest-layer-1"
    src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1687102029/forest-layer-1_xr7zlr.png"
    style={`
      transform: translate3d(${parallax.forestLayer1.x}%, ${parallax.forestLayer1.y}%, 0);
      transform-style: preserve-3d;
      backface-visibility: hidden;
    `}
    alt="Leafless branches stretching out from the left and right of the screen, illuminated by the moonlight."
  />
</div>

<style lang="scss">
  .scene-container {
    width: 100vw;
    height: 100vh;
    background: #16171c;
    background-image: linear-gradient(360deg in oklch, oklch(20% 0.01 273) 13% 13%, oklch(15% 0.00 284) 113% 113%);
  }

  .layer {
    position: fixed;
    top: -1.5%;
    left: -1.5%;
    display: block;
    width: 106%;
    height: 106%;
    margin: -1.5%;
    object-fit: cover;
  }

  .forest-layer-1 {
    z-index: 5;
  }

  .forest-layer-2 {
    z-index: 4;
  }

  .forest-layer-3 {
    z-index: 3;
  }

  .forest-layer-4 {
    z-index: 2;
  }
</style>