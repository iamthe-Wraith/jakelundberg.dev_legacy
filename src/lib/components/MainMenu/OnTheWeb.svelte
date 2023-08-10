<script lang="ts">
  import rough from 'roughjs';
  import { assets } from '$app/paths';
  import { removeChildren } from '$lib/utils/dom';
  import { secondaryColor } from '$lib/constants/colors';
  import { onMount } from 'svelte';

  interface IOnTheWebLink {
    name: string;
    url: string;
    logo: string;
  }

  const maxAttempts = 10;

  const links: IOnTheWebLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/iamthe-Wraith',
      logo: `${assets}/social/github.png`,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jake-lundberg/',
      logo: `${assets}/social/linkedin.png`,
    },
    {
      name: 'Mastodon',
      url: 'https://fosstodon.org/@wraith',
      logo: `${assets}/social/mastodon.png`,
    },
    {
      name: 'Bluesky',
      url: 'https://bsky.app/profile/iamthewraith.bsky.social',
      logo: `${assets}/social/bluesky.png`,
    }
  ];

  onMount(() => {
    drawEngageableSvg();
  })

  function drawEngageableSvg(count = 0) {
    const svgs = document.querySelectorAll('.on-the-web-rough-engageable');

    if (svgs.length !== links.length && count < maxAttempts) {
      setTimeout(() => drawEngageableSvg(count + 1), 100);
    }

    if (svgs.length !== links.length) return;

    for (let i = 0; i < svgs.length; i++) {
      const svg = svgs[i] as unknown as SVGSVGElement;
      removeChildren(svg);
      const rect = svg.getBoundingClientRect();
      const offset = 5
      const roughSvg = rough.svg(svg);
      const circle = roughSvg.line(offset, rect.height / 2, rect.width - offset, rect.height / 2, {
        stroke: secondaryColor,
        strokeWidth: 2,
        roughness: 1.5,
      });
      svg.appendChild(circle);
    }
  };
</script>

<div class="on-the-web">
  <div class="on-the-web-grid">
    {#each links as link}
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        <img src={link.logo} alt={`${link.name} logo`} />
        <span>{link.name}</span>
        <svg class="on-the-web-rough-engageable" />
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  .on-the-web {
    height: 100%;
  }

  .on-the-web-grid {
    --social-logo-size: 4rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem 3rem;
    width: 12rem;
    margin: 3rem auto 0;

    @media (min-width: 768px) {
      gap: 2rem;
      width: 100%;
    }
  }

  a {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: var(--social-logo-size);
    height: calc(var(--social-logo-size) + 2rem);
    text-decoration: none;
    transition: transform 0.25s ease-in-out;

    &:hover,
    &:focus {
      transform: scale(1.1);
      svg {
        opacity: 1;
      }
    }

    img {
      width: var(--social-logo-size);
      height: var(--social-logo-size);
      border-radius: 0.5rem;
      overflow: hidden;
    }

    span {
      margin: 0;
      font-size: 0.8rem;
      text-align: center;
      text-indent: 0;
    }

    svg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: var(--social-logo-size);
      height: 10px;
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
    }
  }
</style>