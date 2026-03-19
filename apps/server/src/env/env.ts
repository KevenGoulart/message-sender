/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).optional().default('dev'),
  DATABASE_URL: z.coerce
    .string()
    .optional()
    .default('postgresql://postgres:postgres@localhost:5432/message_sender'),
});

export type Env = z.infer<typeof envSchema>;
