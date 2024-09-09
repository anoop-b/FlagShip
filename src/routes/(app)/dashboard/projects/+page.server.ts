import type { PageServerLoad } from './$types';
import * as schema from '$lib/drizzle/schema';
import { redirect } from '@sveltejs/kit';

export const load = (async (events) => {
	const db = getDb(events);
	// TODO: pagination
	const results = await db.query.projectsTable.findMany({
		with: {
			flags: true
		}
	});

	if (results.length == 0) {
		console.log('No projects found, creating new default project');
		await db
			.insert(schema.projectsTable)
			.values({ name: 'Default', description: 'default project' })
			.execute();
		redirect(302, '/dashboard');
	}

	return {
		data: results
	};
}) satisfies PageServerLoad;
