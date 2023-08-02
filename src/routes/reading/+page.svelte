<script lang="ts">
  import { page } from '$app/stores';
	import { onMount } from 'svelte';

  onMount(async () => {
    console.log('Reading page mounted');
    console.log('data: ', $page.data);
  })
</script>

<div>Reading</div>