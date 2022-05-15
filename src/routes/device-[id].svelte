<script lang="ts">
	import { valueAt, valueForService, isNumericFeature, isBinaryFeature } from '$lib/websocket';
	import { state } from '$lib/connection';
	import { page } from '$app/stores';
	import type { Readable } from 'svelte/store';
	import type { Device } from '$types/z2m';
	import BinarySwitch from '$lib/components/binary-switch.svelte';
	import NumericControl from '$lib/components/numeric-control.svelte';

	const devices: Readable<Device[]> = valueAt(state, 'bridge/devices');

	$: device = $devices ? $devices.find((e) => e.ieee_address == $page.params.id) : null;

	$: device_state = device ? valueAt(state, `${device.friendly_name}`) : null;
</script>

{#if device && $device_state}
	<h2>{device.friendly_name}</h2>
	<p>{device.definition.description}</p>

	<ul>
		{#each device.definition.exposes as group}
			{#if group.features}
				<li>
					<p>{group.type}</p>
					<ul>
						{#each group.features as feature}
							<li>
								{#if isBinaryFeature(feature)}
									<BinarySwitch
										value={valueForService(state, device, feature)}
										name={feature.name}
									/>
								{:else if isNumericFeature(feature)}
									<NumericControl
										value={valueForService(state, device, feature)}
											feature={feature}
										name={feature.name}
									/>
								{:else}
									<pre>{JSON.stringify(feature)}</pre>
								{/if}
							</li>
						{/each}
					</ul>
				</li>
			{/if}
		{/each}
	</ul>
	<pre>{JSON.stringify(device.definition, null, 2)}</pre>
	<pre>{JSON.stringify($device_state, null, 2)}</pre>
{/if}
