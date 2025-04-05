import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { migrateConnection } from './conn';

async function run() {
  await migrate(drizzle(migrateConnection()), {
    migrationsFolder: './migrations',
  });
  await migrateConnection().end();
}

run()
  .then(() => console.log('DB Migrate completed'))
  .catch(console.error);
