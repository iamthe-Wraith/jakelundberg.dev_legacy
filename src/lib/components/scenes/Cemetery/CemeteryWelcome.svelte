<script lang="ts">
  export let className = '';
  export let testid = 'cemetery-welcome';
</script>

<div class="welcome {className}" data-testid={testid}>
  <h1>I see you found my <span>Project Cemetery</span></h1>
  <div class="cemetery-intro" data-testid={`${testid}-intro`}>
    <p>Be<span>c</span>ause I love learning and <span>tr</span>ying new things, I'm a<span>l</span>ways working on something. Many of those projects end up buried here. That way I always know where they are if I ever need to dig them up again.</p>
    <p>Of <span>c</span>ourse you're we<span>l</span>come to wander the grounds, but m<span>i</span>nd the Wisps...they <span>c</span>an be a bit fic<span>k</span>le.</p>
  </div>
</div>

<style lang="scss">
  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: 550px;
    height: 100%;
    min-height: 100%;
    padding: 9vh 0;
    text-align: center;

    p {
      padding-top: 1rem;
    }

    @media (hover: hover), (-moz-touch-enabled: 0), (pointer:fine) {
      p span {
        cursor: help;
        font-style: italic;

        &:hover {
          color: var(--primary-500);
        }
      }
    }

    @media (min-width: 768px) {
      min-height: auto;
      padding: 3rem 1rem 3rem 0;

      h1,
      h1 * {
        font-size: 2rem;
        line-height: 2.7rem;
      }
    }
  }
</style>