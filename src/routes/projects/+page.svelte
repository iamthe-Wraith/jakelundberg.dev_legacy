<script lang="ts">
	import Loading from "$components/Loading.svelte";
import UiLayer from "$components/layers/UILayer.svelte";
  import Cemetery from "$components/scenes/Cemetery.svelte";
  import type { ILoad } from "$components/scenes/types";
  import type { PageData } from './$types';

  export let data: PageData;

  let amountLoaded = 0;
  let totalToLoad = 0;
  let isLoaded = false;
  let displayScreen = true;

  $: {
    console.log('data: ', data);
  }

  $: isLoaded = !!amountLoaded && !!totalToLoad && amountLoaded >= totalToLoad;

  function onSceneError(error: Error) {
    console.error(error);
    displayScreen = false;
    isLoaded = true;
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

    amountLoaded = l.loaded;
    totalToLoad = l.total;
  }
</script>

{#if displayScreen} 
  <Cemetery
    onLoad={onSceneLoad}
    onError={onSceneError}
  />
{/if}

{#if isLoaded}
  <UiLayer>
    <div class="ui-main">
      <h1>projects</h1>
    </div>
  </UiLayer>
{:else}
  <Loading />
{/if}

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