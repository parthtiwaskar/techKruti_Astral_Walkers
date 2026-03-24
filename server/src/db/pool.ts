import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If using a local DB with standard creds:
  // user: process.env.DB_USER || 'postgres',
  // host: process.env.DB_HOST || 'localhost',
  // database: process.env.DB_NAME || 'placebridge',
  // password: process.env.DB_PASSWORD || 'postgres',
  // port: parseInt(process.env.DB_PORT || '5432'),
});

export default pool;
