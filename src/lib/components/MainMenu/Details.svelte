<script lang="ts">
	export let title: string;
</script>

<div class="main-menu-details-container">
	<h3>{title}</h3>
	<div class="main-menu-details no-scrollbar">
		<slot />
	</div>
</div>

<style lang="scss">
	.main-menu-details-container {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
	}

	h3 {
		margin-bottom: 1rem;
	}

	.main-menu-details {
		flex: 1;
		overflow: auto;
	}
</style>
