<script lang="ts">
	import { nanoid } from 'nanoid';
	import { getRandomNum } from '$lib/utils/number';

	export let thickness = 3;
	export let kind: 'primary' | 'secondary' | 'neutral' = 'neutral';
	export let name = '';
	export let id = `input-${nanoid()}`;
	export let label = '';
	export let value = '';
	export let error = '';

	const minorRadius = getRandomNum(13, 19);
	const majorRadius = getRandomNum(230, 260);
</script>

<div class="textarea-container" id={`${id}-container`}>
	{#if !!label}
		<label for={id}>
			{label}
		</label>
	{/if}

	<textarea
		{name}
		{id}
		{value}
		class="input-wrapper no-scrollbar {kind}"
		style="
        border-width: {thickness}px;
        border-top-left-radius: {majorRadius}px {minorRadius}px;
        border-top-right-radius: {minorRadius}px {majorRadius}px;
        border-bottom-right-radius: {majorRadius}px {minorRadius}px;
        border-bottom-left-radius: {minorRadius}px {majorRadius}px;
      "
		on:change
		on:keypress
		on:keydown
		on:keyup
		on:focus
		on:blur
	/>

	{#if !!error}
		<p class="error">
			{error}
		</p>
	{/if}
</div>

<style lang="scss">
	.textarea-container {
		display: flex;
		flex-direction: column;
		width: var(--textarea-width, 100%);
		height: var(--textarea-height, auto);
	}

	label {
		display: block;
		margin-bottom: 0.2rem;
		padding: 0 0.6rem;
		font-size: 0.8rem;
		color: var(--light-500);
	}

	textarea {
		flex: 1;
		width: 100%;
		height: auto;
		padding: 0.6rem;
		font-size: 0.9rem;
		border-style: solid;
		background: var(--dark-100);
		color: var(--light-500);
		outline: none;
		resize: none;

		&.primary {
			border-color: var(--primary-500);

			&:focus {
				border-color: var(--dark-500);
			}
		}

		&.secondary {
			border-color: var(--secondary-500);

			&:focus {
				border-color: var(--dark-500);
			}
		}

		&.neutral {
			border-color: var(--dark-500);

			&:focus {
				border-color: var(--secondary-500);
			}
		}
	}

	.error {
		margin-top: 0.35rem;
		padding: 0 0.6rem;
	}
</style>
