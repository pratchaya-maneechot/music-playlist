import { defineConfig } from 'drizzle-kit';
import { envConfig } from '../../config/env';
import { databaseName } from './conn';

const env = envConfig();

export default defineConfig({
  dialect: 'postgresql',
  out: './src/infrastructure/db/migrations',
  schema: './src/domain/drizzle-tables.ts',
  dbCredentials: {
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: databaseName,
    ssl: env.SSL_MODE,
  },
  verbose: true,
  strict: true,
});
