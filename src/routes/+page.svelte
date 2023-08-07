<script lang="ts">
	import type { PageData } from './$types';
  import Forest from '$components/scenes/Forest.svelte';
  import type { ILoad } from '$components/scenes/types';
  import UILayer from '$components/layers/UILayer.svelte';
  import Loading from '$components/Loading.svelte';
  import { getContext } from 'svelte';
  import type { IQuote } from '$lib/types/quotes';
	import { processError } from '$lib/utils/errors';
	import Tag from '$components/Tag.svelte';
	import HandDrawnContainer from '$components/HandDrawnContainer.svelte';
  
  export let data: PageData;

  let amountLoaded = 0;
  let totalToLoad = 0;
  let displayUI = false;
  let displayScene = true;

  let engagedBlogPost = '';

  const quotes = getContext<IQuote[]>('quotes');

  $: console.log('data', data);

  function onSceneError(error: Error) {
    processError(error, () => {
      displayScene = false;
      displayUI = true;
    });
  }

  function onSceneLoad(loading: Record<string, ILoad>) {
    const l = Object.values(loading).reduce((acc, curr) => {
      acc.loaded += curr.loaded;
      acc.total += curr.total;
      return acc;
    }, {
      loaded: 0,
      total: 0
    });

    amountLoaded = l.loaded;
    totalToLoad = l.total;
    displayUI = !!amountLoaded && !!totalToLoad && amountLoaded >= totalToLoad;
  }
</script>

{#if displayScene}
  <Forest
    onLoad={onSceneLoad}
    onError={onSceneError}
  />
{/if}

{#if displayUI}
  <UILayer>
    <div class="ui-main">
      <section class="greeting">
        <div class="greeting-content">
          <h1><span>Hi, I'm</span>Jake Lundberg<span>.</span></h1>
          <p class="subheader header-font">I build stuff for the web.</p>
          <p class="intro-text">I'm a software engineer with an uncommon passion for what I do. There are few things that bring me as much joy as digging into complex problems to find elegant solutions, or brainstorming with smart people to find the idea that will make someone's life better.</p>
        </div>
      </section>

      {#if data.blog_posts?.length}
        <section class="blog-posts-section">
          <h2>Recent Blog Posts</h2>
          <div class="blog-posts">
            {#each (data.blog_posts || []) as post}
              <HandDrawnContainer
                hoverable={true}
                hovered={engagedBlogPost === post.id}
              >
                <article class="blog-post">
                  <a
                    href={post.url}
                    target="_blank"
                    on:focus={() => engagedBlogPost = post.id}
                    on:blur={() => engagedBlogPost = ''}
                  >
                    <h3>{post.title}</h3>
                  
                    <div class="blog-post-tags">
                      {#each post.tags as tag}
                        <Tag>{tag}</Tag>
                      {/each}
                    </div>
                    <p class="blog-post-desc">{post.description}</p>
                  </a>
                </article>
              </HandDrawnContainer>
            {/each}
          </div>
        </section>
      {/if}
    </div>
  </UILayer>
{:else}
  <Loading {quotes} />
{/if}

<style lang="scss">
  .ui-main {
    width: 100%;
    height: 100%;
  }

  section {
    &:last-child {
      padding-bottom: 3rem;
    }

    h2 {
      margin: 0 0 1.5rem;
    }
  }

  .greeting {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .greeting-content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 40rem;
      padding: 2.5rem 2rem 2rem;
      background: oklch(0% 0 0 / 0.5);
      border: 3px solid var(--dark-500);
      border-top-left-radius: 255px 15px;
      border-top-right-radius: 18px 230px;
      border-bottom-right-radius: 230px 14px;
      border-bottom-left-radius:18px 255px;
    }

    h1 {
      position: relative;
      color: var(--primary-500);

      span {
        color: var(--light-500);
        font-weight: 400;
        font-size: 2rem;
        line-height: 1rem;

        &:first-child {
          position: absolute;
          bottom: 100%;
          left: 1.5rem;
          font-size: 1.2rem;
        }
      }
    }

    .subheader {
      margin: 0.75rem 0 1.25rem;
      font-size: 1.3rem;
      text-indent: 0;
    }
  }

  .blog-posts-section {
    h2 {
      flex: 1;
      margin-bottom: 1rem;
    }
  }

  .blog-posts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 1rem;
    max-width: 100rem;
    margin: 0 auto;

    .blog-post {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;

      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      a {
        color: var(--primary-500);
        text-decoration: none;
        transition: color 0.2s ease-in-out;
        border: none;
        outline: none;

        &:hover {
          color: var(--light-500);
        }
      }

      h3 {
        margin: 0 0 0.5rem;
        /* font-size: 1.2rem; */
        text-align: center;
      }

      .blog-post-tags {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        text-align: left;
      }

      @media (min-width: 970px) {
        justify-content: flex-start;

        &:not(:last-child) {
          margin-bottom: 0;
        }
      }
    }

    @media (min-width: 970px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: stretch;
      flex-wrap: nowrap;
      gap: 1rem;
    }
  }
</style>