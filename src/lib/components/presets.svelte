<script lang="ts">
	import type { Feature } from '$types/z2m';

	export let feature: Feature;
	export let value;
</script>

{#if feature.presets}
	{#each feature.presets as preset}
		<button
			on:click={() => {
				value = preset.value;
			}}
		>
			{preset.name}
		</button>
	{/each}
{/if}
