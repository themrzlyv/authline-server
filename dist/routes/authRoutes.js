"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("controllers/auth.controller");
const express_1 = __importDefault(require("express"));
const accessUser_1 = require("middlewares/accessUser");
const authRouter = express_1.default.Router();
authRouter.post('/registration', auth_controller_1.registrationUser);
authRouter.post('/login', auth_controller_1.loginUser);
authRouter.get('/logout', accessUser_1.accessUser, auth_controller_1.logoutUser);
exports.default = authRouter;
