import { Router } from 'express';
import { signUp } from '../controllers/userController.js';
import { userValidator } from '../middlewares/userValidator.js';

const userRouter = Router();

userRouter.post('/signup', userValidator, signUp);
userRouter.post('/signin');
userRouter.get('/users/me');

export default userRouter;
