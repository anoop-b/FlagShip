import { drizzle } from "drizzle-orm/d1";
import type { PageServerLoad } from "./$types";
import * as schema from "$lib/drizzle/schema";
import { eq } from "drizzle-orm";

export const load = (async (events) => {
  const id = events.params.id;

  const db = drizzle(events.platform?.env.DB!, { schema });
  const results = await db.query.flagsTable.findMany({
    where: eq(schema.flagsTable.id, +id),
  });

  return {
    data: results,
  };
}) satisfies PageServerLoad;
