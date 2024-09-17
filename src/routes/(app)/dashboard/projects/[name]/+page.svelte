<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Environment from './environment-form.svelte';
	import FlagForm from './flag-form.svelte';
	import { Rocket } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as Alert from '$lib/components/ui/alert';
	import { Badge } from '$lib/components/ui/badge';
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
												{new Date(data.data?.createdAt).toLocaleString()}
											</dd>
										</div>
										<div class="bg-muted/40 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-sm font-medium text-gray-500">Updated At</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
												{new Date(data.data?.updatedAt).toLocaleString()}
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
						{#if data.data?.enviroments.length === 0}
							<Alert.Root>
								<Rocket class="h-4 w-4" />
								<Alert.Title>Heads up!</Alert.Title>
								<Alert.Description
									>Please create an environment to start creating flags</Alert.Description
								>
							</Alert.Root>
						{/if}
						{#if data.data?.flags && data.data?.enviroments.length > 0}
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
												<Table.Row role='button' on:click={() => goto(`/dashboard/flags/${flag.id}`)}>
													<Table.Cell class="font-medium">{flag.name}</Table.Cell>
													<Table.Cell>{flag.kind}</Table.Cell>
													<Table.Cell>{flag.archived}</Table.Cell>
													<Table.Cell class="text-right">
														{new Date(flag.createdAt).toLocaleString()}
													</Table.Cell>
												</Table.Row>
											{/each}
										</Table.Body>
									</Table.Root>
								</Card.Content>
								<Card.Footer class="justify-center border-t p-4">
									<FlagForm {data} />
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
									{#if data.data?.enviroments.length}
										<Table.Root>
											<Table.Header>
												<Table.Row>
													<Table.Head class="w-[100px]">Name</Table.Head>
													<Table.Head class="w-[100px]">Created At</Table.Head>
												</Table.Row>
											</Table.Header>
											<Table.Body>
												{#each data.data.enviroments as env}
													<Table.Row >
														<Table.Cell class="font-medium">{env.name}</Table.Cell>
														<Table.Cell>{env.createdAt}</Table.Cell>
													</Table.Row>
												{/each}
											</Table.Body>
										</Table.Root>
									{:else}
										<Separator orientation="horizontal" />
										<Card.Description class="m-4 pt-5"
											>Please create an environment to start creating flags</Card.Description
										>
									{/if}
								</Card.Content>
								<Card.Footer class="justify-center border-t p-4">
									<Environment {data} />
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
									<div>
										{#if data.data?.archived}
											<Badge variant="default">Archived</Badge>
										{:else}
											<Badge variant="outline">Active</Badge>
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
