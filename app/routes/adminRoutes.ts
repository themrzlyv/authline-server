import { getAllUsers } from '@app/controllers/admin.controller';
import { accessAdmin } from '@app/middlewares/accessAdmin';
import { accessUser } from '@app/middlewares/accessUser';
import express, { Router } from 'express';

const adminRouter: Router = express.Router();

adminRouter.use([accessUser,accessAdmin]);

adminRouter.get('/users', getAllUsers);
adminRouter.put('/', );

export default adminRouter;