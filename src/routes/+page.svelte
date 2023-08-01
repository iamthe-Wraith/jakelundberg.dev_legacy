<script lang="ts">
  import Forest from '$components/scenes/Forest.svelte';
  import type { ILoad } from '$components/scenes/types';
  import UILayer from '$components/layers/UILayer.svelte';
  
  let displayScene = true;

  let loaded = 0;
  let total = 0;

  function onSceneError(error: Error) {
    console.error(error);
    displayScene = false;
  }

  function onSceneLoad(loading: Record<string, ILoad>) {
    const l = Object.values(loading).reduce((acc, curr) => {
      acc.loaded += curr.loaded;
      acc.total += curr.total;
      return acc;
    }, {
      loaded: 0,
      total: 0
    });

    loaded = l.loaded;
    total = l.total;

    console.log((loaded / total) * 100 + '% loaded');
  }
</script>

{#if displayScene}
  <Forest
    onLoad={onSceneLoad}
    onError={onSceneError}
  />
{/if}

<UILayer>
  <div class="ui-main">
    <div class="greeting">
      <h1>Lorem ipsum <span>dolor sit amet</span>.</h1>
    </div>
  </div>
</UILayer>

<style lang="scss">
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