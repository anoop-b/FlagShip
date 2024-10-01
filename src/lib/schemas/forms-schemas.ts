import { z } from 'zod';

export const enviromentCreateFormSchema = z.object({
	name: z.string().min(3).max(50),
	description: z.string().min(3).max(50)
});

export type EnviromentCreateFormSchema = typeof enviromentCreateFormSchema;

export const flagCreateFormSchema = z.object({
	name: z.string().min(3).max(50),
	kind: z.enum(['boolean', 'string', 'number']),
	description: z.string().min(3).max(50),
	configs: z
		.object({
			environment_id: z.number().min(1),
			value: z.boolean().default(true)
		})
		.array()
		.min(1)
});

export type FlagCreateFormSchema = typeof flagCreateFormSchema;

export const projectFormSchema = z.object({
	name: z.string().min(3).max(50),
	description: z.string().min(3).max(50)
});

export type ProjectFormSchema = typeof projectFormSchema;

export const storesFormSchema = z.object({
	cfAccountId: z.string().length(32),
	cfApiToken: z.string().length(40),
	cfKvNamespaceId: z.string().length(32)
});

export type StoresFormSchema = typeof storesFormSchema;

export const configFormSchema = z.object({
	id: z.number().optional(),
	environment_id: z.number().min(1),
	value: z.boolean().default(true)
});

export type ConfigFormSchema = typeof configFormSchema;
