<script lang="ts">
	import { valueForService, type MQTTStore } from '$lib/websocket';

	import type { Device, NumericFeature } from '$types/z2m';
	import Presets from './presets.svelte';

	import { damper } from '$lib/damper';

	export let feature: NumericFeature;
	export let device: Device;
	export let state: MQTTStore;

	$: value = valueForService(state, device, feature);
	$: dampedValue = damper(value);
</script>

{#if feature.value_min != null && feature.value_max != null}
	<label>
		<input
			type="range"
			bind:value={$dampedValue}
			min={feature.value_min}
			max={feature.value_max}
			on:mousedown={dampedValue.hold}
			on:mouseup={dampedValue.release}
		/>
		{feature.name}
	</label>
{:else}
	<label>
		<input type="number" bind:value={$value} min={feature.value_min} max={feature.value_max} />
		{feature.name}
	</label>
{/if}

<Presets {feature} bind:value={$value} />
