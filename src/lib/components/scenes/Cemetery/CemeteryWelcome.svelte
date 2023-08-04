<script lang="ts">
  export let className = '';
  export let testid = 'cemetery-welcome';
</script>

<div class="welcome {className}" data-testid={testid}>
  <h1>Welcome to My <span>Project Cemetery</span></h1>
  <div class="cemetery-intro" data-testid={`${testid}-intro`}>
    <p>Not all proje<span>ct</span>s make it to p<span>r</span>oduction, sad<span>l</span>y. When they aren't A<span>+</span> work, I bury them here. Just in <span>c</span>ase I ever fee<span>l</span> the need to d<span>i</span>g them up again.</p>
    <p>You're welcome to wander the grounds, but mind the Wisps...they <span>c</span>an be a bit fic<span>k</span>le.</p>
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