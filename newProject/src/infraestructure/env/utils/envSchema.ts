import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().min(1),
  PG_URL: z.url(),
  DEFAULT_PAGE_SIZE: z.coerce.number(),
});

export type Env = z.infer<typeof envSchema>;
