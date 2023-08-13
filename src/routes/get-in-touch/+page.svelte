<script lang="ts">
  export let form;

  $: console.log({ form });
</script>

<div>asdf</div>

<!-- {#if form?.status === 'ok'}
  <div>Thank you for reaching out. I'll be in touch as soon as I am able.</div>
{:else if form?.status === 'error'}
  <div>An error has occurred. Please try again later.</div>
{:else}
  <div>Are you lost?</div>
  <a href="/">Go back to the path.</a>
{/if} -->