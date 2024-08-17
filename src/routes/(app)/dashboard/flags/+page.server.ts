import { drizzle } from "drizzle-orm/d1";
import type { PageServerLoad } from "./$types";
import * as schema from "$lib/drizzle/schema";

export const load = (async (events) => {
  const db = drizzle(events.platform!.env.DB, { schema });
  const results = await db.query.flagsTable.findMany();
  if (!results) {
    console.log("No projects found, creating new default project");
    const newFlag = await db
      .insert(schema.flagsTable)
      .values({ name: "Default", description: "default project" })
      .returning();
    return {
      data: newFlag,
    };
  }

  return {
    data: results,
  };
}) satisfies PageServerLoad;
