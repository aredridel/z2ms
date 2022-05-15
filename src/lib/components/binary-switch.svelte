<script lang="ts">
	import type { Writable } from 'svelte/store';
	export let value: Writable<boolean>;
	export let name: string;
</script>

<label>
	<input type="checkbox" bind:checked={$value} />
	{name}
</label>
