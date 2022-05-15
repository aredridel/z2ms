<script lang="ts">
	import { valueAt } from '$lib/websocket';
	import { state } from '$lib/connection';
	import { page } from '$app/stores';
	import type { Readable } from 'svelte/store';
	import type { Device } from '$types/z2m';
	import { JsonView } from '@zerodevx/svelte-json-view';
	import FeatureControls from '$lib/components/feature-controls.svelte';

	const devices: Readable<Device[]> = valueAt(state, 'bridge/devices');

	$: device = $devices ? $devices.find((e) => e.ieee_address == $page.params.id) : null;

	$: device_state = device ? valueAt(state, `${device.friendly_name}`) : null;
</script>

{#if device && $device_state}
	<h2>{device.friendly_name}</h2>
	<p>{device.definition.description}</p>

	<ul>
		{#each device.definition.exposes as feature}
			<FeatureControls {feature} {device} {state} />
		{/each}
	</ul>
	<JsonView json={device.definition} />
	<JsonView json={$device_state} />
{/if}
