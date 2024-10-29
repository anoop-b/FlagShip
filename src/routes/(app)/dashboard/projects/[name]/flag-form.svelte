<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, booleanProxy, arrayProxy } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { CirclePlus } from 'lucide-svelte';
	import { flagCreateFormSchema } from '$lib/schemas/forms-schemas';
	import * as Select from '$lib/components/ui/select';
	import type { PageServerData } from './$types';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import { Separator } from '$lib/components/ui/separator';
	export let data: PageServerData;

	const form = superForm(data.flagForm, {
		id: data.data.id.toString(),
		dataType: 'json',
		validators: zodClient(flagCreateFormSchema)
	});

	const { form: formData, enhance } = form;

	data.data.enviroments.forEach((item, index) => {
		$formData.configs[index] = { environment_id: item.id, value: false };
	});

	$: selectedFormType = $formData.kind
		? {
				value: $formData.kind,
				label: $formData.kind
			}
		: undefined;
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'ghost' })}>
		<CirclePlus class="h-3.5 w-3.5" />
		Add Flag
	</Dialog.Trigger>
	<Dialog.Content class=" m-4 sm:max-w-lg">
		<Dialog.Header>
			<Dialog.Title>Create Flag</Dialog.Title>
			<Dialog.Description>Creates a new Flag</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/createForm" class="w-full space-y-6" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Flag Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
				</Form.Control>
				<Form.Description>This is your Flag display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="kind">
				<Form.Control let:attrs>
					<Form.Label>Flag type</Form.Label>
					<Select.Root
						selected={selectedFormType}
						onSelectedChange={(v) => {
							v && ($formData.kind = v.value);
						}}
					>
						<Select.Trigger class="w-[180px]" {...attrs}>
							<Select.Value placeholder="Select Type" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="boolean" label="Boolean" />
							<Select.Item value="string" label="String" />
							<Select.Item value="number" label="Number" />
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.kind} name={attrs.name} />
				</Form.Control>
				<Form.Description>This is your Flag Type</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Flag Description</Form.Label>
					<Textarea {...attrs} bind:value={$formData.description} />
				</Form.Control>
				<Form.Description>Short description of the Flag</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Separator class="my-4" />

			<Form.Fieldset {form} name="configs" class="py-4">
				<legend class="text-lg font-medium">Default Values for Enviroments</legend>

				{#each data.data?.enviroments as env, i}
					<Form.ElementField {form} name="configs[{i}].environment_id">
						<Form.Control let:attrs>
							<Input {...attrs} type="hidden" bind:value={$formData.configs[i].environment_id} />
						</Form.Control>
					</Form.ElementField>
					<Form.ElementField
						{form}
						name="configs[{i}].value"
						class="my-4 flex flex-row items-center justify-between rounded-lg border p-4"
					>
						<Form.Control let:attrs>
							<div class="space-y-0.5">
								<Form.Label>{env.name}</Form.Label>
								<Form.Description>Assigned value for the environment</Form.Description>
							</div>
							<div class="space-y-0.5">
								<Switch {...attrs} includeInput bind:checked={$formData.configs[i].value} />
								<p
									class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
								>
									{$formData.configs[i].value}
								</p>
							</div>
						</Form.Control>
					</Form.ElementField>
				{/each}
			</Form.Fieldset>

			<Dialog.Footer>
				<Form.Button>Submit</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
