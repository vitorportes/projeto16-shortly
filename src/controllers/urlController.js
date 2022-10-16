import { nanoid } from 'nanoid';
import {
  deleteUrlById,
  getLongUrl,
  getUrl,
  getUrlRanking,
  incrementVisitCount,
  insertUrl,
  verifyUrlOwner,
} from '../repositories/urlRepositories.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function postShortUrl(req, res) {
  const token = req.headers.authorization.replace('Bearer ', '');
  const url = req.body.url;
  const shortUrl = nanoid(8);
  const jwtSecret = process.env.JWT_SECRET;
  const userId = jwt.verify(token, jwtSecret).userId;

  try {
    await insertUrl(shortUrl, url, userId);
    res.status(201).json({ shortUrl: shortUrl });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getUrlsById(req, res) {
  const id = req.params.id;

  try {
    const url = await getUrl(id);

    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.status(200).json(url.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function openUrl(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const longUrl = await getLongUrl(shortUrl);

    if (longUrl.rowCount === 0) {
      return res.sendStatus(404);
    }

    await incrementVisitCount(shortUrl);
    res.redirect(longUrl.rows[0].url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const id = req.params.id;
  const token = req.headers.authorization;

  try {
    if (!token) return res.sendStatus(401);

    const userId = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET
    ).userId;

    const verify = await verifyUrlOwner(id, userId);

    if (verify.rowCount === 0) return res.sendStatus(401);

    await deleteUrlById(id);
    res.sendStatus(204);

    console.log(id, userId);
    console.log(token.replace('Bearer ', ''));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const ranking = (await getUrlRanking()).rows;
    res.status(200).send(ranking);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
