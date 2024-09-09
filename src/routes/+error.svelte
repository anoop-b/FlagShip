<script>
	import { page } from '$app/stores';
	import '../app.css';
</script>

<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
	<div class="text-center">
		<p class="text-4xl font-semibold">{$page.status}</p>
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
			{$page.error?.message}
		</h1>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<img class="mx-auto" width="500px" alt="error" src="https://http.dog/{$page.status}.jpg" />
		</div>
	</div>
</main>
