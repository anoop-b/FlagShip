import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db';

export const load = (async (events) => {
	const id = events.params.id;

	const db = getDb(events);
	const results = await db.query.flagsTable.findFirst({
		where: eq(schema.flagsTable.id, +id),
		with: {
			project: true,
			configs: true
		}
	});

	return {
		data: results
	};
}) satisfies PageServerLoad;
