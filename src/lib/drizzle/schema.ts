import { sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const flagshipTable = sqliteTable("flagship", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull().default(""),
  kind: text("kind").notNull().default("boolean"),
  value: integer("value", { mode: "boolean" }).default(false),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});
