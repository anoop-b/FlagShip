<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Flag } from 'lucide-svelte';
	import { configFormSchema } from '$lib/schemas/forms-schemas';
	import type { PageServerData } from './$types';
	import { Switch } from '$lib/components/ui/switch';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner';

	export let data: PageServerData;
	export let index: number;

	const form = superForm(data.configForm, {
		validators: zodClient(configFormSchema),
		onUpdated({ form }) {
			if (form.valid) {
				toast.success('Status:', {
					description: form.message
				});
				if (data.data?.project.enviroments[index]) {
					if (data.data.configs[index]) {
						$formData = {
							id: data.data.configs[index].id,
							environment_id: data.data?.configs[index].environment_id,
							value: data.data.configs[index].value
						};
					} else {
						$formData = {
							environment_id: data.data?.project.enviroments[index].id,
							value: false
						};
					}
				}
			} else {
				toast.error('Status:', {
					description: form.message
				});
			}
		},
		id: index.toString()
	});

	const { form: formData, enhance } = form;

	if (data.data?.project.enviroments[index]) {
		if (data.data.configs[index]) {
			form.reset({
				data: {
					id: data.data.configs[index].id,
					environment_id: data.data.configs[index].environment_id,
					value: data.data.configs[index].value
				}
			});
		} else {
			form.reset({
				data: {
					environment_id: data.data?.project.enviroments[index].id,
					value: false
				}
			});
		}
	}
</script>

<Dialog.Root>
	<Toaster />
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
		<Flag class="h-3.5 w-3.5" />
	</Dialog.Trigger>
	<Dialog.Content class="m-4 sm:max-w-lg">
		<Dialog.Header>
			<Dialog.Title>Update Flag</Dialog.Title>
			<Dialog.Description>Sets or updates Flag Value</Dialog.Description>
		</Dialog.Header>
		<form method="POST" class="w-full space-y-6" use:enhance>
			<legend class="text-sm"
				>Last Updated: {data.data?.configs[index]
					? data.data.configs[index].updatedAt
					: 'Never'}</legend
			>
			<Form.Field {form} name="id">
				<Form.Control let:attrs>
					<Input {...attrs} type="hidden" bind:value={$formData.id} />
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="environment_id">
				<Form.Control let:attrs>
					<Input {...attrs} type="hidden" bind:value={$formData.environment_id} />
				</Form.Control>
			</Form.Field>
			<Form.Field
				{form}
				name="value"
				class="my-4 flex flex-row items-center justify-between rounded-lg border p-4"
			>
				<Form.Control let:attrs>
					<div class="space-y-0.5">
						<Form.Label class="text-lg font-semibold tracking-tight"
							>{data.data?.project.enviroments[index].name}</Form.Label
						>
						<Form.Description>Assign value for the given environment</Form.Description>
					</div>
					<div class="space-y-0.5">
						<Switch {...attrs} includeInput bind:checked={$formData.value} />
						<p
							class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
						>
							{$formData.value}
						</p>
					</div>
				</Form.Control>
			</Form.Field>

			<Dialog.Footer>
				<Dialog.Close>
					<Form.Button type="submit">Submit</Form.Button>
				</Dialog.Close>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
