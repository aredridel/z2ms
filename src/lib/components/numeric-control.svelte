<script lang="ts">
	import { valueForService, type MQTTStore } from '$lib/websocket';

	import type { Device, NumericFeature } from '$types/z2m';
	import Presets from './presets.svelte';

	export let feature: NumericFeature;
	export let device: Device;
	export let state: MQTTStore;

	$: value = valueForService(state, device, feature);
</script>

{#if feature.value_min != null && feature.value_max != null}
	<label>
		<input type="range" bind:value={$value} min={feature.value_min} max={feature.value_max} />
		{feature.name}
	</label>
{:else}
	<label>
		<input type="number" bind:value={$value} min={feature.value_min} max={feature.value_max} />
		{feature.name}
	</label>
{/if}

<Presets {feature} bind:value={$value} />
