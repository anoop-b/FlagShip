import { drizzle } from 'drizzle-orm/d1';
import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';

export const load = (async (events) => {
	const db = drizzle(events.platform!.env.DB, { schema });
	// TODO: pagination
	const results = await db.query.flagsTable.findMany({
		with: {
			project: true
		}
	});
	return {
		data: results
	};
}) satisfies PageServerLoad;
