import { drizzle } from 'drizzle-orm/d1';
import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { count } from 'drizzle-orm';

export const load = (async (events) => {
	const db = drizzle(events.platform!.env.DB, { schema });
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
