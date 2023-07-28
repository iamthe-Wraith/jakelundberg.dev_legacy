<div class="layer ui-layer">
  <slot />
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
</style>