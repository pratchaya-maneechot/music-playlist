import { databaseName, seedConnection } from '../conn';

async function run() {
  try {
    const sql = seedConnection();

    const exists =
      await sql`SELECT 1 FROM pg_database WHERE datname = ${databaseName}`;

    if (exists.length > 0) {
      console.log(`Database "${databaseName}" already exists.`);
    } else {
      await sql`CREATE DATABASE ${sql(databaseName)}`;
      console.log(`Database "${databaseName}" created successfully.`);
    }

    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Error creating database:', error);
    process.exit(1);
  }
}

run();
