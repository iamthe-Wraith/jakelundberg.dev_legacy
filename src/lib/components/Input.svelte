<script lang="ts">
	import { getRandomNum } from '$lib/utils/number';
	export let thickness = 3;
	export let kind: 'primary' | 'secondary' | 'neutral' = 'neutral';
	export let type: 'text' | 'email' | 'password' = 'text';
	export let name = '';
	export let id = `input-${crypto.randomUUID()}`;
	export let label = '';
	export let value = '';
	export let error = '';

	const minorRadius = getRandomNum(6, 19);
	const majorRadius = getRandomNum(230, 260);
</script>

<div class="input-container" id={`${id}-container`}>
	{#if !!label}
		<label for={id}>
			{label}
		</label>
	{/if}

	<input
		{type}
		{name}
		{id}
		{value}
		class="input-wrapper {kind}"
		style="
      border-width: {thickness}px;
      border-top-left-radius: {majorRadius}px {minorRadius + 11}px;
      border-top-right-radius: {minorRadius + 11}px {majorRadius}px;
      border-bottom-right-radius: {majorRadius}px {minorRadius + 11}px;
      border-bottom-left-radius: {minorRadius + 11}px {majorRadius}px;
    "
		on:change
		on:keydown
		on:keyup
		on:keypress
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
	label {
		display: block;
		margin-bottom: 0.2rem;
		padding: 0 0.6rem;
		font-size: 0.8rem;
		color: var(--light-500);
	}

	input {
		width: 100%;
		height: 100%;
		padding: 0.3rem 0.6rem;
		font-size: 0.9rem;
		border-style: solid;
		background: var(--dark-100);
		color: var(--light-500);
		outline: none;

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
