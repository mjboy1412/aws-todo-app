import { z } from 'zod';

const todoCreateSchema = z
  .object({
    title: z.string(),
    desc: z.string(),
    url: z.string().optional(),
  })
  .strict();

const todoGetSchema = z
  .object({
    id: z.string(),
  })
  .strict();

const todoUpdateSchema = z
  .object({
    title: z.string(),
    desc: z.string(),
    url: z.string().optional(),
  })
  .strict();

const todoDeleteSchema = z
  .object({
    id: z.string(),
  })
  .strict();

export { todoCreateSchema, todoGetSchema, todoUpdateSchema, todoDeleteSchema };
