import { getUserByEmail } from '../repositories/userRepositories.js';
import userSchema from '../schemas/userSchema.js';

export async function userValidator(req, res, next) {
  const user = req.body;
  const validation = userSchema.validate(user);
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
