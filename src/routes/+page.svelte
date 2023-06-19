<script lang="ts">
	import ParallaxForest from '$components/scenes/ParallaxForest.svelte';
  import Rain from '$components/Rain.svelte';
</script>

<ParallaxForest />

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

<style lang="scss">
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

  .rain-layer {
    top: 0;
    left: 0;
    margin: 0;
    z-index: 6;
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
</style>