<script lang="ts">
	import type { NumericFeature } from '$types/z2m';
	import type { Writable } from 'svelte/store';

	export let value: Writable<number>;
	export let name: string;
	export let feature: NumericFeature;
</script>

{#if feature.value_min != null && feature.value_max != null}
	<label>
		<input type="range" bind:value={$value} min={feature.value_min} max={feature.value_max} />
		{name}
	</label>
{:else}
	<label>
		<input type="number" bind:value={$value} min={feature.value_min} max={feature.value_max} />
		{name}
	</label>
{/if}
