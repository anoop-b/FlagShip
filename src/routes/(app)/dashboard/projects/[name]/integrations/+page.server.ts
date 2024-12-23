import { getDb } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { storesFormSchema } from '$lib/schemas/forms-schemas';
import Cloudflare from '$lib/server/cloudflare';

export const load = (async (events) => {
	const name = events.params.name;

	const db = getDb(events);
	const results = await db.query.projectsTable.findFirst({
		where: eq(schema.projectsTable.name, name),
		with: {
			stores: true
		}
	});
	console.dir(results);
	return { data: results, storesForm: await superValidate(zod(storesFormSchema)) };
}) satisfies PageServerLoad;

export const actions: Actions = {
	// TODO: error handling
	default: async (event) => {
		const form = await superValidate(event, zod(storesFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		if (!(await isKvValid(form.data))) {
			return message(form, 'Failed to validate KV credentials, please check again', {
				status: 500
			});
		}
		const db = getDb(event);
		const res = await db
			.insert(schema.storesTable)
			.values({
				project_id: +form.id,
				value: JSON.stringify({
					status: 'ok'
				}),
				account_id: form.data.cfAccountId,
				api_token: form.data.cfApiToken,
				namespace_id: form.data.cfKvNamespaceId
			})
			.returning({ id: schema.environmentsTable.project_id });

		if (res[0].id) {
			redirect(302, `/dashboard/projects/${event.params.name}/`);
		}
	}
};

async function isKvValid(data: {
	cfAccountId: string;
	cfApiToken: string;
	cfKvNamespaceId: string;
}): Promise<boolean> {
	const kv = new Cloudflare(data.cfAccountId, data.cfKvNamespaceId, data.cfApiToken);
	const res = await kv.getNS();
	if (res.ok) {
		return true;
	}
	return false;
}
