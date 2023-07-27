<script lang="ts">
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

<div>Projects</div>