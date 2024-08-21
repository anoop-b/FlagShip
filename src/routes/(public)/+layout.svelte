<script lang="ts">
	import '../../app.css';
</script>

<div class="flex h-screen flex-col justify-between">
	<header class="bg-IFF-50 flex items-center justify-between p-4">
		<h1 class="text-IFF-500 text-2xl font-bold underline underline-offset-8">
			<a href="/">🏳️ FlagShip</a>
		</h1>
		<nav>
			<ul class="flex space-x-4">
				<li><a href="/faq">FAQ</a></li>
			</ul>
		</nav>
	</header>

	<main class="container">
		<slot />
	</main>

	<footer class="bg-IFF-100 p-4 text-center">
		<em> Made with ❤️ by <a href="https://djoker.tech">the Joker</a> </em>
	</footer>
</div>
