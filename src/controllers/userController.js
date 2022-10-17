import {
  createUser,
  getToken,
  getUser,
  getUserId,
  getUserName,
  getUserPosts,
  login,
} from '../repositories/userRepositories.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt, { hashSync } from 'bcrypt';
import { getUserTotalVisits } from '../repositories/urlRepositories.js';
dotenv.config();

export async function signUp(req, res) {
  const user = req.body; // name, email, password, confirmPassword
  const password = bcrypt.hashSync(user.password, 10);

  try {
    await createUser(user.name, user.email, password);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const user = req.body;
  const userId = await getUserId(user.email);
  const id = userId.rows[0].id;
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET);

  try {
    await login(token, id);
    res.send({ token: token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getUserShortenedUrls(req, res) {
  const token = req.headers.authorization;

  try {
    if (!token) return res.sendStatus(401);

    const validateToken = await getToken(token.replace('Bearer ', ''));
    if (validateToken.rowCount === 0) return res.sendStatus(401);

    const userId = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET
    ).userId;

    const isValid = await getUser(userId);

    if (isValid.rowCount === 0) return res.sendStatus(404);

    const posts = (await getUserPosts(userId)).rows;
    const name = (await getUserName(userId)).rows[0].name;
    const visitCount = (await getUserTotalVisits(userId)).rows[0].sum;
    const data = formatUserData(userId, name, visitCount, posts);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

function formatUserData(userId, name, visitCount, posts) {
  return {
    id: userId,
    name: name,
    visitCount: visitCount,
    shortenedUrls: posts,
  };
}
