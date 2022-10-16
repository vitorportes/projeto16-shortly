import { Router } from 'express';
import userRouter from './userRoute.js';
import urlRouter from './urlRoute.js';

const router = Router();

router.use(userRouter);
router.use(urlRouter);

export default router;
