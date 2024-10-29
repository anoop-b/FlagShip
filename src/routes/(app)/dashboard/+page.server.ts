import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { count } from 'drizzle-orm';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load = (async (events) => {
	try {
		// TODO: change it to include prepared statements
		const db = getDb(events);
		const projects = await db.select({ count: count() }).from(schema.projectsTable);
		const flags = await db.select({ count: count() }).from(schema.flagsTable);

		return {
			data: {
				projects: projects,
				flags: flags
			}
		};
	} catch (err) {
		console.log(err);
		fail(500, {
			message: 'Failed to load dashboard'
		});
	}
}) satisfies PageServerLoad;
