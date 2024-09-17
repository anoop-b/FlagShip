<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageServerData } from './$types';
	import EditProject from './editProject.svelte';
	import { enhance } from '$app/forms';
	export let data: PageServerData;
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
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
					<Button variant="outline" size="icon" class="h-7 w-7">
						<ChevronLeft class="h-4 w-4" />
						<span class="sr-only">Back</span>
					</Button>
					<h1
						class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0"
					>
						{data.data?.name}
					</h1>
					<div class="hidden items-center gap-2 md:ml-auto md:flex">
						<Button variant="outline" size="sm">Discard</Button>
						<Button size="sm">Save Project</Button>
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
								<EditProject data={data.form} />
							</Card.Content>
						</Card.Root>
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
						<!-- TODO: add undo archive button -->
						<Card.Root>
							<Card.Header>
								<Card.Title>Archive Project</Card.Title>
								<Card.Description>
									Archive project not in use. This operation does not delete the project
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<form method="POST" action="?/archiveProject" use:enhance>
									<Button type="submit" size="sm" variant="secondary">Archive Project</Button>
								</form>
							</Card.Content>
						</Card.Root>
						<Card.Root>
							<Card.Header>
								<Card.Title>Delete Project</Card.Title>
								<Card.Description>
									Deleting a project will remove all the flags and enviroments associated with the
									project
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<form method="POST" action="?/deleteProject" use:enhance>
									<Button type="submit" size="sm" variant="destructive">Delete Project</Button>
								</form>
							</Card.Content>
						</Card.Root>
					</div>
				</div>
				<div class="flex items-center justify-center gap-2 md:hidden">
					<Button variant="outline" size="sm">Discard</Button>
					<Button size="sm">Save Project</Button>
				</div>
			</div>
		</main>
	</div>
</div>
