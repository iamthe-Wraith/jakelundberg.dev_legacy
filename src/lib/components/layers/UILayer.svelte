<div class="layer ui-layer">
  <slot />
</div>

<style lang="scss">
  .ui-layer {
    position: fixed;
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