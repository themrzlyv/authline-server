"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carModel_controller_1 = __importDefault(require("../controllers/carModel.controller"));
const accessAdmin_1 = require("../middlewares/accessAdmin");
const accessUser_1 = require("../middlewares/accessUser");
const express_1 = __importDefault(require("express"));
const carModelRouter = express_1.default.Router();
carModelRouter.get('/', carModel_controller_1.default.allModels);
carModelRouter.get('/:id', carModel_controller_1.default.singleModel);
carModelRouter.post('/create', accessUser_1.accessUser, accessAdmin_1.accessAdmin, carModel_controller_1.default.createModel);
carModelRouter.put('/:id', accessUser_1.accessUser, accessAdmin_1.accessAdmin, carModel_controller_1.default.updateModel);
carModelRouter.delete('/:id', accessUser_1.accessUser, accessAdmin_1.accessAdmin, carModel_controller_1.default.deleteModel);
exports.default = carModelRouter;
