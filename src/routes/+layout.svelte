<script lang="ts">
  import './global.css';
  import { PUBLIC_APP_ENV } from '$env/static/public';
  import Nav from '$components/Nav/Nav.svelte';
  import type { LayoutData } from './$types';
  import { setContext } from 'svelte';
  import MainMenu from '$components/MainMenu/MainMenu.svelte';
  import PressEscape from '$components/MainMenu/PressEscape.svelte';
	import Toast from '$components/modals/Toast.svelte';

  export let data: LayoutData;

  $: if (data?.quotes) setContext('quotes', data.quotes);
  $: if (data?.skills) setContext('skills', data.skills);
</script>

<svelte:head>
  {#if PUBLIC_APP_ENV === 'production'}
    <meta
      http-equiv="Content-Security-Policy"
      content="
        default-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        font-src 'self'; 
        connect-src https://jakelundberg.dev ws://jakelundberg.dev https://api.unisvg.com/ https://api.iconify.design/ *.sentry.io blob:; 
        img-src https://jakelundberg.dev https://res.cloudinary.com/dxpwpno1e/image/ blob:; 
        child-src blob:; 
        worker-src blob:;"
    >
  {/if}

  {#if PUBLIC_APP_ENV === 'test'}
    <meta
      http-equiv="Content-Security-Policy"
      content="
        default-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        font-src 'self'; 
        connect-src http://localhost:5173 ws://localhost:5173 https://api.unisvg.com/ https://api.iconify.design/ *.sentry.io blob:; 
        img-src http://localhost:5173 https://res.cloudinary.com/dxpwpno1e/image/ blob:; 
        child-src blob:; 
        worker-src blob:;"
    >
  {/if}
</svelte:head>

<Toast />
<MainMenu />

<div class="press-escape-container">
  <PressEscape />
</div>


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

    @media (min-width: 768px) {
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

  .press-escape-container {
    position: fixed;
    bottom: 0.5rem;
    right: 0.5rem;
    z-index: 110;
  }
</style>
