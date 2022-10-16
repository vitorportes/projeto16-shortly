import db from '../config/db.js';

export async function getUser(id) {
  return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
}

export async function getUserByEmail(email) {
  return db.query(`SELECT email FROM users WHERE email = $1`, [email]);
}

export async function getPassword(password) {
  return db.query(`SELECT password FROM users WHERE password = $1`, [password]);
}

export async function getUserId(email) {
  return db.query(`SELECT id FROM users WHERE email = $1`, [email]);
}

export async function getToken(id) {
  return db.query(`SELECT token FROM sessions WHERE "userId" = $1`, id);
}

export async function createUser(name, email, password) {
  return db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, password]
  );
}

export async function login(token, id) {
  return db.query(
    `INSERT INTO sessions (token, "userId", "createdAt") VALUES ($1, $2, NOW())`,
    [token, id]
  );
}

export async function getUserPosts(userId) {
  return db.query(
    `SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1`,
    [userId]
  );
}

export async function getUserName(userId) {
  return db.query(`SELECT name FROM users WHERE id = $1`, [userId]);
}
