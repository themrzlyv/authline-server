import { prisma } from '@app/config/config';
import { NextFunction, Request, Response } from 'express';
import ApiError from '@app/middlewares/ApiError';

export default class CarModel {
  public static async allModels(req: Request, res: Response, next: NextFunction) {
    try {
      const carModels = await prisma.carModel.findMany({
        orderBy: [{ modelName: 'asc' }],
      });
      res.status(200).json({ length: carModels.length, carModels });
    } catch (error) {
      next(error);
    }
  }

  public static async singleModel(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const carModel = await prisma.carModel.findUnique({
        where: { id: id },
        include: {
          post: true,
        },
      });
      res.status(200).json(carModel);
    } catch (error) {
      next(error);
    }
  }

  public static async createModel(req: Request, res: Response, next: NextFunction) {
    try {
      const { modelName, carBrandId } = req.body;
      if (!modelName || !carBrandId)
        return next(ApiError.badRequest(400, 'Please fill all inputs!'));
      const existModel = await prisma.carModel.findUnique({ where: { modelName } });
      if (existModel) return next(ApiError.badRequest(400, 'This category already exists!'));
      await prisma.carModel.create({
        data: {
          modelName,
          carBrandId,
        },
      });
      res.status(201).json({ message: 'New Model was created!' });
    } catch (error) {
      next(error);
    }
  }

  public static async updateModel(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { modelName } = req.body;
      if (!modelName) return next(ApiError.badRequest(400, 'Please fill all inputs!'));
      const existNameModel = await prisma.carModel.findUnique({ where: { id: id } });
      if (!existNameModel) return next(ApiError.badRequest(400, "Model didn't find!"));
      if (modelName === existNameModel?.modelName)
        return next(ApiError.badRequest(400, 'The name same as older!'));
      await prisma.carModel.update({
        where: { id: id },
        data: {
          modelName,
        },
      });
      res.status(200).json({ message: 'Model was updated!' });
    } catch (error) {
      next(error);
    }
  }

  public static async deleteModel(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.carModel.delete({
        where: { id: id },
      });
      res.status(200).json({ message: 'Selected Model deleted!' });
    } catch (error) {
      next(error);
    }
  }
}
