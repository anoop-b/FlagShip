import { z } from 'zod';

export const projectEditFormSchema = z.object({
	name: z.string().min(3).max(50),
	description: z.string().min(3).max(50).optional()
});

export type ProjectEditFormSchema = typeof projectEditFormSchema;
