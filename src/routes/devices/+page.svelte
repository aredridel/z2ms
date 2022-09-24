<script lang="ts">
	import { valueAt } from '$lib/websocket';
	import { state } from '$lib/connection';
	import sortBy from 'sort-by';

	const devices = valueAt(state, 'bridge/devices');
</script>

<ul>
	{#each ($devices || []).sort(sortBy('friendly_name')) as device}
		<li>
			<details>
				<summary>
					<a href="/device-{device.ieee_address}">
						{device.friendly_name}
					</a>
				</summary>
				<pre>{JSON.stringify(device, null, 2)}</pre>
			</details>
		</li>
	{/each}
</ul>
