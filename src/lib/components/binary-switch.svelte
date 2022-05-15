<script lang="ts">
	import type { BinarySwitchFeature } from '$types/z2m';

	import type { Writable } from 'svelte/store';
	import Presets from './presets.svelte';
	export let value: Writable<boolean>;
	export let feature: BinarySwitchFeature;
	export let name: string;
</script>

<label>
	<input type="checkbox" bind:checked={$value} />
	{name}
</label>

<Presets {feature} bind:value={$value} />
