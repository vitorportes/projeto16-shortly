import db from '../config/db.js';

export async function insertUrl(url, shortUrl, userId) {
  return db.query(
    `
    INSERT INTO urls
        ("shortUrl",
          url,
        "userId")
    VALUES ($1, $2, $3)
    `,
    [url, shortUrl, userId]
  );
}

export async function getUrl(id) {
  return db.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id]);
}

export async function getLongUrl(shortUrl) {
  return db.query(`SELECT url FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
}

export async function incrementVisitCount(shortUrl) {
  return db.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`,
    [shortUrl]
  );
}

export async function verifyUrlOwner(id, userId) {
  return db.query(`SELECT * FROM urls WHERE id = $1 AND "userId" = $2`, [
    id,
    userId,
  ]);
}

export async function deleteUrlById(id) {
  return db.query(`DELETE FROM urls WHERE id = $1`, [id]);
}

export async function getUserTotalVisits(userId) {
  return db.query(`SELECT SUM("visitCount") FROM urls WHERE "userId" = $1`, [
    userId,
  ]);
}

export async function getUrlRanking() {
  return db.query(`
  SELECT 
    users.id, 
    users.name, 
    COUNT(urls.*) AS "linksCount",
    COALESCE(SUM(urls."visitCount"), 0) as "visitsCount"
  FROM users
    LEFT JOIN urls ON users.id = urls."userId"
    GROUP BY users.id
    ORDER BY "visitsCount" DESC
    LIMIT 10`);
}
