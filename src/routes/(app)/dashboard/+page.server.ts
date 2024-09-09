import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { count } from 'drizzle-orm';
import { getDb } from '$lib/server/db';

export const load = (async (events) => {
	const db = getDb(events);
	const projects = await db.select({ count: count() }).from(schema.projectsTable);
	const flags = await db.select({ count: count() }).from(schema.flagsTable);

	console.log(projects, flags);
	return {
		data: {
			projects: projects,
			flags: flags
		}
	};
}) satisfies PageServerLoad;
