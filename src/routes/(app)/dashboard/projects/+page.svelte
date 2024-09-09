<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import type { PageServerData } from './$types';
	import ProjectForm from './project-form.svelte';
	export let data: PageServerData;
</script>

<div class="flex w-full flex-col items-center text-center">
	<div class="flex w-full justify-end p-4">
		<ProjectForm data={data.form} />
	</div>
	<div class="m-4 grid w-full min-w-min gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each data.data as project}
			<Card.Root
				class="hover:bg-gray-100"
				role="button"
				on:click={() => goto(`/dashboard/projects/${project.name}`)}
			>
				<Card.Header class="flex pb-2">
					<Card.Title tag="h1">{project.name}</Card.Title>
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
