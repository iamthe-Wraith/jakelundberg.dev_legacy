<script lang="ts">
  import './global.css';
  import { PUBLIC_APP_ENV } from '$env/static/public';
  import Nav from '$components/Nav/Nav.svelte';
  import type { LayoutData } from './$types';
  import { setContext } from 'svelte';

  export let data: LayoutData;

  $: if (data?.quotes) setContext('quotes', data.quotes);
</script>

<svelte:head>
  {#if PUBLIC_APP_ENV === 'production'}
    <meta
      http-equiv="Content-Security-Policy"
      content="
        default-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        font-src 'self'; 
        connect-src http://jakelundberg.dev ws://jakelundberg.dev https://api.unisvg.com/ https://api.iconify.design/ *.sentry.io blob:; 
        img-src http://jakelundberg.dev https://res.cloudinary.com/dxpwpno1e/image/ blob:; 
        child-src blob:; 
        worker-src blob:;"
    >
  {/if}
</svelte:head>

<header>
  <div />
  <Nav />
</header>

<main>
  <slot />
</main>

<footer>
  <!-- place footer stuff here -->
</footer>

<style lang="scss">
  header,
  footer {
    position: fixed;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 3rem;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    z-index: 100;

    @media (min-width: 769px) {
      padding: 0.5rem 2rem;
    }
  }

  header {
    top: 0;
  }

  footer {
    bottom: 0;
  }

  main {
    width: 100vw;
    height: 100vh;
    padding: 3rem 1rem;
    overflow: hidden;
  }
</style>
