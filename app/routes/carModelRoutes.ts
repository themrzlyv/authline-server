import CarModel from '@app/controllers/carModel.controller';
import { accessAdmin } from '@app/middlewares/accessAdmin';
import { accessUser } from '@app/middlewares/accessUser';
import express, { Router } from 'express';

const carModelRouter: Router = express.Router();

carModelRouter.get('/', CarModel.allModels);
carModelRouter.get('/:id', CarModel.singleModel);
carModelRouter.post('/create', accessUser, accessAdmin, CarModel.createModel);
carModelRouter.put('/:id', accessUser, accessAdmin, CarModel.updateModel);
carModelRouter.delete('/:id', accessUser, accessAdmin, CarModel.deleteModel);

export default carModelRouter;
