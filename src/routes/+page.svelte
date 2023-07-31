<script lang="ts">
	import Loading from '$components/Loading.svelte';
  import UiLayer from '$components/layers/UILayer.svelte';
  import Forest from '$components/scenes/Forest.svelte';
	import type { ILoad } from '$components/scenes/types';
  
  let amountLoaded = 0;
  let totalToLoad = 0;
  let isLoaded = false;
  let displayScene = true;

  $: {
    isLoaded = !!amountLoaded && !!totalToLoad && amountLoaded >= totalToLoad;
  }

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

    amountLoaded = l.loaded;
    totalToLoad = l.total;
  }
</script>

{#if displayScene}
  <Forest
    onLoad={onSceneLoad}
    onError={onSceneError}
  />
{/if}

{#if isLoaded}
  <UiLayer>
    <div class="ui-main">
      <div class="greeting">
        <h1>Lorem ipsum <span>dolor sit amet</span>.</h1>
      </div>
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