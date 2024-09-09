<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms/client';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { projectEditFormSchema, type ProjectEditFormSchema } from './schema';

	export let data: SuperValidated<Infer<ProjectEditFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(projectEditFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

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
	<div class="flex flex-1 justify-between">
		<Form.Button variant="outline">Cancel</Form.Button>
		<Form.Button>Submit</Form.Button>
	</div>
</form>
