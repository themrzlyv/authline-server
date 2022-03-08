"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carBrand_controller_1 = __importDefault(require("../controllers/carBrand.controller"));
const accessAdmin_1 = require("../middlewares/accessAdmin");
const accessUser_1 = require("../middlewares/accessUser");
const express_1 = __importDefault(require("express"));
const carBrandRouter = express_1.default.Router();
carBrandRouter.get('/', carBrand_controller_1.default.allBrands);
carBrandRouter.get('/:id', carBrand_controller_1.default.singleBrand);
carBrandRouter.post('/create', accessUser_1.accessUser, accessAdmin_1.accessAdmin, carBrand_controller_1.default.createBrand);
carBrandRouter.put('/:id', accessUser_1.accessUser, accessAdmin_1.accessAdmin, carBrand_controller_1.default.updateBrand);
carBrandRouter.delete('/:id', accessUser_1.accessUser, accessAdmin_1.accessAdmin, carBrand_controller_1.default.deleteBrand);
exports.default = carBrandRouter;
