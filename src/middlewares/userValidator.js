import {
  getPassword,
  getUserByEmail,
} from '../repositories/userRepositories.js';
import { signUpSchema, signInSchema } from '../schemas/userSchema.js';

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
  const checkPassword = await getPassword(user.password);
  const validation = signInSchema.validate(user);

  if (validation.error) {
    return res.sendStatus(422);
  }

  if (checkEmail.rowCount === 0 || checkPassword.rowCount === 0) {
    return res.sendStatus(401);
  }

  next();
}
