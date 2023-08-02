<div class="layer ui-layer">
  <slot />
</div>

<style lang="scss">
  .ui-layer {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    z-index: 10;
    overflow: auto;
  }
</style>