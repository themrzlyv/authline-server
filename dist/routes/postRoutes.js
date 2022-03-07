"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = __importDefault(require("controllers/post.controller"));
const express_1 = __importDefault(require("express"));
const accessUser_1 = require("middlewares/accessUser");
const postRouter = express_1.default.Router();
postRouter.get("/", post_controller_1.default.allPosts);
postRouter.get("/:id", post_controller_1.default.singlePost);
postRouter.post("/create", accessUser_1.accessUser, post_controller_1.default.createPost);
postRouter.put('/:id', accessUser_1.accessUser, post_controller_1.default.updatePost);
postRouter.delete('/:id', accessUser_1.accessUser, post_controller_1.default.deletePost);
exports.default = postRouter;
