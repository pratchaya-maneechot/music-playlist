import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../../domain/drizzle-tables';
import { qryConnection } from './conn';

export const dbClient = drizzle(qryConnection(), { schema });
