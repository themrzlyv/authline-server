import Post from 'controllers/post.controller';
import express, { Router } from 'express';
import { accessUser } from 'middlewares/accessUser';

const postRouter:Router = express.Router();

postRouter.get("/", Post.allPosts);
postRouter.get("/:id", Post.singlePost);
postRouter.post("/create", accessUser, Post.createPost);
postRouter.put('/:id', accessUser, Post.updatePost);
postRouter.delete('/:id', accessUser, Post.deletePost);

export default postRouter;