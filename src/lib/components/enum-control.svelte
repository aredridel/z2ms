<script lang="ts">
	import { valueForService, type MQTTStore } from '$lib/websocket';

	import type { EnumFeature, Device } from '$types/z2m';
	import { JsonView } from '@zerodevx/svelte-json-view';

	export let feature: EnumFeature;
	export let state: MQTTStore;
	export let device: Device;

	$: value = valueForService(state, device, feature);
</script>

{#each feature.values as val}
	<button
		on:click={() => {
			$value = val;
		}}
	>
		{val}
	</button>
{/each}
{feature.name}
