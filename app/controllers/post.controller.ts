import { prisma } from '@app/config/config';
import { NextFunction, Request, Response } from 'express';
import ApiError from '@app/middlewares/ApiError';

export default class Post {
  public static async allPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await prisma.post.findMany({
        orderBy: [{ title: 'asc' }],
      });
      res.status(200).json({ length: posts.length, posts });
    } catch (error) {
      next(error);
    }
  }

  public static async singlePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: { id: id },
        include: {
          author: { select: { name: true, number: true, city: true } },
          carBrand: { select: { brandName: true } },
          carModel: { select: { modelName: true } },
          gearBox: { select: { gearBoxName: true } },
          ban: { select: { banName: true } },
        },
      });
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  public static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, userId, carBrandId, carModelId, gearBoxTypesId, banTypesId, images } =
        req.body;
      if (!title || !content || !carBrandId || !carModelId || !gearBoxTypesId || !banTypesId) {
        return next(ApiError.badRequest(400, 'Please fill all inputs!'));
      }
      await prisma.post.create({
        data: {
          title,
          content,
          images: images ?? [],
          userId,
          carBrandId,
          carModelId,
          gearBoxTypesId,
          banTypesId,
        },
      });
      res.status(201).json({ message: 'Post was created!' });
    } catch (error) {
      next(error);
    }
  }

  public static async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, content, carModelId, gearBoxTypesId, banTypesId } = req.body;
      if (!title || !content || !carModelId || !gearBoxTypesId || !banTypesId) {
        return next(ApiError.badRequest(400, 'Please fill all inputs!'));
      }
      await prisma.post.update({
        where: { id: id },
        data: {
          title,
          content,
          carModelId,
          gearBoxTypesId,
          banTypesId,
        },
      });
      res.status(200).json({ message: 'Post was updated!' });
    } catch (error) {
      next(error);
    }
  }

  public static async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.post.delete({
        where: { id: id },
      });
      res.status(200).json({ message: 'Post was deleted!' });
    } catch (error) {
      next(error);
    }
  }
}
