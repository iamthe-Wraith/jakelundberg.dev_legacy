<script lang="ts">
  import './global.css';
  import Nav from '$components/Nav/Nav.svelte';
  import type { LayoutData } from './$types';
  import { setContext } from 'svelte';

  export let data: LayoutData;

  $: if (data?.quotes) setContext('quotes', data.quotes);
</script>

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
