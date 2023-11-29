import { Router } from 'express';
import { getUser } from './user-controller';

const userRouter = Router();

userRouter.get('/', getUser);

export default userRouter;
