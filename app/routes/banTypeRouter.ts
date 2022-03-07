import BanType from 'controllers/banType.controller';
import express, { Router } from 'express';
import { accessAdmin } from 'middlewares/accessAdmin';
import { accessUser } from 'middlewares/accessUser';

const banTypeRouter: Router = express.Router();

banTypeRouter.get('/', BanType.allBanTypes);
banTypeRouter.get('/:id', BanType.singleBanType);
banTypeRouter.post('/create', accessUser, accessAdmin, BanType.createBanType);
banTypeRouter.put('/:id', accessUser, accessAdmin, BanType.updateBanType);
banTypeRouter.delete('/:id', accessUser, accessAdmin, BanType.deleteBanType);

export default banTypeRouter;
