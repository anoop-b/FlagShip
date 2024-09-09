<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export let data: PageServerData;
</script>

<div class="flex min-h-screen w-full flex-col">
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<header
			class="sticky flex items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
		>
			<Breadcrumb.Root class="hidden md:flex">
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/dashboard">Dashboard</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/dashboard/projects">Projects</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>{data.data?.name}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-8">
				<div class="flex items-center gap-4">
					<Button href="/dashboard/projects" variant="outline" size="icon" class="h-7 w-7">
						<ChevronLeft class="h-4 w-4" />
						<span class="sr-only">Back</span>
					</Button>
					<h1
						class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0"
					>
						{data.data?.name}
					</h1>
					<div class="hidden items-center gap-2 md:ml-auto md:flex">
						<Button href="{$page.url}/edit" size="sm">Edit Project</Button>
					</div>
				</div>
				<div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Card.Root>
							<Card.Header>
								<Card.Title>Project Details</Card.Title>
								<Card.Description>
									Lipsum dolor sit amet, consectetur adipiscing elit
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<div>
									<dl>
										<div class="bg-muted/40 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-sm font-medium text-gray-500">Name</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
												{data.data?.name}
											</dd>
										</div>
										<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-sm font-medium text-gray-500">Created At</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
												{data.data?.createdAt}
											</dd>
										</div>
										<div class="bg-muted/40 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-sm font-medium text-gray-500">Updated At</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
												{data.data?.updatedAt}
											</dd>
										</div>
										<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-sm font-medium text-gray-500">Total Flags</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
												{data.data?.flags.length}
											</dd>
										</div>
										<div class="bg-muted/40 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-sm font-medium text-gray-500">Total Enviroments</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
												{data.data?.enviroments.length}
											</dd>
										</div>
										<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-sm font-medium text-gray-500">Description</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
												{data.data?.description}
											</dd>
										</div>
									</dl>
								</div>
							</Card.Content>
						</Card.Root>
						{#if data.data?.flags}
							<Card.Root>
								<Card.Header>
									<Card.Title>Flags</Card.Title>
									<Card.Description>All flags associated with the project</Card.Description>
								</Card.Header>
								<Card.Content>
									<Table.Root>
										<Table.Header>
											<Table.Row>
												<Table.Head class="w-[100px]">Name</Table.Head>
												<Table.Head>kind</Table.Head>
												<Table.Head>Archived</Table.Head>
												<Table.Head class="w-[100px]">Created At</Table.Head>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{#each data.data.flags as flag}
												<Table.Row on:click={() => goto(`/dashboard/projects/${flag.project_id}`)}>
													<Table.Cell class="font-medium">{flag.name}</Table.Cell>
													<Table.Cell>{flag.kind}</Table.Cell>
													<Table.Cell>{flag.archived}</Table.Cell>
													<Table.Cell class="text-right">{flag.createdAt}</Table.Cell>
												</Table.Row>
											{/each}
										</Table.Body>
									</Table.Root>
								</Card.Content>
								<Card.Footer class="justify-center border-t p-4">
									<Button size="sm" variant="ghost" class="gap-1">
										<CirclePlus class="h-3.5 w-3.5" />
										Add Variant
									</Button>
								</Card.Footer>
							</Card.Root>
						{/if}
						{#if data.data?.enviroments}
							<Card.Root>
								<Card.Header>
									<Card.Title>Environments</Card.Title>
									<Card.Description>All enviroments associated with the project</Card.Description>
								</Card.Header>
								<Card.Content>
									<Table.Root>
										<Table.Header>
											<Table.Row>
												<Table.Head class="w-[100px]">Name</Table.Head>
												<Table.Head class="w-[100px]">Created At</Table.Head>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{#each data.data.enviroments as env}
												<Table.Row on:click={() => goto(`/dashboard/projects/${env.project_id}`)}>
													<Table.Cell class="font-medium">{env.name}</Table.Cell>
													<Table.Cell>{env.createdAt}</Table.Cell>
												</Table.Row>
											{/each}
										</Table.Body>
									</Table.Root>
								</Card.Content>
								<Card.Footer class="justify-center border-t p-4">
									<Button size="sm" variant="ghost" class="gap-1">
										<CirclePlus class="h-3.5 w-3.5" />
										Add Variant
									</Button>
								</Card.Footer>
							</Card.Root>
						{/if}
					</div>
					<div class="grid auto-rows-max items-start gap-4 lg:gap-8">
						<Card.Root>
							<Card.Header>
								<Card.Title>Project Status</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="grid gap-6">
									<div class="grid gap-3">
										{#if data.data?.archived}
											<Label for="status">Archived</Label>
										{:else}
											<Label for="status">Active</Label>
										{/if}
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>
				</div>
				<div class="flex items-center justify-center gap-2 md:hidden">
					<Button href="{$page.url}/edit">Edit Project</Button>
				</div>
			</div>
		</main>
	</div>
</div>
