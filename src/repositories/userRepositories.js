import db from '../config/db.js';

export async function getUser(id) {
  return db.query(`SELECT * FROM users WHERER id = $1`, [id]);
}

export async function getUserByEmail(email) {
  return db.query(`SELECT email FROM users WHERE email = $1`, [email]);
}

export async function createUser(name, email, password) {
  return db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, password]
  );
}
