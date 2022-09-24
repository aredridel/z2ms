<script lang="ts">
	import type { Device } from '$lib/device.js';
	import {
		type Feature,
		isEnumFeature,
		isNumericFeature,
		isBinaryFeature,
		isLightFeature
	} from "$lib/feature.js";
	import {
		type MQTTStore,
		FeatureAccessMode
	} from '$lib/websocket.js';
	import BinarySwitch from '$lib/components/binary-switch.svelte';
	import NumericControl from '$lib/components/numeric-control.svelte';
	import EnumControl from '$lib/components/enum-control.svelte';
	import { JsonView } from '@zerodevx/svelte-json-view';

	export let feature: Feature;
	export let device: Device;
	export let state: MQTTStore;
</script>

<li>
	{#if isLightFeature(feature)}
		<p>{feature.type}</p>
		<ul>
			{#each feature.features as feature}
				<svelte:self {feature} {state} {device} />
			{/each}
		</ul>
	{:else if isBinaryFeature(feature) && feature.access & FeatureAccessMode.ACCESS_WRITE}
		<BinarySwitch {state} {device} {feature} />
	{:else if isNumericFeature(feature) && feature.access & FeatureAccessMode.ACCESS_WRITE}
		<NumericControl {state} {device} {feature} />
	{:else if isEnumFeature(feature) && feature.access & FeatureAccessMode.ACCESS_WRITE}
		<EnumControl {state} {device} {feature} />
	{:else}
		<JsonView json={feature} />
	{/if}
</li>
