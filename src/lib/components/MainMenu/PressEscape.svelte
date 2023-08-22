<script lang="ts">
	import { mainMenu } from '$lib/stores/main-menu';
	import Icon from '@iconify/svelte';

	function onClick() {
		if ($mainMenu.isOpen) {
			mainMenu.close();
		} else {
			mainMenu.open();
		}
	}
</script>

<button
	class="press-escape"
	aria-label="Press this button or the Escape key to open the main menu"
	on:click={onClick}
>
	<div class="down-arrow-container">
		<Icon icon="ion:arrow-down" />
	</div>
	<div class="key">ESC</div>
</button>

<style lang="scss">
	@keyframes fadeInOut {
		0% {
			opacity: 0;
		}
		80% {
			opacity: 0;
		}
		85% {
			opacity: 1;
		}
		95% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes press {
		0% {
			margin-top: 0;
			border-bottom: 0.5rem solid var(--light-500);
		}
		85% {
			margin-top: 0;
			border-bottom: 0.5rem solid var(--light-500);
		}
		86% {
			margin-top: 0.5rem;
			border-bottom: 1px solid var(--light-500);
		}
		87% {
			margin-top: 0;
			border-bottom: 0.5rem solid var(--light-500);
		}
		92% {
			margin-top: 0;
			border-bottom: 0.5rem solid var(--light-500);
		}
		93% {
			margin-top: 0.5rem;
			border-bottom: 1px solid var(--light-500);
		}
		94% {
			margin-top: 0;
			border-bottom: 0.5rem solid var(--light-500);
		}
		100% {
			margin-top: 0;
			border-bottom: 0.5rem solid var(--light-500);
		}
	}

	.press-escape {
		--press-escape-size: 2.5rem;

		position: relative;
		display: none;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		width: var(--press-escape-size);
		height: var(--press-escape-size);
		background: none;
		border: none;
		outline: none;

		@media (min-width: 768px), (hover: hover), (-moz-touch-enabled: 0), (pointer: fine) {
			display: flex;
		}
	}

	.down-arrow-container {
		position: absolute;
		bottom: 100%;
		left: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		font-size: 1.5rem;
		transform: translateX(-50%);
		animation: fadeInOut 7s infinite;
	}

	.key {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--press-escape-size);
		height: var(--press-escape-size);
		border: 1px solid var(--light-500);
		border-bottom: 0.5rem solid var(--light-500);
		border-radius: 0.5rem;
		border-bottom-right-radius: 10px 15px;
		border-bottom-left-radius: 10px 15px;
		animation: press 7s infinite;
	}
</style>
