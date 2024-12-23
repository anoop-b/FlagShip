<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { CirclePlus } from 'lucide-svelte';
	import { storesFormSchema } from '$lib/schemas/forms-schemas';
	import type { PageServerData } from './$types';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner';
	export let data: PageServerData;

	const form = superForm(data.storesForm, {
		id: data.data?.id.toString(),
		validators: zodClient(storesFormSchema),
		onUpdated({ form }) {
			toast.error('Please check your credentials', {
				description: form.message
			});
		}
	});
	const { form: formData, enhance } = form;
</script>

<Dialog.Root>
	<Toaster />
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<CirclePlus class="h-3.5 w-3.5" />
		Add KV Integration
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Cloudflare KV Intergration</Dialog.Title>
			<Dialog.Description>Connects project to KV store</Dialog.Description>
		</Dialog.Header>
		<form method="POST" use:enhance>
			<Form.Field {form} name="cfAccountId">
				<Form.Control let:attrs>
					<Form.Label>Cloudflare Account ID</Form.Label>
					<Input {...attrs} bind:value={$formData.cfAccountId} />
				</Form.Control>
				<Form.Description>Account ID of the desitnation Cloudflare account</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="cfApiToken">
				<Form.Control let:attrs>
					<Form.Label>Cloudflare API Token</Form.Label>
					<Input {...attrs} bind:value={$formData.cfApiToken} />
				</Form.Control>
				<Form.Description>API Token with EDIT access to KV</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="cfKvNamespaceId">
				<Form.Control let:attrs>
					<Form.Label>Cloudflare KV Namespace ID</Form.Label>
					<Input {...attrs} bind:value={$formData.cfKvNamespaceId} />
				</Form.Control>
				<Form.Description>ID for the KV Namespace</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Dialog.Footer>
				<Form.Button>Submit</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
