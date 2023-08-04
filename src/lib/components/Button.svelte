<script lang="ts">
  export let kind: 'primary' | 'secondary' | 'neutral' = 'primary';
  export let size: 'small' | 'large' = 'large'
  export let className: string;
</script>

<button
  on:click
  class={`${kind} ${size} ${className}`}
>
  <slot />
</button>

<style lang="scss">
  button {
    background: none;
    border: none;
    border-radius: 0.25rem;
    outline: none;

    &:hover {
      cursor: pointer;
    }

    &.small {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }

    &.large {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    &.primary {
      background: var(--primary-500);
      color: var(--light-500);
    }

    &.secondary {
      background: var(--secondary-500);
      color: var(--dark-500);
    }

    &.neutral {
      background: var(--light-500);
      color: var(--dark-500);
    }
  }
</style>