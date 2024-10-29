import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import { error, fail } from '@sveltejs/kit';

export const load = (async (events) => {
	try {
		const db = getDb(events);
		// TODO: pagination
		const results = await db.query.flagsTable.findMany({
			with: {
				project: true
			}
		});
		if (!results) {
			throw error(404, 'Project Not Found');
		}
		return {
			data: results
		};
	} catch (err) {
		console.log(err);
		fail(500, {
			message: 'Failed to load dashboard'
		});
	}
}) satisfies PageServerLoad;
