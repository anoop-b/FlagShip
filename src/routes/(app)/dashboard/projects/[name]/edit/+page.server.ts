import type { Actions, PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { projectFormSchema } from '$lib/schemas/forms-schemas';

export const load = (async (events) => {
	const name = events.params.name;
	const db = getDb(events);
	const results = await db.query.projectsTable.findFirst({
		where: eq(schema.projectsTable.name, name),
		with: {
			flags: true,
			enviroments: true
		}
	});

	if (!results) {
		throw error(404, 'Project Not Found');
	}
	return {
		data: results,
		form: await superValidate(results, zod(projectFormSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	editProject: async (event) => {
		const form = await superValidate(event, zod(projectFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const db = getDb(event);
		const res = await db
			.update(schema.projectsTable)
			.set(form.data)
			.where(eq(schema.projectsTable.name, event.params.name))
			.returning({ name: schema.projectsTable.name });
		redirect(302, `/dashboard/projects/${res[0].name}/`);
	},
	archiveProject: async (event) => {
		const db = getDb(event);
		const res = await db
			.update(schema.projectsTable)
			.set({
				archived: true
			})
			.where(eq(schema.projectsTable.name, event.params.name))
			.returning({ name: schema.projectsTable.name });
		redirect(302, `/dashboard/projects/${res[0].name}/`);
	},
	deleteProject: async (event) => {
		const db = getDb(event);
		const res = await db
			.delete(schema.projectsTable)
			.where(eq(schema.projectsTable.name, event.params.name))
			.execute();
		console.dir(res);
		redirect(302, `/dashboard/projects/`);
	}
};
