import { relations, sql } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const flagsTable = sqliteTable('flags', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	kind: text('kind', { enum: ['boolean', 'string', 'number'] })
		.notNull()
		.default('boolean'),
	description: text('description'),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	updatedAt: text('updated_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	deprecated: integer('deprecated', { mode: 'boolean' }).default(false),
	archived: integer('archived', { mode: 'boolean' }).default(false),
	project_id: integer('project_id', { mode: 'number' })
		.references(() => projectsTable.id, {
			onDelete: 'no action'
		})
		.notNull()
		.default(1)
});

export const flagsRelations = relations(flagsTable, ({ one, many }) => ({
	project: one(projectsTable, {
		fields: [flagsTable.project_id],
		references: [projectsTable.id]
	}),
	configs: many(configTable)
}));

export const projectsTable = sqliteTable('projects', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	description: text('description').notNull().default('default description'),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	updatedAt: text('updated_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	deprecated: integer('deprecated', { mode: 'boolean' }).default(false),
	archived: integer('archived', { mode: 'boolean' }).default(false)
});

// one project can have many flags
export const projectsRelations = relations(projectsTable, ({ many }) => ({
	flags: many(flagsTable),
	enviroments: many(environmentsTable)
}));

export const environmentsTable = sqliteTable('environments', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	updatedAt: text('updated_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	project_id: integer('project_id', { mode: 'number' })
		.references(() => projectsTable.id, {
			onDelete: 'cascade'
		})
		.notNull()
});

export const envConfigRelations = relations(environmentsTable, ({ one, many }) => ({
	project: one(projectsTable, {
		fields: [environmentsTable.project_id],
		references: [projectsTable.id]
	}),
	configs: many(configTable)
}));

export const configTable = sqliteTable('config', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	environment_id: integer('environment_id', { mode: 'number' })
		.references(() => environmentsTable.id, {
			onDelete: 'cascade'
		})
		.notNull(),
	flag_id: integer('flag_id', { mode: 'number' })
		.references(() => flagsTable.id, {
			onDelete: 'cascade'
		})
		.notNull(),
	value: text('value').notNull(),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	updatedAt: text('updated_at')
		.notNull()
		.default(sql`(current_timestamp)`)
});

export const configRelations = relations(configTable, ({ one }) => ({
	environment: one(environmentsTable, {
		fields: [configTable.environment_id],
		references: [environmentsTable.id]
	}),
	flags: one(flagsTable, {
		fields: [configTable.flag_id],
		references: [flagsTable.id]
	})
}));
