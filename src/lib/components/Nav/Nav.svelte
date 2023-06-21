<script lang="ts">
	import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import rough from 'roughjs';
  import { navItems as ni, type INavItem } from './nav-config';

  let navItems = [...ni];
  let mounted = false;
  let engagedItemTitle = '';
  let checkbox: HTMLInputElement;

  const engagedItemTitleVisibility = tweened(0, {
    duration: 200,
    easing: cubicInOut,
  });

  $: {
    if (mounted) {
      navItems = navItems.map((navItem) => {
        return {
          ...navItem,
          isActive: $page.url.pathname === navItem.href,
        }
      })
    }
  }

  onMount(() => {
    mounted = true;

    navItems.forEach((navItem) => {
      drawActiveSvg(navItem.name);
      drawEngageableSvg(navItem.name);
      drawLabelTextLine(navItem.name);
    });
  });

  function drawActiveSvg(name: string) {
    const id = `rough-${name}-active`;
    const svg = document.getElementById(id) as unknown as SVGSVGElement;
    removeChildren(svg);
    const rect = svg.getBoundingClientRect();
    const roughSvg = rough.svg(svg);

    const options = {
      stroke: 'oklch(80% 0.18 80.47)',
      strokeWidth: 2,
      roughness: 1.5,
    }

    const offset = 8;

    const line1 = roughSvg.line(offset, offset, (rect.width - offset), (rect.height - offset), options);
    const line2 = roughSvg.line((rect.width - offset), offset, offset, (rect.height - offset), options);
    svg.appendChild(line1);
    svg.appendChild(line2);
  };

  function drawEngageableSvg(name: string) {
    const id = `rough-${name}-engageable`;
    const svg = document.getElementById(id) as unknown as SVGSVGElement;
    removeChildren(svg);
    const roughSvg = rough.svg(svg);
    const circle = roughSvg.circle(25, 25, 40, {
      stroke: 'oklch(80% 0.18 80.47)',
      strokeWidth: 2,
      roughness: 1.5,
    });
    svg.appendChild(circle);
  };

  function drawLabelTextLine(name: string) {
    const id = `rough-${name}-label`;
    const svg = document.getElementById(id) as unknown as SVGSVGElement;
    removeChildren(svg);
    const rect = svg.getBoundingClientRect();
    const roughSvg = rough.svg(svg);

    const line = roughSvg.line(0, (rect.height / 2), rect.width, (rect.height / 2), {
      stroke: 'oklch(80% 0.18 80.47)',
      strokeWidth: 2,
      roughness: 1.5,
    });
    svg.appendChild(line);
  }

  function onEngaged(navItem: INavItem, engaged: boolean) {
    if (engaged && !navItem.isActive) {
      engagedItemTitle = navItem.desc;
      $engagedItemTitleVisibility = 1;
    } else {
      $engagedItemTitleVisibility = 0;
    }

    return () => {}
  }

  function onLinkClick() {
    checkbox.checked = false;
  }

  function onToggleChange(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      navItems.forEach((navItem) => {
        drawActiveSvg(navItem.name);
        drawEngageableSvg(navItem.name);
        drawLabelTextLine(navItem.name);
      });
    }
  }

  function removeChildren(el: SVGSVGElement) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
</script>

<svelte:head>
  {#each Object.values(navItems) as value}
    {#if value.isActive}
      <title>{value.title}</title>
    {/if}
  {/each}
</svelte:head>

<input
  type="checkbox"
  id="nav-checkbox"
  class="nav-checkbox"
  on:change={onToggleChange}
  bind:this={checkbox}
/>

<label for="nav-checkbox" class="nav-toggle" aria-label="navigation toggle">
  <span class="toggle-nav-open">
    <Icon icon="ion:menu-outline" />
  </span>
  <span class="toggle-nav-close">
    <Icon icon="ion:close-outline" />
  </span>
</label>

<div class="nav-overlay">
  <nav class="primary-nav">  
    {#each navItems as navItem}
      <div class="nav-item-container">
        <a
          class="nav-item-label-link {navItem.isActive ? 'active-label' : ''}"
          href={navItem.href}
          on:click={onLinkClick}
        >
          {navItem.desc}
          <svg id={`rough-${navItem.name}-label`} class="rough-label" />
        </a>
        <a
          id={navItem.name}
          href={navItem.href}
          class="nav-item-icon-link {navItem.isActive ? 'active' : ''}"
          aria-disabled={navItem.isActive}
          aria-labelledby={navItem.name}
          tabindex={navItem.isActive ? -1 : 0}
          on:click={onLinkClick}
          on:mouseenter={onEngaged(navItem, true)}
          on:mouseleave={onEngaged(navItem, false)}
          on:focus={onEngaged(navItem, true)}
          on:blur={onEngaged(navItem, false)}
        >
          <svg id="rough-{navItem.name}-active" class="rough-active" />
          <svg id="rough-{navItem.name}-engageable" class="rough-engageable" />
          <span>
            <Icon icon={navItem.icon} />
          </span>
        </a>
      </div>
    {/each}
    <div
      class="engaged-item-title"
      style="opacity: {$engagedItemTitleVisibility}; transform: translate3d({$engagedItemTitleVisibility * -20}px, 0, 0); transform-style: preserve-3d;"
    >
      {engagedItemTitle}
    </div>
  </nav>
</div>

<style lang="scss">
  .nav-checkbox {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 1;
    appearance: none;

    &:checked ~ .nav-toggle {
      .toggle-nav-open {
        display: none;
      }

      .toggle-nav-close {
        display: block;
      }
    }
  }

  .nav-toggle {
    position: relative;
    font-size: 2rem;
    color: white;
    line-height: 0;
    z-index: 1001;

    .toggle-nav-open {
      display: block;
    }

    .toggle-nav-close {
      display: none;
    }

    @media (min-width: 769px) {
      display: none;
    }
  }

  .nav-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: none;
    flex-grow: 1;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: .25s ease-in-out;

    @media (min-width: 769px) {
      position: static;
      display: block;
      flex-grow: 0;
      opacity: 1;
      visibility: visible;
    }
  }

  .nav-checkbox:checked ~ .nav-overlay,
  .nav-checkbox:checked ~ .nav-overlay {
    display: flex;
    visibility: visible;
    opacity: 1;
  }

  nav {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    padding: 4rem 1rem 1rem;
    /* background: oklch(0% 0 3 / 45%); */
    background-image: linear-gradient(0deg in oklab, oklch(0% 0 3 / 35%) 0%, oklch(0% 0 3 / 95%) 100%);

    @media (min-width: 769px) {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0;
      background: none;
    }
  }

  .nav-item-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .nav-item-label-link {
    position: relative;
    color: white;
    margin-right: 0.5rem;
    padding: 0 0.5rem;
    font-family: var(--font-primary);
    font-size: 0.9rem;
    text-decoration: none;

    &.active-label {
      .rough-label {
        opacity: 1;
        transition: opacity 0.25s ease-in-out;
      }
    }

    .rough-label {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      pointer-events: none;
    }

    @media (min-width: 769px) {
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 1px;
      opacity: 0;
      visibility: hidden;
    }
  }

  .nav-item-icon-link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    text-decoration: none;
    outline: none;

    &.active {
      pointer-events: none;

      * {
        pointer-events: none;
      }

      .rough-active {
        opacity: 1;
        transition: 0.15s opacity ease-in-out;
      }
    }

    &:not(.active):hover,
    &:not(.active):focus {
      .rough-engageable {
        opacity: 1;
        transition: 0.15s opacity ease-in-out;
      }
    }

    .rough-active {
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      width: 50px;
      height: 50px;
      transform: translate(-50%, -50%);
      transition: 0.15s opacity ease-in-out;
    }

    .rough-engageable {
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      width: 50px;
      height: 50px;
      transform: translate(-50%, -50%);
      transition: 0.15s opacity ease-in-out;
    }

    span {
      font-size: 2rem;
      color: white;
      transition: 0.25s ease-in-out;
      line-height: 0;
    }
  }

  .engaged-item-title {
    position: absolute;
    top: 100%;
    right: -20px;
    display: none;
    font-family: var(--font-primary);
    font-size: 0.8rem;
    color: var(--secondary-500);
    text-align: right;
    overflow: hidden;

    @media (min-width: 769px) {
      display: block;
    }
  }
</style>