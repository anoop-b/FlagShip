import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db';
import { error } from '@sveltejs/kit';

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
		data: results
	};
}) satisfies PageServerLoad;
