import config from './config';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: config.databaseUrl,
  max: config.maxPoolSize,
});

// see https://node-postgres.com/guides/project-structure for details
// TODO - surface query errors
export const query = async ({
  text,
  params,
}: {
  text: string;
  params?: any[];
}) => {
  if (params) {
    return await pool.query(text, params);
  }
  return await pool.query(text);
};
