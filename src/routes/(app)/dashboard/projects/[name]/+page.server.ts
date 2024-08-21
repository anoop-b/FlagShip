import { drizzle } from 'drizzle-orm/d1';
import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { eq } from 'drizzle-orm';

export const load = (async (events) => {
	const name = events.params.name;

	const db = drizzle(events.platform?.env.DB!, { schema });
	const results = await db.query.projectsTable.findFirst({
		where: eq(schema.projectsTable.name, name),
		with: {
			flags: true
		}
	});

	return {
		data: results
	};
}) satisfies PageServerLoad;
