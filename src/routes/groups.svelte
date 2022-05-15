<script lang="ts">
	import { valueAt } from '$lib/websocket';
	import { state } from '$lib/connection';

	const groups = valueAt(state, 'bridge/groups');
</script>

{#if $groups}
	<ul>
		{#each $groups as group}
			<li>
				<details>
					<summary>
						{group.friendly_name}
					</summary>
					<pre>{JSON.stringify(group, null, 2)}</pre>
				</details>
			</li>
		{/each}
	</ul>
{/if}
