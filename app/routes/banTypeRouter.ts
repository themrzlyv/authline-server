import BanType from '@app/controllers/banType.controller';
import { accessAdmin } from '@app/middlewares/accessAdmin';
import { accessUser } from '@app/middlewares/accessUser';
import express, { Router } from 'express';

const banTypeRouter: Router = express.Router();

banTypeRouter.get('/', BanType.allBanTypes);
banTypeRouter.get('/:id', BanType.singleBanType);
banTypeRouter.post('/create', accessUser, accessAdmin, BanType.createBanType);
banTypeRouter.put('/:id', accessUser, accessAdmin, BanType.updateBanType);
banTypeRouter.delete('/:id', accessUser, accessAdmin, BanType.deleteBanType);

export default banTypeRouter;
