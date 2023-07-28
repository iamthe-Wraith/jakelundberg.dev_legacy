<script lang="ts">
	import UiLayer from "$components/layers/UILayer.svelte";
import Cemetery from "$components/scenes/Cemetery.svelte";
	import type { ILoad } from "$components/scenes/types";

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
  <Cemetery
    onLoad={onSceneLoad}
    onError={onSceneError}
  />
{/if}

<UiLayer>
  <div class="ui-main">
    <h1>projects</h1>
  </div>
</UiLayer>

<style lang="scss">
  .ui-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    color: white;
    font-size: 2rem;
    text-align: center;

    span {
      color: var(--primary-500);
    }
  }
</style>