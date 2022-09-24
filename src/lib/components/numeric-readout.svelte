<script lang="ts">
	import { valueAt, type MQTTStore } from '$lib/websocket.js';

	import type { Device } from '$lib/device.js';
	import type { NumericFeature } from '$lib/feature.js';

	export let feature: NumericFeature;
	export let device: Device;
	export let state: MQTTStore;

	$: value = valueAt(state, device.friendly_name);
</script>

{feature.name}

{$value[feature.name]}
