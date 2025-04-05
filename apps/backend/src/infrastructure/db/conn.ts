import postgres from 'postgres';

import { envConfig } from '../../config/env';

const env = envConfig();
const option: postgres.Options<Record<string, postgres.PostgresType>> = {
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: 'user',
  ssl: env.SSL_MODE,
};
export const migrateConnection = () =>
  postgres({
    ...option,
    max: 1,
  });
export const seedConnection = () =>
  postgres({
    ...option,
    database: 'postgres',
    max: 1,
  });
export const qryConnection = () => postgres(option);
