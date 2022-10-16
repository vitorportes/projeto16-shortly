import { urlSchema } from '../schemas/urlSchema.js';

export async function validateUrl(req, res, next) {
  const url = req.body;
  const header = req.headers.authorization;
  const validation = urlSchema.validate(url);

  if (!header) {
    return res.sendStatus(401);
  }

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}
