import { pool } from '../utils/db';

export const findUserByUsername = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const findUserById = async (id: number) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const createUser = async (email: string, full_name: string, description: string, hash: string) => {
  const result = await pool.query('INSERT INTO users (email, full_name, description, password) VALUES ($1, $2, $3, $4) RETURNING *', [email, full_name, description, hash]);
  return result.rows[0];
};