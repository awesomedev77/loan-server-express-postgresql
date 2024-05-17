import pool from '../utils/db';

export const findUserByUsername = async (username: string) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

export const findUserById = async (id: number) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const createUser = async (username: string, hash: string) => {
  const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hash]);
  return result.rows[0];
};