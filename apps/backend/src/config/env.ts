import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform((d) => Number(d)),
  SSL_MODE: z.enum(['require', 'allow', 'prefer', 'verify-full']).optional(),
});

export function envConfig() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    throw new Error(
      `Environment validation failed: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
