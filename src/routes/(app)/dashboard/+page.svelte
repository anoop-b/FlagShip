<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { DollarSign, CreditCard, Activity, Flag } from 'lucide-svelte';
	export let data;
</script>

<div class="flex flex-1 flex-col gap-1 text-center">
	<div class="m-4 grid flex-1 items-center gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
		<Card.Root role="button" on:click={() => goto('/dashboard/projects')} class="hover:shadow-xl">
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Projects</Card.Title>
				<DollarSign class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{data.data.projects[0].count}</div>
				<p class="text-xs text-muted-foreground">+20.1% from last month</p>
			</Card.Content>
		</Card.Root>
		<Card.Root role="button" on:click={() => goto('/dashboard/flags')} class="hover:shadow-xl">
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Flags</Card.Title>
				<Flag class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{data.data.flags[0].count}</div>
				<p class="text-xs text-muted-foreground">+180.1% from last month</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">TODO</Card.Title>
				<CreditCard class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+12,234</div>
				<p class="text-xs text-muted-foreground">+19% from last month</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">TODO</Card.Title>
				<Activity class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+573</div>
				<p class="text-xs text-muted-foreground">+201 since last hour</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>
