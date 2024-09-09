import type { Actions, PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { projectEditFormSchema } from './schema';

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
		form: await superValidate(results, zod(projectEditFormSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(projectEditFormSchema));
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
	}
};
