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
    
      <p>I wanted to have my own portfolio site where I could have a single place to share the things I'm working on, my experiences, and have a little fun along the way (have you found any hidden keys yet?).</p>
    
      <p>I chose SvelteKit because I already knew my site wouldn't require a high degree of interaction, but I knew I needed speed and performance. When working in 3d, there is already a lot more to deal with, both in code as well as in asset file sizes, so I wanted to keep my bundle sizes as small as possible, which is an area that SvelteKit shines.</p>`,
    tags: ['sveltekit', 'typescript', 'threejs', 'blender'],
  },
  {
    id: 'yumyum-recipes',
    title: 'YumYum Recipes',
    urls: {
      github: 'https://github.com/iamthe-Wraith/yumyum-recipes',
      url: 'https://yumyum.jakelundberg.dev',
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
    
      <p>Since this was just a personal project, I took the opportunity to learn a few new technologies. So I chose to use SvelteKit and Postgres. SvelteKit because it was something I had been wanting to learn for a while. And Postgres because I knew of its popularity in the industry, plus I missed relative databases (I'd been working primarily with MongoDB for quite a while) and knew my schema would require relations, so it seemed like an appropriate choice.</p>

      <p>If you would you like to try it out, you can log in with the following credentials:</p>
      
      <p style="text-indent: 0; text-align: center">
        <span style="display: inline-block; width: 5rem; margin-right: 1rem; color: var(--primary-500); text-align: right">Username:</span>
        <span style="display: inline-block; width: 14rem; text-align: left">demo@jakelundberg.dev</span>
        <br />
        <span style="display: inline-block; width: 5rem; margin-right: 1rem; color: var(--primary-500); text-align: right">Password:</span>
        <span style="display: inline-block; width: 14rem; text-align: left">Demo321!</span>
      </p>`,
    tags: ['sveltekit', 'typescript', 'postgres', 'prisma'],
  },
  {
    id: 'wraithnet-api',
    title: 'Wraithnet API',
    urls: {
      github: 'https://github.com/iamthe-Wraith/wraithnet-api',
    },
    desc: `
      <p>A RESTful API for the Wraithnet project.</p>
      
      <p>Wraithnet is something I have been working on for a very long time now, and it continues to evolve and be a work in progress.</p>
      
      <p>It all started with an idea that I wanted to have 1 customizable app to handle a variety of tasks instead of needing to have multiple apps to handle them all. Over the years, those tasks have changed, but the Wraithnet idea has never left me.</p>
      
      <p>In this iteration, I set out to implement the backend of the project using Node, Typescript, Express and MongoDB to update it with modern development practices and increase it's efficiency and scalability. This proved very useful as I built a new feature into the app that scaled a bit quicker than I had anticipated.</p>`,
    tags: ['node, typescript', 'mongodb', 'mongoose', 'express', 'jwt'],
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
    
      <p>With this standardization and automation in place, not only were we able to increase our output significantly, we were also able to begin supporting larger, more complex tests for a larger number of clients because now we could have separate libraries for each client, and Igor would automatically pull in the correct library based on the client's id. No longer did the knowledge of a specific client's codebase life with a single developer. Now anyone could work on any client's codebase without needing significant onboarding.</p>
    
      <p>I decided to build the tool in Node because it was a language I was already familiar with, and our team was made up entirely of Javascript developers, so it be a language everyone could contribute to without first needing to learn a new language.</p>`,
    tags: ['node', 'javascript'],
  }
];