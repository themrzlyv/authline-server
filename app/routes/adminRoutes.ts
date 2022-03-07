import { getAllUsers } from 'controllers/admin.controller';
import express, { Router } from 'express';
import { accessAdmin } from 'middlewares/accessAdmin';
import { accessUser } from 'middlewares/accessUser';

const adminRouter: Router = express.Router();

adminRouter.use([accessUser,accessAdmin]);

adminRouter.get('/users', getAllUsers);
adminRouter.put('/', );

export default adminRouter;