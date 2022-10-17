import {
  getPassword,
  getUserByEmail,
} from '../repositories/userRepositories.js';
import { signUpSchema, signInSchema } from '../schemas/userSchema.js';
import bcrypt from 'bcrypt';

export async function signUpValidator(req, res, next) {
  const user = req.body;
  const validation = signUpSchema.validate(user);
  const isRepeated = await getUserByEmail(user.email);

  if (validation.error) {
    console.log(validation.error);
    return res.sendStatus(422);
  }

  if (isRepeated.rowCount > 0) {
    return res.sendStatus(409);
  }

  next();
}

export async function signInValidator(req, res, next) {
  const user = req.body;
  const checkEmail = await getUserByEmail(user.email);
  const checkPassword = await getPassword(user.email);
  const validation = signInSchema.validate(user);

  if (checkEmail.rowCount === 0) return res.sendStatus(401);
  const validatePass = bcrypt.compareSync(
    user.password,
    checkPassword.rows[0].password
  );

  if (validation.error) return res.sendStatus(422);

  if (!validatePass) return res.sendStatus(401);

  next();
}
