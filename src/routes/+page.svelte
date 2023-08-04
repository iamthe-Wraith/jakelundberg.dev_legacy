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
        <h1><span>Hi, I'm</span>Jake Lundberg<span>.</span></h1>
        <p class="subheader header-font">I build stuff for the web.</p>
        <p class="intro-text">I'm a software engineer with an uncommon passion for what I do. There are few things that bring me as much joy as digging into complex problems to find elegant solutions, or brainstorming with smart people to find the idea that will make someone's life better.</p>
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
    width: 100%;
    height: 100%;
    align-items: center;
  }

  .greeting {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 90vw;
    max-width: 45rem;
    padding: 3rem 2rem 2rem;
    border: 1px solid var(--dark-500);
    border-radius: 0.75rem;
    background-color: oklch(0% 0 0 / 0.75);

    h1 {
      position: relative;
      color: var(--primary-500);

      span {
        color: var(--light-500);
        font-weight: 400;
        font-size: 2rem;
        line-height: 1rem;

        &:first-child {
          position: absolute;
          bottom: 100%;
          left: 0;
          font-size: 1.2rem;
        }
      }
    }

    .subheader {
      margin: 1rem 0 1.5rem;
      font-size: 1.3rem;
      text-indent: 0;
    }

    @media (min-width: 768px) {
      align-items: center;
      width: 50vw;
      background-color: oklch(0% 0 0 / 0.65);
    }
  }
</style>