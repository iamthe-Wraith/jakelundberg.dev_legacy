<script lang="ts">
	import Rain from '$components/Rain.svelte';
  import { MousePos } from '$lib/stores/mouse';
	import { onMount } from 'svelte';

  const config = {
    parallax: {
      enabled: true,
      layers: {
        1: {
          threshold: 0.004,
        },
        2: {
          threshold: 0.002,
        },
        3: {
          threshold: 0.001,
        },
        4: {
          threshold: 0.0005,
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
    alt="A forest of leafless trees surrounding a dark path that forks to the left and right after a short distance."
  />

  <img
    class="layer forest-layer-3"
    src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1687102029/forest-layer-3_mmcl3h.png"
    style={`
      transform: translate3d(${parallax.forestLayer3.x}%, ${parallax.forestLayer3.y}%, 0);
      transform-style: preserve-3d;
      backface-visibility: hidden;
    `}
    alt="A forest of leafless trees surrounding a dark path that forks to the left and right after a short distance."
  />

  <img
    class="layer forest-layer-2"
    src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1687102029/forest-layer-2_q0k1gq.png"
    style={`
      transform: translate3d(${parallax.forestLayer2.x}%, ${parallax.forestLayer2.y}%, 0);
      transform-style: preserve-3d;
      backface-visibility: hidden;
    `}
    alt="A forest of leafless trees surrounding a dark path that forks to the left and right after a short distance."
  />

  <img
    class="layer forest-layer-1"
    src="https://res.cloudinary.com/dxpwpno1e/image/upload/v1687102029/forest-layer-1_xr7zlr.png"
    style={`
      transform: translate3d(${parallax.forestLayer1.x}%, ${parallax.forestLayer1.y}%, 0);
      transform-style: preserve-3d;
      backface-visibility: hidden;
    `}
    alt="A forest of leafless trees surrounding a dark path that forks to the left and right after a short distance."
  />

  <div class="layer rain-layer">
    <Rain maxDrops={10} />
  </div>

  <div class="layer ui-layer">
    <div class="ui-header">

    </div>
    <div class="ui-main">
      <div class="greeting">
        <h1>Lorem ipsum <span>dolor sit amet</span>.</h1>
      </div>
    </div>
    <div class="ui-footer">
      
    </div>
  </div>
</div>

<style lang="scss">
  .scene-container {
    width: 100vw;
    height: 100vh;
    background: #16171c;
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

  .ui-layer {
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    margin: 0;
    z-index: 10;
  }

  .ui-header,
  .ui-footer {
    height: 7vh;
    background: oklch(27.94% 0 314 / 50%)
  }

  .ui-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .greeting {
    width: 90vw;

    h1 {
      color: white;
      font-size: 2rem;
      text-align: center;

      span {
        color: #1d9227;
      }
    }

    @media (min-width: 768px) {
      width: 50vw;

      h1 {
        font-size: 3rem;
      }
    }
  }

  .rain-layer {
    top: 0;
    left: 0;
    margin: 0;
    z-index: 6;
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