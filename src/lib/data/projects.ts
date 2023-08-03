import type { IProject } from '$lib/types/projects';

export const projects: IProject[] = [
  {
    id: 'jakelundberg-dev',
    title: 'jakelundberg.dev',
    urls: {
      github: 'https://github.com/iamthe-Wraith/jakelundberg.dev',
      url: 'https://jakelundberg.dev'
    },
    desc: `
      <p>This site!</p>
    
      <p>I wanted to have my own portfolio site where I could have a single place to share the things I'm working on, my experiences, and have a little fun along the way (have you found any hidden codes yet?).</p>
    
      <p>I chose SvelteKit because I already knew my site wouldn't require a high degree of interaction, but I knew I needed speed and performance. When working in 3d, there is already a lot more to deal with, both in code as well as in asset file sizes, so I wanted to keep my bundle sizes as small as possible, which is an area that SvelteKit shines.</p>`,
    tags: ['sveltekit', 'typescript', 'threejs', 'blender'],
  },
  {
    id: 'yumyum-recipes',
    title: 'Yum Yum Recipes',
    urls: {
      github: 'https://github.com/iamthe-Wraith/yumyum-recipes'
    },
    desc: `
      <p>A recipe and meal planning app I built to solve a problem for my spouse.</p>
    
      <p>In our house, my spouse handles the groceries and meal planning. And what a chore it can be. From having to decide what meals to have, to getting the list of ingredients compiled, and making sure everyone in the house has snacks and lunches for the week, it can be a lot to handle and would take a lot of time every week. So I built this app to help them out.</p>
    
      <p>Up front I knew I wanted a few specific features.</p>
    
      <ol>
        <li>To be able to randomly select a number of meals from a list of recipes, for those times we really didn't care but a decision still needed to be made.</li>
        <li>To add a recipe to the list of meals for the week and have the ingredients automatically added to the grocery list.</li>
        <li>To specify a number of people to feed, and have the ingredients automatically scaled to the correct amount based on the meal's serving size.</li>
      </ol>
    
      <p>Since this was just a personal project, I took the opportunity to learn a few new technologies. So I chose to use SvelteKit and Postgres. SvelteKit because it was something I had been wanting to learn for a while. And Postgres because I knew of its popularity in the industry, plus I missed relative databases (I'd been working primarily with MongoDB for quite a while) and knew my schema would require relations, so it seemed like an appropriate choice.</p>`,
    tags: ['sveltekit', 'typescript', 'postgres', 'prisma'],
  },
  {
    id: 'igor',
    title: 'Igor',
    urls: {
      github: 'https://github.com/iamthe-Wraith/igor',
    },
    desc: `
      <p>A CLI tool to automate the process of creating new A/B tests from internal libraries.</p>
    
      <p>Before Igor, each member of the team was using their own copies of templates and everyone's was different. No one was sharing code and results were quite inconsistent. Igor standardized and automated the entire process. Now, every dev on the team was using the same, most up to date internal code libraries, and the process of creating a new test was as simple as running a single command.</p>
    
      <p>With this standardization and automation in place, non only were we able to increase our output significantly, we were also able to begin supporting larger, more complex tests for a larger number of clients because now we could have separate libraries for each client, and Igor would automatically pull in the correct library based on the client's id. No longer did the knowledge of a specific client's codebase life with a single developer. Now anyone could work on any client's codebase without needing significant onboarding.</p>
    
      <p>I decided to build the tool in Node because it was a language I was already familiar with, and our team was made up entirely of Javascript developers, so it be a language everyone could contribute to without first needing to learn a new language.</p>`,
    tags: ['node', 'javascript'],
  }
];