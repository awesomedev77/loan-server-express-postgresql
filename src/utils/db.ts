import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

console.log(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const checkConnection = async () => {
  const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS public.users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255),
      full_name VARCHAR(255),
      description VARCHAR(255),
      password VARCHAR(255)
  );
  `;
  try {
    // Simple query to check connectivity
    await pool.query('SELECT 1');
    console.log('Database connection has been established successfully.');

    // Check if the 'users' table exists and create if not
    await pool.query(createUsersTableQuery);
    console.log('Checked and ensured that the \'users\' table exists.');
  } catch (error) {
    console.error('Unable to connect to the database or check/create tables:', error);
    throw error;
  }
};



export { pool, checkConnection };