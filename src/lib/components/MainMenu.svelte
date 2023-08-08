<script lang="ts">
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
  import HandDrawnContainer from "./HandDrawnContainer.svelte";
	import { mainMenu } from "$lib/stores/main-menu";

  let isVisible = false;

  const animationDuration = 200;

  onMount(() => {
    window.addEventListener("keydown", onKeyDown);
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        isVisible = !isVisible;

        if (isVisible) {
          mainMenu.open();
        } else {
          mainMenu.close();
        }
      }
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });
</script>

{#if $mainMenu.isOpen}
  <div
    class="main-menu-overlay" 
    transition:fade={{ duration: animationDuration }}
  />

  <div
    class="main-menu-container"
    transition:fly={{ y: -50, duration: animationDuration }}
  >
    <HandDrawnContainer>
      <div class="main-menu">
        main menu goes here...
      </div>
    </HandDrawnContainer>
  </div>
{/if}

<style lang="scss">
  .main-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: oklch(0% 0 0 / 0.5);
    backdrop-filter: blur(10px);
  }

  .main-menu-container {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1001;
    transform: translate(-50%, -50%);
  }

  .main-menu {
    width: 96vw;
    max-width: 40rem;
    height: 100vh;
    max-height: 20rem;
  }
</style>