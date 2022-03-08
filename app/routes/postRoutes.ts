import Post from '@app/controllers/post.controller';
import { accessUser } from '@app/middlewares/accessUser';
import express, { Router } from 'express';

const postRouter:Router = express.Router();

postRouter.get("/", Post.allPosts);
postRouter.get("/:id", Post.singlePost);
postRouter.post("/create", accessUser, Post.createPost);
postRouter.put('/:id', accessUser, Post.updatePost);
postRouter.delete('/:id', accessUser, Post.deletePost);

export default postRouter;