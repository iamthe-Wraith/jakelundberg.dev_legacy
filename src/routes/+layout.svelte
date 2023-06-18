<script lang="ts">
  import './global.css';
</script>

<main>
  <slot />
</main>

<style>
  main {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
