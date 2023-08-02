<script lang="ts">
	import { onMount } from "svelte";
  import type { PageData } from './$types';
  import rough from 'roughjs';
  import Loading from "$components/Loading.svelte";
  import UiLayer from "$components/layers/UILayer.svelte";
	import CemetaryWelcome from "$components/scenes/Cemetery/CemeteryWelcome.svelte";
  import Cemetery from "$components/scenes/Cemetery/Cemetery.svelte";
  import type { ILoad } from "$components/scenes/types";
	import { processError } from "$lib/utils/errors";
	import type { IProject } from "$lib/types/projects";
	import { removeChildren } from "$lib/utils/dom";
	import { secondaryColor } from "$lib/constants/colors";

  export let data: PageData;

  let mounted = false;
  let amountLoaded = 0;
  let totalToLoad = 0;
  let displayUI = false;
  let displayScene = true;

  let selectedProject: IProject | null;

  $: displayUI = !!amountLoaded && !!totalToLoad && amountLoaded >= totalToLoad;

  $: {
    if (mounted && displayUI && data.projects?.length) {
      drawRoughSeps();
    }
  }

  onMount(() => {
    mounted = true;

    return () => {
      mounted = false;
    }
  })

  function drawRoughSeps(count = 0) {
    const seps = document.querySelectorAll('.rough-sep');

    // hack to get around timing issue of seps being rendered
    if (!seps.length && count < 10) {
      setTimeout(() => drawRoughSeps(count + 1), 1000);
      return;
    }

    console.log('>>>>> seps: ', seps, data.projects);

    for (let i = 0; i < seps.length; i++) {
      console.log('drawing sep');
      const sep = seps[i] as unknown as SVGSVGElement;
      removeChildren(sep);
      const rect = sep.getBoundingClientRect();
      const roughSvg = rough.svg(sep);

      const options = {
        stroke: secondaryColor,
        strokeWidth: 2,
        roughness: 1.5,
      }

      const offset = 5;

      const line1 = roughSvg.line(offset, offset, (rect.width - offset), offset, options);
      sep.appendChild(line1);
    }
  }

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

  function selectProject(project: IProject) {
    selectedProject = project;
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
          {#each data.projects as project, i }
            <div class="project">
              <button
                class="project-title header-font {project.title === selectedProject?.title ? 'selected' : ''}"
                disabled={project.title === selectedProject?.title}
                on:click={() => selectProject(project)}
              >
                {project.title}
              </button>
              <h2>{project.title}</h2>
              {#if i < data.projects.length - 1}
                <svg class="rough-sep" id="rough-sep-{project.id}" />
              {/if}
            </div>
          {/each}
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
    width: 100%;
    min-height: 100%;

    @media (min-width: 768px) {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      max-width: 400px;
    }
  }

  .welcome-mobile {
    display: flex;
    height: 100%;
    min-height: 100%;

    @media (min-width: 768px) {
      display: none;
    }
  }

  .welcome-desktop {
    display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
  

    @media (min-width: 768px) {
      display: flex;
    }
  }

  .project {
    position: relative;
    padding: 1rem 0;

    h2 {
      font-size: 1.3rem;
      line-height: 1.7rem;

      @media (min-width: 768px) {
        display: none;
      }
    }

    button {
      display: none;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      border: none;
      background: none;

      &:hover {
        cursor: pointer;
      }

      @media (min-width: 768px) {
        display: block;
      }
    }

    .rough-sep {
      position: absolute;
      top: calc(100% - 0.5rem);
      left: 50%;
      width: 150px;
      height: 14px;
      transform: translateX(-50%);
    }
  }

  .details {
    display: none;
    flex: 1;
    justify-content: center;
    align-items: center;
    border-left: 1px solid var(--dark-500);

    @media (min-width: 768px) {
      display: flex;
    }
  }
</style>