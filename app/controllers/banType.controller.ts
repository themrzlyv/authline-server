import { prisma } from 'config/config';
import { NextFunction, Request, Response } from 'express';
import ApiError from 'middlewares/ApiError';

export default class BanType {
  public static async allBanTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const carBanTypes = await prisma.banTypes.findMany({
        orderBy: [{ banName: 'asc' }],
      });
      res.status(200).json({ length: carBanTypes.length, carBanTypes });
    } catch (error) {
      next(error);
    }
  }

  public static async singleBanType(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const carBanType = await prisma.banTypes.findUnique({
        where: { id: id },
        include: {
          posts: true,
        },
      });
      res.status(200).json(carBanType);
    } catch (error) {
      next(error);
    }
  }

  public static async createBanType(req: Request, res: Response, next: NextFunction) {
    try {
      const { banName } = req.body;
      if (!banName) return next(ApiError.badRequest(400, 'Please fill all inputs!'));
      const existBanType = await prisma.banTypes.findUnique({ where: { banName } });
      if (existBanType) return next(ApiError.badRequest(400, 'This Ban already exists!'));
      await prisma.banTypes.create({
        data: {
          banName,
        },
      });
      res.status(201).json({ message: 'New Ban was created!' });
    } catch (error) {
      next(error);
    }
  }

  public static async updateBanType(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { banName } = req.body;
      if (!banName) return next(ApiError.badRequest(400, 'Please fill all inputs!'));
      const existBanType = await prisma.banTypes.findUnique({ where: { id: id } });
      if (!existBanType) return next(ApiError.badRequest(400, "BanType didn't find!"));
      if (banName === existBanType?.banName)
        return next(ApiError.badRequest(400, 'The name same as older!'));
      await prisma.banTypes.update({
        where: { id: id },
        data: {
          banName,
        },
      });
      res.status(200).json({ message: 'Ban was updated!' });
    } catch (error) {
      next(error);
    }
  }

  public static async deleteBanType(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.banTypes.delete({
        where: { id: id },
      });
      res.status(200).json({ message: 'Selected Ban deleted!' });
    } catch (error) {
      next(error);
    }
  }
}
