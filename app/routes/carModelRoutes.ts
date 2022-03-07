import CarModel from 'controllers/carModel.controller';
import express, { Router } from 'express';
import { accessAdmin } from 'middlewares/accessAdmin';
import { accessUser } from 'middlewares/accessUser';

const carModelRouter: Router = express.Router();

carModelRouter.get('/', CarModel.allModels);
carModelRouter.get('/:id', CarModel.singleModel);
carModelRouter.post('/create', accessUser, accessAdmin, CarModel.createModel);
carModelRouter.put('/:id', accessUser, accessAdmin, CarModel.updateModel);
carModelRouter.delete('/:id', accessUser, accessAdmin, CarModel.deleteModel);

export default carModelRouter;
