<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from '@rgossiaux/svelte-headlessui';
  import rough from 'roughjs';
  import HandDrawnContainer from '../HandDrawnContainer.svelte';
  import { mainMenu } from '$lib/stores/main-menu';
  import Close from '../buttons/Close.svelte';
  import Icon from '@iconify/svelte';
  import { removeChildren } from '$lib/utils/dom';
  import { secondaryColor } from '$lib/constants/colors';
	import Details from './Details.svelte';
	import Skills from './Skills.svelte';

  const animationDuration = 200;

  const overlayStyles = `
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
  `;

  $: {
    if ($mainMenu.isOpen) {
      drawRoughOptionXs();
      drawRoughOptionLines();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', onKeyDown);
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if ($mainMenu.isOpen) {
          mainMenu.close();
        } else {
          mainMenu.open();
        }
      }
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  function drawRoughOptionLines(count = 0) {
    const svgs = document.querySelectorAll('.main-menu-rough-engageable-option-dt');

    // hack to get around timing issue of svgs being rendered
    if (!svgs.length && count < 10) {
      setTimeout(() => drawRoughOptionLines(count + 1), 100);
      return;
    }

    if (!svgs.length) return;

    for (let i = 0; i < svgs.length; i++) {
      const svg = svgs[i] as unknown as SVGSVGElement;
      removeChildren(svg);
      const rect = svg.getBoundingClientRect();
      const roughSvg = rough.svg(svg);

      const line = roughSvg.line(0, (rect.height / 2), rect.width, (rect.height / 2), {
        stroke: secondaryColor,
        strokeWidth: 2,
        roughness: 1.5,
      });
      svg.appendChild(line);
    }
  }

  function drawRoughOptionXs(count = 0) {
    const svgs = document.querySelectorAll('.main-menu-rough-engageable-option');

    // hack to get around timing issue of svgs being rendered
    if (!svgs.length && count < 10) {
      setTimeout(() => drawRoughOptionXs(count + 1), 100);
      return;
    }

    if (!svgs.length) return;

    for (let i = 0; i < svgs.length; i++) {
      const svg = svgs[i] as unknown as SVGSVGElement;
      removeChildren(svg);
      const rect = svg.getBoundingClientRect();
      const roughSvg = rough.svg(svg);

      const options = {
        stroke: secondaryColor,
        strokeWidth: 2,
        roughness: 1.5,
      }

      const offset = 4;

      const line1 = roughSvg.line(offset, offset, (rect.width - offset), (rect.height - offset), options);
      const line2 = roughSvg.line((rect.width - offset), offset, offset, (rect.height - offset), options);
      svg.appendChild(line1);
      svg.appendChild(line2);
    }
  }
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
          <header>
            <DialogTitle class="main-menu-title">Main Menu</DialogTitle>
            <DialogDescription class="main-menu-description">
              Press ESC key to close.
            </DialogDescription>
          </header>
          
          <main>
            <TabGroup class="main-menu-tab-group">
              <TabList class="main-menu-options">
                <Tab class={({selected}) => selected ? "main-menu-option-selected" : ""}>
                  <Icon icon="ion:construct-outline" />
                  <span>Skills</span>
                  <svg class="main-menu-rough-engageable-option" />
                  <svg class="main-menu-rough-engageable-option-dt" />
                </Tab>
                <Tab class={({selected}) => selected ? "main-menu-option-selected" : ""}>
                  <Icon icon="ion:help" />
                  <span>Secrets Found</span>
                  <svg class="main-menu-rough-engageable-option" />
                  <svg class="main-menu-rough-engageable-option-dt" />
                </Tab>
                <Tab class={({selected}) => selected ? "main-menu-option-selected" : ""}>
                  <Icon icon="ion:mail-outline" />
                  <span>Get in Touch</span>
                  <svg class="main-menu-rough-engageable-option" />
                  <svg class="main-menu-rough-engageable-option-dt" />
                </Tab>
                <Tab class={({selected}) => selected ? "main-menu-option-selected" : ""}>
                  <Icon icon="ion:people-outline" />
                  <span>Social</span>
                  <svg class="main-menu-rough-engageable-option" />
                  <svg class="main-menu-rough-engageable-option-dt" />
                </Tab>
              </TabList>
              <TabPanels class="main-menu-selected-option-details">
                <TabPanel>
                  <Details title="Skills">
                    <Skills />
                  </Details>
                </TabPanel>
                <TabPanel>
                  <Details title="Secrets Found">
                    some secrets...
                  </Details>
                </TabPanel>
                <TabPanel>
                  <Details title="Get in Touch">
                    get in touch...
                  </Details>
                </TabPanel>
                <TabPanel>
                  <Details title="Social">
                    social stuff...
                  </Details>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </main>

          <div class="main-menu-close-btn">
            <Close
              id="main-menu-close-btn"
              on:click={() => mainMenu.close()}
            />
          </div>
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

    @media (min-width: 768px) {
      max-width: 40rem;
      max-height: 30rem;
    }
  }

  .main-menu {
    --header-height: 3.5rem;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    .main-menu-close-btn {
      position: absolute;
      top: -1rem;
      right: -1rem;
    }

    header {
      width: 100%;
      height: var(--header-height);
      overflow: hidden;
    }

    main {
      width: 100%;
      height: calc(100% - var(--header-height));
    }

    @media (min-width: 768px) {
      --header-height: 4.5rem;
    }
  }

  .main-menu-rough-engageable-option {
    position: absolute;
    top: 0;
    left: 50%;
    width: 2.5rem;
    height: 2.5rem;
    opacity: 0;
    transform: translateX(-50%);

    @media (min-width: 768px) {
      display: none;
    }
  }

  .main-menu-rough-engageable-option-dt {
    position: absolute;
    bottom: 0;
    right: 1rem;
    display: none;
    width: 50%;
    height: 10px;
    opacity: 0;
    transition: top 0.25s ease-in-out, right 0.25s ease-in-out, opacity 0.25s ease-in-out;

    @media (min-width: 768px) {
      display: block;
    }
  }

  /*
    must use * :global(...) to style components
    imported from @rgossiaux/svelte-headlessui

    using the * ensures these :global styles are
    still scoped to this component.
   */
  * :global(.main-menu-title) {
    color: var(--primary-500);
  }

  * :global(.main-menu-description) {
    display: none;
    color: var(--light-100);
    font-size: 0.9rem;
    font-style: italic;
    text-align: center;

    @media (min-width: 768px), (hover: hover), (-moz-touch-enabled: 0), (pointer:fine) {
      display: block;
    }
  }

  * :global(.main-menu-tab-group) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    @media (min-width: 768px) {
      flex-direction: row;
      padding-top: 1rem;
    }
  }

  * :global(.main-menu-options) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    padding: 1rem 0;
    border: none;
    border-top: 1px solid var(--dark-500);
    border-bottom: 1px solid var(--dark-500);

    @media (min-width: 768px) {
      flex-direction: column;
      justify-content: flex-start;
      flex-wrap: nowrap;
      width: 11rem;
      padding: 0 1rem 0 0;
      border: none;
      border-right: 1px solid var(--dark-500);
    }
  }

  * :global(.main-menu-options button) {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 4rem;
    font-size: 1.5rem;
    background: none;
    border: none;
    outline: none;

    &:hover {
      cursor: pointer;
    }

    @media (min-width: 768px) {
      flex-direction: row-reverse;
      width: 100%;
      padding: 0.5rem 0;
      font-size: 1.25rem;
      text-align: right;
    }
  }

  * :global(.main-menu-options button:not(.main-menu-option-selected):hover .main-menu-rough-engageable-option),
  * :global(.main-menu-options button:not(.main-menu-option-selected):focus .main-menu-rough-engageable-option),
  * :global(.main-menu-options button.main-menu-option-selected .main-menu-rough-engageable-option) {
    opacity: 1;
  }

  * :global(.main-menu-options button:not(.main-menu-option-selected):hover .main-menu-rough-engageable-option-dt),
  * :global(.main-menu-options button:not(.main-menu-option-selected):focus .main-menu-rough-engageable-option-dt),
  * :global(.main-menu-options button.main-menu-option-selected .main-menu-rough-engageable-option-dt) {
    right: 0;
    opacity: 1;
  }

  * :global(.main-menu-options button span) {
    margin-top: 0.25rem;
    font-size: 0.75rem;

    @media (min-width: 768px) {
      margin-top: 0;
      margin-right: 0.5rem;
      font-size: 0.9rem;
      text-align: left;
    }
  }

  * :global(.main-menu-selected-option-details) {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem 0 0;
    overflow: hidden;

    @media (min-width: 768px) {
      padding: 0 0 0 1rem;
    }
  }

  * :global(.main-menu-selected-option-details h3) {
    font-size: 1.75rem;
    line-height: 1.75rem;
  }

  * :global(.main-menu-selected-option-details > div) {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-height: 100%;
  }
</style>