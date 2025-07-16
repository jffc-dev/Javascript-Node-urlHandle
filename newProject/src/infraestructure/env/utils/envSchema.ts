import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().min(1),
  PG_URL: z.url(),
});

export type Env = z.infer<typeof envSchema>;
