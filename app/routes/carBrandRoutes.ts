import CarBrand from 'controllers/carBrand.controller';
import express, { Router } from 'express';
import { accessAdmin } from 'middlewares/accessAdmin';
import { accessUser } from 'middlewares/accessUser';

const carBrandRouter: Router = express.Router();

carBrandRouter.get('/', CarBrand.allBrands);
carBrandRouter.get('/:id', CarBrand.singleBrand);
carBrandRouter.post('/create', accessUser, accessAdmin, CarBrand.createBrand);
carBrandRouter.put('/:id', accessUser, accessAdmin, CarBrand.updateBrand);
carBrandRouter.delete('/:id', accessUser, accessAdmin, CarBrand.deleteBrand);

export default carBrandRouter;
