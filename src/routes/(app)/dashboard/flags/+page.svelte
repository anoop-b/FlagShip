<script lang="ts">
	import { goto } from '$app/navigation';
	export let data;
	import * as Table from '$lib/components/ui/table/index.js';
</script>

<div class="flex flex-1 flex-col">
	<div class="m-4 rounded-xl border bg-white p-4">
		<Table.Root>
			<Table.Caption>A list of your Flags across all Projects</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[200px]">Name</Table.Head>
					<Table.Head>Kind</Table.Head>
					<Table.Head>Archived</Table.Head>
					<Table.Head class="text-right">Project</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.data as flag}
					<Table.Row on:click={() => goto(`/dashboard/flags/${flag.id}`)}>
						<Table.Cell class="font-medium">{flag.name}</Table.Cell>
						<Table.Cell>{flag.kind}</Table.Cell>
						<Table.Cell>{flag.archived}</Table.Cell>
						<Table.Cell class="text-right">{flag.project.name}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
