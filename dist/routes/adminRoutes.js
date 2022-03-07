"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("controllers/admin.controller");
const express_1 = __importDefault(require("express"));
const accessAdmin_1 = require("middlewares/accessAdmin");
const accessUser_1 = require("middlewares/accessUser");
const adminRouter = express_1.default.Router();
adminRouter.use([accessUser_1.accessUser, accessAdmin_1.accessAdmin]);
adminRouter.get('/users', admin_controller_1.getAllUsers);
adminRouter.put('/');
exports.default = adminRouter;
