import CarBrand from '@app/controllers/carBrand.controller';
import { accessAdmin } from '@app/middlewares/accessAdmin';
import { accessUser } from '@app/middlewares/accessUser';
import express, { Router } from 'express';

const carBrandRouter: Router = express.Router();

carBrandRouter.get('/', CarBrand.allBrands);
carBrandRouter.get('/:id', CarBrand.singleBrand);
carBrandRouter.post('/create', accessUser, accessAdmin, CarBrand.createBrand);
carBrandRouter.put('/:id', accessUser, accessAdmin, CarBrand.updateBrand);
carBrandRouter.delete('/:id', accessUser, accessAdmin, CarBrand.deleteBrand);

export default carBrandRouter;
