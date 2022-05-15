<script lang="ts">
	import { valueForService, type MQTTStore } from '$lib/websocket';

	import type { BinarySwitchFeature, Device } from '$types/z2m';

	import Presets from './presets.svelte';
	export let feature: BinarySwitchFeature;
	export let state: MQTTStore;
	export let device: Device;

	$: value = valueForService(state, device, feature);
</script>

<label>
	<input type="checkbox" bind:checked={$value} />
	{feature.name}
</label>

<Presets {feature} bind:value={$value} />
