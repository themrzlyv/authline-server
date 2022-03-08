import GearBoxType from '@app/controllers/gearBoxType.controller';
import { accessAdmin } from '@app/middlewares/accessAdmin';
import { accessUser } from '@app/middlewares/accessUser';
import express, { Router } from 'express';

const gearBoxTypeRouter: Router = express.Router();

gearBoxTypeRouter.get('/', GearBoxType.allGearBoxTypes);
gearBoxTypeRouter.get('/:id', GearBoxType.singleGearBoxType);
gearBoxTypeRouter.post('/create', accessUser, accessAdmin, GearBoxType.createGearBoxType);
gearBoxTypeRouter.put('/:id', accessUser, accessAdmin, GearBoxType.updateGearBoxType);
gearBoxTypeRouter.delete('/:id', accessUser, accessAdmin, GearBoxType.deleteGearBoxType);

export default gearBoxTypeRouter;
