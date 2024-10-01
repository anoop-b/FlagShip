import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { and, eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db';
import { configFormSchema } from '$lib/schemas/forms-schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { type Actions } from '@sveltejs/kit';

export const load = (async (events) => {
	const id = events.params.id;

	const db = getDb(events);
	const results = await db.query.flagsTable.findFirst({
		where: eq(schema.flagsTable.id, +id),
		with: {
			project: {
				with: {
					enviroments: true
				}
			},
			configs: {
				with: {
					environment: true
				}
			}
		}
	});
	return {
		data: results,
		configForm: await superValidate(zod(configFormSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(configFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const flagId = event.params.id;
		if (flagId) {
			const db = getDb(event);
			const res = await db
				.insert(schema.configTable)
				.values({
					flag_id: +flagId,
					...form.data
				})
				.onConflictDoUpdate({
					target: schema.configTable.id,
					set: {
						value: form.data.value
					}
				})
				.returning({ id: schema.configTable.id, value: schema.configTable.value });

			if (res) {
				return message(form, 'Successfully Updated Flag Value');
			}
			return message(form, 'something went wrong while updating the Flag Configuration');
		}
	}
};
