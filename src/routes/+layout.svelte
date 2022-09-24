<script>
	import '../app.css';
	import { valueAt } from '$lib/websocket';
	import { state } from '$lib/connection';

	const connection = valueAt(state, 'bridge/state');
</script>

<header>
	<nav>
		<ul class="navbar">
			<li><a href="/">/</a></li>
			<li><a href="/devices">Devices</a></li>
			<li><a href="/groups">Groups</a></li>
			<li><a href="/updates">Updates</a></li>
		</ul>
	</nav>

	{$connection ? $connection.state : 'disconnected'}
</header>

<main>
	<slot />
</main>
