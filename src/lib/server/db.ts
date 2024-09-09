import type { RequestEvent } from '@sveltejs/kit';
import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from '$lib/drizzle/schema';

let dbInstance: DrizzleD1Database<typeof schema> | null;

export const getDb = (event: RequestEvent) => {
	const dbEnv = event.platform?.env.DB;
	if (!dbEnv) {
		throw new Error('Database connection is not available in the environment.');
	}

	if (!dbInstance) {
		dbInstance = drizzle(dbEnv, { schema });
	}

	return dbInstance;
};
