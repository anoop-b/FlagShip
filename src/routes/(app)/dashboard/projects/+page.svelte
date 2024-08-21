<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<div class="flex w-full flex-col items-center text-center">
	<div class="flex w-full justify-end px-4">
		<Button variant="outline" class="mt-4">Create Project</Button>
	</div>
	<div class="m-4 grid w-full min-w-min gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each data.data as project}
			<Card.Root
				class="hover:bg-gray-50"
				on:click={() => goto(`/dashboard/projects/${project.name}`)}
			>
				<Card.Header class="flex pb-2">
					<Card.Title class="text-2xl font-medium">{project.name}</Card.Title>
					<Separator />
				</Card.Header>
				<Card.Content class="flex justify-center space-x-4">
					<p>Flags</p>
					<Separator orientation="vertical" />
					<div>{project.flags.length}</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
