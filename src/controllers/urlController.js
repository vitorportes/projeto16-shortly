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
import { getToken } from '../repositories/userRepositories.js';
dotenv.config();

export async function postShortUrl(req, res) {
  const token = req.headers.authorization.replace('Bearer ', '');
  const url = req.body.url;
  const shortUrl = nanoid(8);
  const jwtSecret = process.env.JWT_SECRET;

  try {
    const validateToken = await getToken(token);
    if (validateToken.rowCount === 0) return res.sendStatus(401);

    const userId = jwt.verify(token, jwtSecret).userId;

    await insertUrl(shortUrl, url, userId);
    return res.status(201).json({ shortUrl: shortUrl });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUrlsById(req, res) {
  const id = req.params.id;

  try {
    const url = await getUrl(id);

    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).json(url.rows[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
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
    return res.redirect(longUrl.rows[0].url);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
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

    const validateUrl = await getUrl(id);

    if (validateUrl.rowCount === 0) return res.sendStatus(404);

    const verify = await verifyUrlOwner(id, userId);

    if (verify.rowCount === 0) return res.sendStatus(401);

    await deleteUrlById(id);
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const ranking = (await getUrlRanking()).rows;
    return res.status(200).send(ranking);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
