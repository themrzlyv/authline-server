import { getUser, updateUser } from 'controllers/user.controller';
import express, { Router } from 'express';
import { accessUser } from 'middlewares/accessUser';

const userRouter: Router = express.Router();

userRouter.use([accessUser]);

userRouter.get('/', getUser);
userRouter.put('/', updateUser);

export default userRouter;
