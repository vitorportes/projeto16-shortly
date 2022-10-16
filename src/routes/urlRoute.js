import { Router } from 'express';
import {
  deleteUrl,
  getUrlsById,
  openUrl,
  postShortUrl,
} from '../controllers/urlController.js';
import { validateUrl } from '../middlewares/urlValidator.js';

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateUrl, postShortUrl);
urlRouter.get('/urls/:id', getUrlsById);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.delete('/urls/:id', deleteUrl);
urlRouter.get('/ranking');

export default urlRouter;
