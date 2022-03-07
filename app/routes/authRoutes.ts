import { loginUser, registrationUser, logoutUser } from 'controllers/auth.controller';
import express, { Router } from 'express';
import { accessUser } from 'middlewares/accessUser';

const authRouter: Router = express.Router();

authRouter.post('/registration', registrationUser);
authRouter.post('/login', loginUser);
authRouter.get('/logout', accessUser, logoutUser);

export default authRouter;
