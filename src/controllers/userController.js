import { createUser } from '../repositories/userRepositories.js';

export async function signUp(req, res) {
  const user = req.body; // name, email, password, confirmPassword
  try {
    await createUser(user.name, user.email, user.password);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
