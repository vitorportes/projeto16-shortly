import { Router } from 'express';
import {
  getUserShortenedUrls,
  signIn,
  signUp,
} from '../controllers/userController.js';
import {
  signInValidator,
  signUpValidator,
} from '../middlewares/userValidator.js';

const userRouter = Router();

userRouter.post('/signup', signUpValidator, signUp);
userRouter.post('/signin', signInValidator, signIn);
userRouter.get('/users/me', getUserShortenedUrls);

export default userRouter;
