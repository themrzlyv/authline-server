import GearBoxType from 'controllers/gearBoxType.controller';
import express, { Router } from 'express';
import { accessAdmin } from 'middlewares/accessAdmin';
import { accessUser } from 'middlewares/accessUser';

const gearBoxTypeRouter: Router = express.Router();

gearBoxTypeRouter.get('/', GearBoxType.allGearBoxTypes);
gearBoxTypeRouter.get('/:id', GearBoxType.singleGearBoxType);
gearBoxTypeRouter.post('/create', accessUser, accessAdmin, GearBoxType.createGearBoxType);
gearBoxTypeRouter.put('/:id', accessUser, accessAdmin, GearBoxType.updateGearBoxType);
gearBoxTypeRouter.delete('/:id', accessUser, accessAdmin, GearBoxType.deleteGearBoxType);

export default gearBoxTypeRouter;
