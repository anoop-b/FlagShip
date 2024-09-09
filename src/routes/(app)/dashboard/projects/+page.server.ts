import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { projectFormSchema } from './project-form.svelte';
import { getDb } from '$lib/server/db';

export const load = (async (events) => {
	const db = getDb(events);
	// TODO: pagination
	const results = await db.query.projectsTable.findMany({
		with: {
			flags: true
		}
	});

	if (results.length == 0) {
		console.log('No projects found, creating new default project');
		await db
			.insert(schema.projectsTable)
			.values({ name: 'Default', description: 'default project' })
			.execute();
		redirect(302, '/dashboard');
	}

	return {
		data: results,
		form: await superValidate(zod(projectFormSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	// TODO: error handling
	default: async (event) => {
		const form = await superValidate(event, zod(projectFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const db = getDb(event);
		const res = await db
			.insert(schema.projectsTable)
			.values(form.data)
			.returning({ name: schema.projectsTable.name });
		redirect(302, `/dashboard/projects/${res[0].name}/`);
	}
};
