<script lang="ts">
	import NavItem from '$components/NavItem.svelte';
</script>

<nav>
  <NavItem name="home" />
  <NavItem name="about" />
</nav>

<style lang="scss">
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>