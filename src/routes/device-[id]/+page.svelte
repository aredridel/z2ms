<script lang="ts">
	import { valueAt } from '$lib/websocket.js';
	import { state } from '$lib/connection.js';
	import { page } from '$app/stores';
	import type { Readable } from 'svelte/store';
	import type { Device } from '$lib/device.js';
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

<details>
	<summary>Device Definition</summary>
	<pre>{JSON.stringify(device.definition, null, 2)}</pre>
</details>
<details>
	<summary>Device State</summary>
	<pre>{JSON.stringify($device_state, null, 2)}</pre>
</details>
{/if}
