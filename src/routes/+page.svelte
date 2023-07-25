<script lang="ts">
  import Forest from '$components/scenes/Forest.svelte';
  import Rain from '$components/Rain.svelte';
</script>

<Forest />

<div class="layer rain-layer">
  <!-- <Rain maxDrops={50} /> -->
</div>

<div class="layer ui-layer">
  <div class="ui-main">
    <div class="greeting">
      <h1>Lorem ipsum <span>dolor sit amet</span>.</h1>
    </div>
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
        color: var(--primary-500);
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