import { relations, sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const flagsTable = sqliteTable("flags", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  kind: text("kind").notNull().default("boolean"),
  description: text("description"),
  value: integer("value", { mode: "boolean" }).default(false),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  deprecated: integer("deprecated", { mode: "boolean" }).default(false),
  archived: integer("archived", { mode: "boolean" }).default(false),
  project_id: integer("project_id", { mode: "number" })
    .references(() => projectsTable.id, {
      onDelete: "no action",
    })
    .notNull()
    .default(1),
});

export const flagsRelations = relations(flagsTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [flagsTable.project_id],
    references: [projectsTable.id],
  }),
}));

export const projectsTable = sqliteTable("projects", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  deprecated: integer("deprecated", { mode: "boolean" }).default(false),
  archived: integer("archived", { mode: "boolean" }).default(false),
});

// one project can have many flags
export const projectsRelations = relations(projectsTable, ({ many }) => ({
  flags: many(flagsTable),
}));
