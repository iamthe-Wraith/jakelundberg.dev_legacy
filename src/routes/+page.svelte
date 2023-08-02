<script lang="ts">
  import Forest from '$components/scenes/Forest.svelte';
  import type { ILoad } from '$components/scenes/types';
  import UILayer from '$components/layers/UILayer.svelte';
  import Loading from '$components/Loading.svelte';
  import { getContext } from 'svelte';
  import type { IQuote } from '$lib/types/quotes';
	import { processError } from '$lib/utils/errors';
  
  let amountLoaded = 0;
  let totalToLoad = 0;
  let displayUI = false;
  let displayScene = true;

  const quotes = getContext<IQuote[]>('quotes');

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
    displayUI = !!amountLoaded && !!totalToLoad && amountLoaded >= totalToLoad;
  }
</script>

{#if displayScene}
  <Forest
    onLoad={onSceneLoad}
    onError={onSceneError}
  />
{/if}

{#if displayUI}
  <UILayer>
    <div class="ui-main">
      <div class="greeting">
        <h1>Lorem ipsum <span>dolor sit amet</span>.</h1>
      </div>
    </div>
  </UILayer>
{:else}
  <Loading {quotes} />
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

    @media (min-width: 768px) {
      width: 50vw;
    }
  }
</style>