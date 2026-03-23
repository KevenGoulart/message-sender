import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).optional().default('dev'),
  DATABASE_URL: z.coerce
    .string()
    .optional()
    .default('postgresql://postgres:postgres@localhost:5432/message_sender'),
  JWT_SECRET: z.string(),
  RESEND_API_KEY: z.string().optional(),
  REDIS_HOST: z.string().default('localhost'),
});

export type Env = z.infer<typeof envSchema>;
