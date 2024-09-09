<script lang="ts" context="module">
	export const projectFormSchema = z.object({
		name: z.string().min(3).max(50),
		description: z.string().min(3).max(50)
	});

	export type ProjectFormSchema = typeof projectFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { z } from 'zod';

	export let data: SuperValidated<Infer<ProjectFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(projectFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Create Project</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create Project</Dialog.Title>
			<Dialog.Description>Creates a new Project</Dialog.Description>
		</Dialog.Header>
		<form method="POST" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Project Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
				</Form.Control>
				<Form.Description>This is your project display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Project Description</Form.Label>
					<Input {...attrs} bind:value={$formData.description} />
				</Form.Control>
				<Form.Description>Short description of the project</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Dialog.Footer>
				<div class="flex flex-1 justify-between">
					<Form.Button variant="outline">Cancel</Form.Button>
					<Form.Button>Submit</Form.Button>
				</div>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
