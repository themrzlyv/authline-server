import { loginUser, logoutUser, refreshToken, registrationUser } from '@app/controllers/auth.controller';
import { accessUser } from '@app/middlewares/accessUser';
import express, { Router } from 'express';

const authRouter: Router = express.Router();

authRouter.post('/registration', registrationUser);
authRouter.post('/login', loginUser);
authRouter.get('/refreshToken', refreshToken);
authRouter.get('/logout', accessUser, logoutUser);

export default authRouter;
