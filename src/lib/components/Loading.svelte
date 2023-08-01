<script lang="ts">
  import type { IQuote } from "$lib/types/quotes";
  import { getContext, onMount } from "svelte";
  export let text: string = 'loading';

  const quotes = getContext<IQuote[]>('quotes');
  let ellipsis = '';
  let quote: IQuote;
  
  $: if (quotes?.length && !quote) setQuote();
  
  onMount(() => {
    setInterval(() => {
      ellipsis = ellipsis.length >= 3 ? '' : `${ellipsis}.`;
    }, 350);
    
    setInterval(setQuote, 7000);

    setQuote();
  });
  
  function setQuote() {
    if (!quotes?.length) return;
    let nextQuote: IQuote;

    do {
      nextQuote = quotes[Math.floor(Math.random() * (quotes.length - 1))];
    } while ((nextQuote.quote === quote?.quote))

    quote = nextQuote;
  }
</script>

<div class="loading">
  <p class="loading-indicator header-font">{text}<span>{ellipsis}</span></p>
  <div class="sep-line"></div>

  {#if quote}
    <div class="quote-container">
      <p class="quote">{quote.quote}</p>
      <p class="quote-author">- {quote.author}</p>
    </div>
  {/if}
</div>

<style lang="scss">
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .loading-indicator {
    position: relative;
    font-size: 1.6rem;
    letter-spacing: 1px;
    color: var(--secondary-500);

    span {
      position: absolute;
      bottom: 0;
      left: 100%;
    }
  }

  .sep-line {
    width: 80%;
    max-width: 40rem;
    height: 1px;
    margin: 1rem auto;
    background-color: var(--secondary-500);
  }

  .quote-container {
    margin-top: 1rem;
    width: 90%;
    max-width: 40rem;
    text-align: center;
    
    p {
      color: var(--light-500)
    }
    
    .quote {
      margin-bottom: 1rem;
    }
    
    .quote-author {
      font-style: italic;
    }
  }
</style>