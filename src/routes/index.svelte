<script lang="ts">
	import { websocket } from '$lib/websocket';
	import { readable } from 'svelte/store';
	import { browser } from '$app/env';

	const socket = browser ? websocket('ws://homeassistant.local:8099/api') : readable({});

	let c = 0;
	$: if (c++ < 100) console.log($socket);
</script>

{#if browser}
	Hello
{/if}
