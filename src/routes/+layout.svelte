<script lang="ts">
	import Nav from '$components/Nav.svelte';
  import './global.css';
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
    width: 100vw;
    height: 7vh;
    z-index: 99;
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
