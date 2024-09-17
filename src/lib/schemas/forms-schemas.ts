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
			environment_id: z.string().min(1),
			value: z.boolean().default(true)
		})
		.array()
});

export type FlagCreateFormSchema = typeof flagCreateFormSchema;

export const projectFormSchema = z.object({
	name: z.string().min(3).max(50),
	description: z.string().min(3).max(50)
});

export type ProjectFormSchema = typeof projectFormSchema;
