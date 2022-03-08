import express, { Router } from 'express';
import authRouter from './authRoutes';

import banTypeRouter from './banTypeRouter';
import carBrandRouter from './carBrandRoutes';
import carModelRouter from './carModelRoutes';
import gearBoxTypeRouter from './gearBoxTypeRoutes';
import postRouter from './postRoutes';
import userRouter from './userRoutes';

const mainRoutes: Router = express.Router();

mainRoutes.use("/auth", authRouter);
mainRoutes.use("/user", userRouter);
mainRoutes.use("/carBrand", carBrandRouter);
mainRoutes.use('/carModel', carModelRouter);
mainRoutes.use('/banType', banTypeRouter);
mainRoutes.use('/gearBoxType', gearBoxTypeRouter);
mainRoutes.use("/post", postRouter);
// mainRoutes.use("/admin", adminRouter);

export default mainRoutes;