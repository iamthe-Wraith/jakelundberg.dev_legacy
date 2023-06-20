<script lang="ts">
  import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
  import rough from 'roughjs';
	import { page } from '$app/stores';

  type NavItemName = 'home' | 'about';

  interface INavItem {
    icon: string;
    title: string;
    href: string;
  }

  export let name: NavItemName;

  const navItems: Record<NavItemName, INavItem> = {
    home: {
      icon: 'mdi-light:home',
      title: 'Home',
      href: '/',
    },
    about: {
      icon: 'mdi-light:account',
      title: 'About',
      href: '/about',
    },
  };

  const navItem = navItems[name];
  const id = `rough-${navItem.title.toLowerCase()}`;
  let isActive = false;
  let mounted = false;

  $: {
    isActive = $page.url.pathname === navItem.href;

    if (mounted) {
      if (isActive) {
        setAsSelected();
      } else {
        setAsUnselected();
      }
    }
  }

  onMount(() => {
    mounted = true;
  });

  const setAsSelected = () => {
    const svg = document.getElementById(id) as unknown as SVGSVGElement
    const roughSvg = rough.svg(svg);
    const circle = roughSvg.circle(25, 25, 40, {
      stroke: 'oklch(80% 0.18 80.47)',
      strokeWidth: 2,
      roughness: 1.5,
    });
    svg.appendChild(circle);
  }

  const setAsUnselected = () => {
    const svg = document.getElementById(id) as unknown as SVGSVGElement

    for (let i = 0; i < svg.childNodes.length; i++) {
      svg.removeChild(svg.childNodes[i]);
    }
  }
</script>

<a href={navItem.href} class={isActive ? 'active' : ''}>
  <svg id={id} />
  <span>
    <Icon icon={navItem.icon} />
  </span>
</a>

<style lang="scss">
  a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    text-decoration: none;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
    }

    span {
      font-size: 2rem;
      color: white;
      transition: 0.25s ease-in-out;
      line-height: 0;
    }

    &:hover:not(.active),
    &:focus:not(.active) {
      span {
        font-size: 2.5rem;
        color: var(--primary-500);
        transition: 0.25s ease-in-out;
      }
    }
  }
</style>