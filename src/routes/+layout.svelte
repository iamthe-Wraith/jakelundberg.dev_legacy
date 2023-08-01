<script lang="ts">
  import './global.css';
  import Nav from '$components/Nav/Nav.svelte';
  import type { LayoutData } from './$types';
  import { setContext } from 'svelte';

  export let data: LayoutData;

  $: if (data?.quotes) setContext('quotes', data.quotes);
</script>

<main>
  <header>
    <div />
    <Nav />
  </header>

  <slot />

  <footer>
    <!-- place footer stuff here -->
  </footer>
</main>

<style>
  header,
  footer {
    position: fixed;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 7vh;
    padding: 0.5rem 1rem;
    z-index: 99;
    box-sizing: border-box;

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
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
