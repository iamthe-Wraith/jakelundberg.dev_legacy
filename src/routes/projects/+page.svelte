<script lang="ts">
  import Loading from "$components/Loading.svelte";
  import UiLayer from "$components/layers/UILayer.svelte";
	import CemetaryWelcome from "$components/scenes/Cemetery/CemeteryWelcome.svelte";
  import Cemetery from "$components/scenes/Cemetery/Cemetery.svelte";
  import type { ILoad } from "$components/scenes/types";
	import { processError } from "$lib/utils/errors";
  import type { PageData } from './$types';

  export let data: PageData;

  let amountLoaded = 0;
  let totalToLoad = 0;
  let displayUI = false;
  let displayScene = true;

  const selectedProject = null;

  $: {
    console.log('data: ', data);
  }

  $: displayUI = !!amountLoaded && !!totalToLoad && amountLoaded >= totalToLoad;

  function onSceneError(error: Error) {
    processError(error, () => {
      displayScene = false;
      displayUI = true;
    });
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
  <Cemetery
    onLoad={onSceneLoad}
    onError={onSceneError}
  />
{/if}

{#if displayUI}
  <UiLayer>
    <div class="ui-main">
      <div class="left-col">
        <div class="welcome-mobile">
          <CemetaryWelcome />
        </div>

        <div class="projects">

        </div>
      </div>
      <div class="details">
        {#if selectedProject}
          <div>selected project goes here...</div>
        {:else}
          <div class="welcome-desktop">
            <CemetaryWelcome />
          </div>
        {/if}
      </div>
    </div>
  </UiLayer>
{:else}
  <Loading />
{/if}

<style lang="scss">
  .ui-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .left-col {
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
      justify-content: flex-start;
      align-items: flex-start;
      max-width: 400px;
    }
  }

  .welcome-mobile {
    display: flex;
    height: 100%;

    @media (min-width: 768px) {
      display: none;
    }
  }

  .welcome-desktop {
    display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  

    @media (min-width: 768px) {
      display: flex;
    }
  }

  .details {
    display: none;
    flex: 1;
    border-left: 1px solid var(--dark-500);

    @media (min-width: 768px) {
      display: flex;
    }
  }
</style>