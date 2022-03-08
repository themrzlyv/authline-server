"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const accessUser_1 = require("../middlewares/accessUser");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.use([accessUser_1.accessUser]);
userRouter.get('/', user_controller_1.getUser);
userRouter.put('/', user_controller_1.updateUser);
exports.default = userRouter;
