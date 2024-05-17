import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

console.log(process.env.DATABASE_URL); 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const checkConnection = async () => {
  try {
    await pool.query('SELECT 1'); // Simple query to check connectivity
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export { pool, checkConnection };