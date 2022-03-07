"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gearBoxType_controller_1 = __importDefault(require("controllers/gearBoxType.controller"));
const express_1 = __importDefault(require("express"));
const accessAdmin_1 = require("middlewares/accessAdmin");
const accessUser_1 = require("middlewares/accessUser");
const gearBoxTypeRouter = express_1.default.Router();
gearBoxTypeRouter.get('/', gearBoxType_controller_1.default.allGearBoxTypes);
gearBoxTypeRouter.get('/:id', gearBoxType_controller_1.default.singleGearBoxType);
gearBoxTypeRouter.post('/create', accessUser_1.accessUser, accessAdmin_1.accessAdmin, gearBoxType_controller_1.default.createGearBoxType);
gearBoxTypeRouter.put('/:id', accessUser_1.accessUser, accessAdmin_1.accessAdmin, gearBoxType_controller_1.default.updateGearBoxType);
gearBoxTypeRouter.delete('/:id', accessUser_1.accessUser, accessAdmin_1.accessAdmin, gearBoxType_controller_1.default.deleteGearBoxType);
exports.default = gearBoxTypeRouter;
