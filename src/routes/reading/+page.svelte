<script lang="ts">
  import { page } from '$app/stores';
	import { onMount } from 'svelte';

  onMount(async () => {
    console.log('Reading page mounted');
    console.log('data: ', $page.data);

    const readingList = await fetch('/api/learning');

    console.log('>>>>> reading list: ', await readingList.json());
  })
</script>

<div>Reading</div>