<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { CirclePlus } from 'lucide-svelte';
	import {
		enviromentCreateFormSchema,
	} from '$lib/schemas/forms-schemas';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const form = superForm(data.flagForm, {
		id: data.data.id.toString(),
		validators: zodClient(enviromentCreateFormSchema),
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'ghost' })}>
		<CirclePlus class="h-3.5 w-3.5" />
		Add Environment
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create Environment</Dialog.Title>
			<Dialog.Description>Creates a new Environment</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/createEnvironment" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Environment Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
				</Form.Control>
				<Form.Description>This is your environment display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Environment Description</Form.Label>
					<Input {...attrs} bind:value={$formData.description} />
				</Form.Control>
				<Form.Description>Short description of the Environment</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Dialog.Footer>
				<Dialog.Close>
					<Form.Button>Submit</Form.Button>
				</Dialog.Close>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
