import type { PageServerLoad } from './$types';
import { wrapServerLoadWithSentry } from '@sentry/sveltekit';

interface IProject {
  title: string;
  urls: IProjectUrls;
  desc: string;
}

interface IProjectUrls {
  url?: string; // used for all urls that to do match other properties of this interface
  github?: string; // only used for github urls
}

const projects: IProject[] = [
  {
    title: 'jakelundberg.dev',
    urls: {
      github: 'https://github.com/iamthe-Wraith/jakelundberg.dev'
    },
    desc: 'This site! Built with SvelteKit, ThreeJS, and TypeScript.',
  },
  {
    title: 'Yum Yum Recipes',
    urls: {
      github: 'https://github.com/iamthe-Wraith/yumyum-recipes'
    },
    desc: 'A recipe and meal planning app built with SvelteKit, Typescript, Postgres, and Prisma.',
  },
  {
    title: 'Igor',
    urls: {
      github: 'https://github.com/iamthe-Wraith/igor',
    },
    desc: 'A CLI tool to automate the process of creating new A/B tests from internal libraries built with NodeJS.',
  }
];

export const load = wrapServerLoadWithSentry(async () => {
  return { projects };
}) satisfies PageServerLoad;