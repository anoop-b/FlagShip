import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { getDb } from '$lib/server/db';
import { projectFormSchema } from '$lib/schemas/forms-schemas';

export const load = (async (events) => {
	const db = getDb(events);

	try {
		const results = await db.query.projectsTable.findMany({
			with: {
				flags: true
			}
		});

		if (results.length > 0) {
			return {
				data: results,
				form: await superValidate(zod(projectFormSchema))
			};
		}

		console.log('No projects found, creating new default project');

		try {
			await db
				.insert(schema.projectsTable)
				.values({ name: 'Default', description: 'default project' })
				.execute();
		} catch (error) {
			console.error('Error creating default project:', error);
			return fail(500, { message: 'Failed to create default project' });
		}
	} catch (error) {
		console.error('Error in load function:', error);
		return fail(500, { message: 'An error occurred while loading the page' });
	}

	throw redirect(302, '/dashboard');
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(projectFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		let projectName: string;

		try {
			const db = getDb(event);
			const res = await db
				.insert(schema.projectsTable)
				.values(form.data)
				.returning({ name: schema.projectsTable.name });

			projectName = res[0].name;
		} catch (error) {
			console.error('Error in default action:', error);
			return fail(500, { message: 'An error occurred while processing your request' });
		}

		throw redirect(302, `/dashboard/projects/${projectName}/`);
	}
};
