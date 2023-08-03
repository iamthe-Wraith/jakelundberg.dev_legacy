<span class="tag">
  <slot />
</span>

<style lang="scss">
  span {
    position: relative;
    margin-bottom: 0.5rem;
    padding: 0.1rem 0.4rem 0.2rem;
    font-size: 0.65rem;
    border: 1px solid var(--primary-500);
    border-radius: 5rem;
    color: var(--light-500);

    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
</style>