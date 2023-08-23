<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { PageData } from './$types';
	import rough from 'roughjs';
	import Icon from '@iconify/svelte';
	import Loading from '$components/Loading.svelte';
	import UiLayer from '$components/layers/UILayer.svelte';
	import CemetaryWelcome from '$components/scenes/Cemetery/CemeteryWelcome.svelte';
	import Cemetery from '$components/scenes/Cemetery/Cemetery.svelte';
	import type { ILoad } from '$components/scenes/types';
	import { processError } from '$lib/utils/errors';
	import type { IProject } from '$lib/types/projects';
	import { removeChildren } from '$lib/utils/dom';
	import { secondaryColor } from '$lib/constants/colors';
	import Tag from '$components/Tag.svelte';
	import Button from '$components/Button.svelte';
	import type { IQuote } from '$lib/types/quotes';
	import HandDrawnContainer from '$components/HandDrawnContainer.svelte';

	export let data: PageData;

	let mounted = false;
	let amountLoaded = 0;
	let totalToLoad = 0;
	let displayUI = false;
	let displayScene = true;

	let selectedProjectVisible = false;
	let selectedProject: IProject | null;

	const quotes = getContext<IQuote[]>('quotes');

	const projectTransitionDelay = 100;
	const projectTransitionDuration = 300;

	let projects = data.projects.map((project) => {
		return {
			...project,
			viewDetails: false
		};
	});

	$: {
		projects = data.projects.map((project) => {
			return {
				...project,
				viewDetails: false
			};
		});
	}

	$: displayUI = !!amountLoaded && !!totalToLoad && amountLoaded >= totalToLoad;

	$: {
		if (mounted && displayUI && projects?.length) {
			drawRoughSeps();
		}
	}

	$: {
		if (selectedProjectVisible) {
			drawRoughEngageables();
		}
	}

	onMount(() => {
		mounted = true;

		return () => {
			mounted = false;
		};
	});

	function closeSelectedProject() {
		selectedProjectVisible = false;

		setTimeout(() => {
			selectedProject = null;
		}, projectTransitionDelay);
	}

	function drawRoughEngageables(count = 0) {
		const svgs = document.querySelectorAll('.rough-engageable-link');

		// hack to get around timing issue of seps being rendered
		if (!svgs.length && count < 10) {
			setTimeout(() => drawRoughEngageables(count + 1), 100);
			return;
		}

		for (let i = 0; i < svgs.length; i++) {
			const svg = svgs[i] as unknown as SVGSVGElement;
			removeChildren(svg);
			const roughSvg = rough.svg(svg);
			const circle = roughSvg.circle(25, 25, 40, {
				stroke: secondaryColor,
				strokeWidth: 2,
				roughness: 1.5
			});
			svg.appendChild(circle);
		}
	}

	function drawRoughSeps(count = 0) {
		const seps = document.querySelectorAll('.rough-sep');

		// hack to get around timing issue of seps being rendered
		if (!seps.length && count < 10) {
			setTimeout(() => drawRoughSeps(count + 1), 100);
			return;
		}

		for (let i = 0; i < seps.length; i++) {
			const sep = seps[i] as unknown as SVGSVGElement;
			removeChildren(sep);
			const rect = sep.getBoundingClientRect();
			const roughSvg = rough.svg(sep);

			const options = {
				stroke: secondaryColor,
				strokeWidth: 2,
				roughness: 1.5
			};

			const offset = 5;

			const line1 = roughSvg.line(offset, offset, rect.width - offset, offset, options);
			sep.appendChild(line1);
		}
	}

	function onSceneError(error: Error) {
		processError(error, () => {
			displayScene = false;
			displayUI = true;
		});
	}

	function onSceneLoad(loading: Record<string, ILoad>) {
		const l = Object.values(loading).reduce(
			(acc, curr) => {
				acc.loaded += curr.loaded;
				acc.total += curr.total;
				return acc;
			},
			{
				loaded: 0,
				total: 0
			}
		);

		amountLoaded = l.loaded;
		totalToLoad = l.total;
	}

	function selectProject(project: IProject) {
		selectedProject = project;
		selectedProjectVisible = false;

		setTimeout(() => {
			selectedProjectVisible = true;
		}, projectTransitionDelay);
	}
</script>

{#if displayScene}
	<Cemetery onLoad={onSceneLoad} onError={onSceneError} />
{/if}

{#if displayUI}
	<UiLayer>
		<div class="ui-main">
			<div class="left-col">
				<div class="welcome-mobile">
					<CemetaryWelcome className="mobile-cemetery-welcome" testid="mobile-cemetery-welcome" />
				</div>

				<div class="projects">
					{#each projects as project (project)}
						<div class="project mobile-project">
							<button
								class="project-title header-font {project.title === selectedProject?.title
									? 'selected'
									: ''}"
								disabled={project.title === selectedProject?.title}
								on:click={() => selectProject(project)}
							>
								{project.title}
							</button>

							<h2 class="mobile-header">{project.title}</h2>

							<div class="tags mobile-tags">
								{#each project.tags as tag}
									<Tag>{tag}</Tag>
								{/each}
							</div>

							{#if project.viewDetails}
								<div
									class="desc mobile-desc"
									in:scale={{ duration: 300, start: 0, opacity: 0, easing: quintOut }}
								>
									{@html project.desc}
								</div>
							{/if}

							<div class="engageables mobile-engageables">
								<div class="links">
									{#each Object.entries(project.urls) as [key, url]}
										<a class="link" href={url} target="_blank" rel="noopener noreferrer">
											{#if key === 'github'}
												<Icon icon="ion:logo-github" />
											{:else}
												<Icon icon="ion:browsers" />
											{/if}
										</a>
									{/each}
								</div>

								{#if !project.viewDetails}
									<Button
										className="view-details-btn"
										kind="primary"
										size="small"
										on:click={() => (project.viewDetails = true)}
									>
										View Details
									</Button>
								{/if}
							</div>

							<svg class="rough-sep" id="rough-sep-{project.id}" />
						</div>
					{/each}
				</div>
			</div>

			<div class="details no-scrollbar">
				{#if selectedProject && selectedProjectVisible}
					<HandDrawnContainer>
						<div
							class="project"
							in:fly={{
								delay: projectTransitionDelay,
								duration: projectTransitionDuration,
								x: 0,
								y: -100,
								opacity: 0,
								easing: quintOut
							}}
							out:fade={{ duration: projectTransitionDelay }}
						>
							<button class="close" on:click={closeSelectedProject}>
								<Icon icon="ion:close" />
								<svg class="rough-engageable-link" />
							</button>

							<h2>{selectedProject.title}</h2>

							<div class="tags">
								{#each selectedProject.tags as tag}
									<Tag>{tag}</Tag>
								{/each}
							</div>

							<div class="desc">
								{@html selectedProject.desc}
							</div>

							<div class="engageables">
								<div class="links">
									{#each Object.entries(selectedProject.urls) as [key, url]}
										<a class="link" href={url} target="_blank" rel="noopener noreferrer">
											{#if key === 'github'}
												<Icon icon="ion:logo-github" />
											{:else if key === 'download'}
												<Icon icon="ion:cloud-download-outline" />
											{:else}
												<Icon icon="ion:browsers" />
											{/if}
											<svg class="rough-engageable-link" />
										</a>
									{/each}
								</div>
							</div>
						</div>
					</HandDrawnContainer>
				{/if}

				{#if !selectedProject && !selectedProjectVisible}
					<div
						class="welcome-desktop"
						in:fly={{
							delay: projectTransitionDelay,
							duration: projectTransitionDuration,
							x: 0,
							y: -100,
							opacity: 0,
							easing: quintOut
						}}
						out:fade={{ duration: projectTransitionDelay }}
					>
						<HandDrawnContainer>
							<CemetaryWelcome
								className="desktop-cemetery-welcome"
								testid="desktop-cemetery-welcome"
							/>
						</HandDrawnContainer>
					</div>
				{/if}
			</div>
		</div>
	</UiLayer>
{:else}
	<Loading {quotes} />
{/if}

<style lang="scss">
	.ui-main {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 100%;
		height: 100%;

		@media (min-width: 768px) {
			flex-direction: row;
		}
	}

	.left-col {
		width: 100%;
		min-height: 100%;

		@media (min-width: 768px) {
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			max-width: 320px;
		}
	}

	.welcome-mobile {
		display: flex;
		height: 100%;
		min-height: 100%;

		@media (min-width: 768px) {
			display: none;
		}
	}

	.welcome-desktop {
		display: none;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

		@media (min-width: 768px) {
			display: flex;
		}
	}

	.projects {
		width: 100%;
	}

	.project {
		position: relative;
		max-height: 100%;
		padding: 1.5rem 1rem;

		&:not(.mobile-project) {
			max-width: 55rem;
		}

		&:last-child {
			.rough-sep {
				opacity: 0;
			}
		}

		.close {
			position: absolute;
			top: 0;
			right: 0;
			width: 3rem;
			height: 3rem;
			padding: 0.5rem;
			font-size: 2rem;
			outline: none;
			border: none;
			background: none;

			&:hover,
			&:focus {
				.rough-engageable-link {
					opacity: 1;
					transition: opacity 0.25s ease-in-out;
				}
			}
		}

		h2 {
			font-size: 1.3rem;
			color: var(--light-500);
			line-height: 1.7rem;

			@media (min-width: 768px) {
				&.mobile-header {
					display: none;
				}
			}
		}

		.project-title {
			display: none;
			width: 100%;
			font-size: 1.2rem;
			border: none;
			background: none;
			text-align: right;

			&:hover {
				cursor: pointer;

				& ~ .rough-sep {
					right: 0;
					transform: translateX(0%);
					opacity: 1;
					transition: 0.25s ease-in-out;
				}
			}

			@media (min-width: 768px) {
				display: block;
			}
		}

		.tags {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
			max-width: 90%;
			margin: 0.5rem auto;

			&.mobile-tags {
				display: flex;

				@media (min-width: 768px) {
					display: none;
				}
			}
		}

		.desc {
			width: 100%;
			margin: 1rem 0;

			&.mobile-desc {
				display: block;

				@media (min-width: 768px) {
					display: none;
				}
			}
		}

		.engageables {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.links {
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}

			a {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				min-width: 3rem;
				max-width: 3rem;
				min-height: 3rem;
				max-height: 3rem;
				padding: 0.5rem;
				font-size: 2.5rem;
				outline: none;
				border: none;

				&:not(:last-child) {
					margin-right: 0.5rem;
				}

				&:hover,
				&:focus {
					.rough-engageable-link {
						opacity: 1;
						transition: opacity 0.25s ease-in-out;
					}
				}
			}

			&.mobile-engageables {
				display: flex;
				margin: 1rem 0;

				@media (min-width: 768px) {
					display: none;
				}
			}
		}

		.rough-sep {
			position: absolute;
			top: calc(100% - 0.5rem);
			left: 50%;
			width: 150px;
			height: 14px;
			opacity: 1;
			transform: translateX(-50%);
			transition: 0.25s ease-in-out;

			@media (min-width: 768px) {
				opacity: 0;
			}
		}

		@media (min-width: 768px) {
			padding: 0.35rem 1rem;
		}
	}

	.rough-engageable-link {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 0.25s ease-in-out;
		pointer-events: none;
	}

	.details {
		display: none;
		flex: 1;
		justify-content: center;
		align-items: flex-start;
		max-height: 100%;
		padding-left: 1rem;
		border-left: 1px solid var(--dark-500);
		overflow: auto;

		@media (min-width: 768px) {
			display: flex;
		}
	}

	* :global(h3) {
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--primary-500);
		line-height: 1.4rem;
		text-align: left;
	}
</style>
