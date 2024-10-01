import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { enviromentCreateFormSchema, flagCreateFormSchema } from '$lib/schemas/forms-schemas';
import Cloudflare from '$lib/server/cloudflare';

export const load = (async (events) => {
	const name = events.params.name;

	const db = getDb(events);
	const results = await db.query.projectsTable.findFirst({
		where: eq(schema.projectsTable.name, name),
		with: {
			flags: true,
			enviroments: true,
			stores: true
		}
	});

	if (!results) {
		throw error(404, 'Project Not Found');
	}

	return {
		data: results,
		flagForm: await superValidate(zod(flagCreateFormSchema)),
		envForm: await superValidate(zod(enviromentCreateFormSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	// TODO: error handling
	createEnvironment: async (event) => {
		const form = await superValidate(event, zod(enviromentCreateFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const db = getDb(event);
		// TODO: if flag already exists for a project, configs needs to be handled accordingly
		const res = await db
			.insert(schema.environmentsTable)
			.values({
				name: form.data.name,
				project_id: +form.id,
				description: form.data.description
			})
			.returning({ id: schema.environmentsTable.project_id });

		
		if (res[0].id) {
			redirect(302, `/dashboard/projects/${event.params.name}/`);
		}
	},
	syncKV: async (event) => {
		const name = event.params.name;
		if (name) {
			const db = getDb(event);
			const results = await db.query.projectsTable.findFirst({
				where: eq(schema.projectsTable.name, name),
				with: {
					flags: {
						with: {
							configs: {
								with: {
									environment: true
								}
							}
						}
					},
					stores: true
				}
			});

			if (results?.stores) {
				const cf = new Cloudflare(
					results.stores.account_id,
					results.stores.namespace_id!,
					results.stores.api_token
				);
				results.stores = null;

				await db
					.update(schema.storesTable)
					.set({
						value: JSON.stringify(results)
					})
					.execute();

				const res = await cf.putValue('flagShip', JSON.stringify(results));
				if (res.ok) {
					redirect(302, `/dashboard/projects/${event.params.name}`);
				}
				error(500, 'something went wrong with KV Sync');
			}
		}
	},
	createForm: async (event) => {
		const form = await superValidate(event, zod(flagCreateFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const db = getDb(event);
		const res = await db
			.insert(schema.flagsTable)
			.values({
				project_id: +form.id,
				...form.data
			})
			.returning({ id: schema.flagsTable.id });
			console.log(res)

		if (form.data.configs.length > 0) {
			// TODO: handle both inside a transaction
			const configsArray = form.data.configs.map((conf) => ({
				flag_id: res[0].id,
				value: conf.value,
				environment_id: +conf.environment_id
			}));
			await db.insert(schema.configTable).values(configsArray).execute();
		}

		if (res[0].id) {
			redirect(302, `/dashboard/flags/${res[0].id}/`);
		}
	}
};
