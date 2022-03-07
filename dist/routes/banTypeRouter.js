"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banType_controller_1 = __importDefault(require("controllers/banType.controller"));
const express_1 = __importDefault(require("express"));
const accessAdmin_1 = require("middlewares/accessAdmin");
const accessUser_1 = require("middlewares/accessUser");
const banTypeRouter = express_1.default.Router();
banTypeRouter.get('/', banType_controller_1.default.allBanTypes);
banTypeRouter.get('/:id', banType_controller_1.default.singleBanType);
banTypeRouter.post('/create', accessUser_1.accessUser, accessAdmin_1.accessAdmin, banType_controller_1.default.createBanType);
banTypeRouter.put('/:id', accessUser_1.accessUser, accessAdmin_1.accessAdmin, banType_controller_1.default.updateBanType);
banTypeRouter.delete('/:id', accessUser_1.accessUser, accessAdmin_1.accessAdmin, banType_controller_1.default.deleteBanType);
exports.default = banTypeRouter;
