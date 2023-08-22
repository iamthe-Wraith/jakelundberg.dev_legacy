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
		tags: ['sveltekit', 'typescript', 'threejs', 'blender']
	},
	{
		id: 'yumyum-recipes',
		title: 'YumYum Recipes',
		urls: {
			github: 'https://github.com/iamthe-Wraith/yumyum-recipes',
			url: 'https://yumyum.jakelundberg.dev'
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

      <h3>Why SvelteKit?</h3>
      <p>I had been wanting to learn more about Svelte and SvelteKit for a while, and since this was a personal project, originally just to help my spouse and I plan meals, I figured it was a good opportunity to learn something new.</p>

      <p>Throughout this project I fell in love with Svelte and SvelteKit and I'm excited to use it for future projects.</p>

      <h3>Why Typescript</h3>
      <p>I've been using Typescript for a while now, and I honestly couldn't tell you the last time I worked on a project without it. I find tremendous value in the type safety and intellisense it provides, especially when working on teams. I've found that it helps me write better code, and to catch errors before they happen.</p>

      <h3>Why Postgres and Prisma?</h3>
      <p>I had been using MongoDB for a long time, and while it's great for many things, I knew I was going to need to do some relational data modeling for this project, so I decided to dive back into the workd of relational databases. I had heard about Postgres for a long time, but never really had a reason to use it, so I took this opportunity to learn more about it. I'm glad I did! I really liked working with Postgres and Prisma. The automatically generated types and queries were a huge time saver, and I found the Prisma documentation to be very helpful.</p>

      <h3>Try the Demo!</h3>
      <p>If you would you like to try out YumYum, you can log in with the following credentials:</p>
      
      <p style="text-indent: 0; text-align: center">
        <span style="display: inline-block; width: 5rem; margin-right: 1rem; color: var(--primary-500); text-align: right">Username:</span>
        <span style="display: inline-block; width: 14rem; text-align: left">demo@jakelundberg.dev</span>
        <br />
        <span style="display: inline-block; width: 5rem; margin-right: 1rem; color: var(--primary-500); text-align: right">Password:</span>
        <span style="display: inline-block; width: 14rem; text-align: left">Demo321!</span>
      </p>`,
		tags: ['sveltekit', 'typescript', 'postgres', 'prisma']
	},
	{
		id: 'wraithnet',
		title: 'Wraithnet',
		urls: {
			github: 'https://github.com/iamthe-Wraith/wraithnet/tree/main',
			download: 'https://github.com/iamthe-Wraith/wraithnet/releases'
		},
		desc: `
      <p>This is the client side of the Wraithnet project.</p>

      <p>Wraithnet is something I've been working on for a very long time now, and it continues to evolve and be a work in progress.</p>
      
      <p>It all started with an idea that I wanted to have 1 customizable app to handle a variety of tasks instead of needing to have multiple apps to handle them all. Over the years, those tasks have changed, but the Wraithnet idea has never left me.</p>
      
      <p>In this iteration of the project, I needed to update the features of the projects, as I no longer needed many of the old ones. I also wanted to update it with modern frontend web development principles, so I decided to rewrite the entire frontend from scratch.</p>
      
      <h3>Why Electron?</h3>
      <p>I had been curious about Electron for a while at this point, and I thought this would be a good opportunity to learn more about it. I knew I wanted to add some features that would require native functionality (like accessing the file system), I also wanted to be able to use the app on multiple platforms, so Electron seemed like a good choice.</p>
      
      <h3>Why Typescript?</h3>
      <p>I've been using Typescript for a while now, and I honestly couldn't tell you the last time I worked on a project without it. I find tremendous value in the type safety and intellisense it provides, especially when working on teams. I've found that it helps me write better code, and to catch errors before they happen.</p>
      
      <h3>Why React?</h3>
      <p>I was already familiar with React, and new that my design was going to require a single page structure, so it was an obvious choice for me on this project.</p>
      
      <h3>Why MobX?</h3>
      <p>Unless there is a strong reason to turn to another tool, MobX is generally my go to state management tool. I really like it's observability and how it encourages a similar structure and breakdown to Object Oriented Programming.</p>
      
      <h3>Try the Demo!</h3>
      <p>If you would you like to try out Wraithnet, you can log in with the following credentials after downloading the app:</p>
      
      <p style="text-indent: 0; text-align: center">
        <span style="display: inline-block; width: 5rem; margin-right: 1rem; color: var(--primary-500); text-align: right">Username:</span>
        <span style="display: inline-block; width: 14rem; text-align: left">demo</span>
        <br />
        <span style="display: inline-block; width: 5rem; margin-right: 1rem; color: var(--primary-500); text-align: right">Password:</span>
        <span style="display: inline-block; width: 14rem; text-align: left">Demo321!</span>
      </p>`,

		tags: ['electron', 'typescript', 'react', 'mobx']
	},
	{
		id: 'wraithnet-api',
		title: 'Wraithnet API',
		urls: {
			github: 'https://github.com/iamthe-Wraith/wraithnet-api'
		},
		desc: `
      <p>This is a RESTful API for the Wraithnet project.</p>
      
      <p>Wraithnet is something I've been working on for a very long time now, and it continues to evolve and be a work in progress.</p>
      
      <p>It all started with an idea that I wanted to have 1 customizable app to handle a variety of tasks instead of needing to have multiple apps to handle them all. Over the years, those tasks have changed, but the Wraithnet idea has never left me.</p>
      
      <p>In this iteration of the project, I set out to implement the backend of the project using Node, Typescript, Express and MongoDB to update it with modern development practices and increase it's efficiency and scalability. This proved very useful as I soon after built a new feature into the app that scaled more quickly than I had anticipated.</p>
      
      <h3>Why Node?</h3>
      <p>I chose to use Node for this project because I wanted to use a language that I was familiar with and that I knew would be able to handle the tasks I needed it to. I also wanted to use a language that would allow me to easily implement Typescript.</p>
      
      <h3>Why Typescript?</h3>
      <p>I've been using Typescript for a while now, and I honestly couldn't tell you the last time I worked on a project without it. I find tremendous value in the type safety and intellisense it provides, especially when working on teams. I've found that it helps me write better code, and to catch errors before they happen.</p>
      
      <h3>Why Express?</h3>
      <p>Express was an easy choice for me since I was already familiar with it, and it's a very popular framework for Node.</p>
      
      <h3>Why MongoDB and Mongoose?</h3>
      <p>I chose MongoDB because I wanted to use a NoSQL database for this project in order to become more familiar with them (not to mention Mongo Atlas has a great free tier). I chose Mongoose because I wanted to use an ORM to help me manage the database, and it was by far the most popular.</p>`,
		tags: ['node, typescript', 'mongodb', 'mongoose', 'express', 'jwt']
	},
	{
		id: 'igor',
		title: 'Igor',
		urls: {
			github: 'https://github.com/iamthe-Wraith/igor'
		},
		desc: `
      <p>A CLI tool to automate the process of creating new A/B tests from internal libraries.</p>
    
      <p>Before Igor, each member of the team was using their own copies of templates and everyone's was different. Very few people were sharing code and results were quite inconsistent. Igor standardized and automated the entire process. Suddenly, every dev on the team was using the same, most up to date internal code libraries, and the process of creating a new test was as simple as running a single command.</p>
    
      <p>With this standardization and automation in place, not only were we able to increase our output significantly, we were also able to begin supporting larger, more complex tests for a larger number of clients because now we could have separate libraries for each client, and Igor would automatically pull in the correct library based on the client's id. No longer did the knowledge of a specific client's codebase live with a single developer. Now anyone could work on any client's codebase without needing significant onboarding.</p>
      
      <h3>Why Node?</h3>
      <p>The reason I chose to use Node for this project was because we were a company full of Javascript developers and I knew the best chance of getting others to use and contribute to the project was to be if it was written in a language they were already familiar with.</p>`,
		tags: ['node', 'javascript']
	}
];
