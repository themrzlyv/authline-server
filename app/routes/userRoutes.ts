import { getUser, updateUser } from '@app/controllers/user.controller';
import { accessUser } from '@app/middlewares/accessUser';
import express, { Router } from 'express';

const userRouter: Router = express.Router();

userRouter.use([accessUser]);

userRouter.get('/', getUser);
userRouter.put('/', updateUser);

export default userRouter;
