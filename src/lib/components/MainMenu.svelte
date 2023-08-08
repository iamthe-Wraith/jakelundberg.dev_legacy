<script lang="ts">
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
  } from "@rgossiaux/svelte-headlessui";
  import HandDrawnContainer from "./HandDrawnContainer.svelte";
	import { mainMenu } from "$lib/stores/main-menu";

  let isVisible = false;

  const animationDuration = 200;

  const overlayStyles = `
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
  `;

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
  <Dialog
    open={$mainMenu.isOpen} 

    class="dialog"
    static
  >
    <div
      class="main-menu-overlay" 
      transition:fade={{ duration: animationDuration }}
    >
      <DialogOverlay
        style={overlayStyles}
      />
    </div>

    <div
      class="main-menu-container"
      transition:fly={{ y: -50, duration: animationDuration }}
    >
      <HandDrawnContainer>
        <div class="main-menu">
          <DialogTitle>Main Menu</DialogTitle>
          <DialogDescription>
            <p>Press ESC key or Clost button to close.</p>
          </DialogDescription>
        </div>
      </HandDrawnContainer>
    </div>
  </Dialog>
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
    --hand-drawn-container-width: 100%;
    --hand-drawn-container-height: 100%;

    position: fixed;
    top: 50%;
    left: 50%;
    width: 96vw;
    height: 98vh;
    z-index: 1001;
    transform: translate(-50%, -50%);

    @media (min-width: 769px) {
      max-width: 40rem;
      max-height: 20rem;
    }
  }

  .main-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>