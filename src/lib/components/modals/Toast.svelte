<script lang="ts">
  import { fly } from "svelte/transition";
  import { Toast } from "$lib/stores/toast";
	import { getRandom } from "$lib/utils/number";

  const minorRadius = getRandom(13, 19);
  const majorRadius = getRandom(230, 260);
</script>

{#if !!$Toast.length}
  <div
    class="modal-outer {$Toast[0].type || 'success'}"
    style="
      border-top-left-radius: {majorRadius}px {minorRadius}px;
      border-top-right-radius: {minorRadius}px {majorRadius}px;
      border-bottom-right-radius: {majorRadius}px {minorRadius}px;
      border-bottom-left-radius: {minorRadius}px {majorRadius}px;
    "
    in:fly={{ x: 0, y: -50 }}
    out:fly={{ x: 0, y: -50 }}
  >
    <div class="modal">
      <span>{$Toast[0].message}</span>
      
      {#if $Toast[0].redirect}
        <a href={$Toast[0].redirect.url}>
          {$Toast[0].redirect.text}
        </a>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .modal-outer {
    position: fixed;
    top: 5rem;
    left: 50%;
    max-width: 30rem;
    padding: 0.2rem;
    border-width: 3px;
    border-style: solid;
    border-radius: 0.5rem;
    background: var(--dark-100);
    z-index: 2000;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3), 0 0 15px 0 rgba(0, 0, 0, 0.2);
    transform: translateX(-50%);

    &.success {
      border-color: var(--primary-500);

      a {
        color: var(--secondary-500)
      }
    }

    &.error {
      border-color: var(--danger-500);

      a {
        color: var(--danger-500)
      }
    }
  }

  .modal {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem;
    background: var(--neutral-100);
    border-radius: 0.5rem;

    a {
      margin: 0 0.5rem;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
