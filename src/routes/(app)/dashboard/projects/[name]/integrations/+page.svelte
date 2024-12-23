<script lang="ts">
	import type { PageData } from './$types';

	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import StoresForm from './stores-form.svelte';
	import { Database } from 'lucide-svelte';
	export let data: PageData;
</script>

<div class="m-4 p-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>Flag Stores</Card.Title>
			<Card.Description>All stores associated with the project</Card.Description>
		</Card.Header>
		{#if data.data?.stores}
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[100px]">Namespace</Table.Head>
							<Table.Head class="w-[100px]">Updated At</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell class="font-medium">{data.data.stores.namespace_id}</Table.Cell>
							<Table.Cell>{data.data.stores.updatedAt}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</Card.Content>
			<Card.Footer class="justify-center border-t p-4">
				<StoresForm {data} />
			</Card.Footer>
		{:else}
			<Card.Content>
				<div
					class="m-4 mx-auto flex max-w-[420px] flex-col items-center justify-center text-center"
				>
					<Database />
					<h4 class="scroll-m-20 py-2 text-xl font-semibold tracking-tight">No Stores added</h4>
					<StoresForm {data} />
				</div>
			</Card.Content>
		{/if}
	</Card.Root>
</div>
