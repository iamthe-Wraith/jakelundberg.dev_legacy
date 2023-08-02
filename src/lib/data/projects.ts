import type { IProject } from '$lib/types/projects';

export const projects: IProject[] = [
  {
    id: 'jakelundberg-dev',
    title: 'jakelundberg.dev',
    urls: {
      github: 'https://github.com/iamthe-Wraith/jakelundberg.dev'
    },
    desc: 'This site! Built with SvelteKit, ThreeJS, and TypeScript.',
  },
  {
    id: 'yumyum-recipes',
    title: 'Yum Yum Recipes',
    urls: {
      github: 'https://github.com/iamthe-Wraith/yumyum-recipes'
    },
    desc: 'A recipe and meal planning app built with SvelteKit, Typescript, Postgres, and Prisma.',
  },
  {
    id: 'igor',
    title: 'Igor',
    urls: {
      github: 'https://github.com/iamthe-Wraith/igor',
    },
    desc: 'A CLI tool to automate the process of creating new A/B tests from internal libraries built with NodeJS.',
  }
];