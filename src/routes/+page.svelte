<script lang="ts">
	import { state } from '$lib/connection.js';

	let c = 0;
	$: if (c++ < 100) console.log({$state});
</script>
