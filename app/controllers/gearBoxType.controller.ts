import { prisma } from 'config/config';
import { NextFunction, Request, Response } from 'express';
import ApiError from 'middlewares/ApiError';

export default class GearBoxType {
  public static async allGearBoxTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const gearBoxTypes = await prisma.gearBoxTypes.findMany({
        orderBy: [{ gearBoxName: 'asc' }],
      });
      res.status(200).json({ length: gearBoxTypes.length, gearBoxTypes });
    } catch (error) {
      next(error);
    }
  }

  public static async singleGearBoxType(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const gearBoxType = await prisma.gearBoxTypes.findUnique({
        where: { id: id },
        include: {
          posts: true,
        },
      });
      res.status(200).json(gearBoxType);
    } catch (error) {
      next(error);
    }
  }

  public static async createGearBoxType(req: Request, res: Response, next: NextFunction) {
    try {
      const { gearBoxName } = req.body;
      if (!gearBoxName) return next(ApiError.badRequest(400, 'Please fill all inputs!'));
      const existGearBoxType = await prisma.gearBoxTypes.findUnique({ where: { gearBoxName } });
      if (existGearBoxType) return next(ApiError.badRequest(400, 'This GearBox already exists!'));
      await prisma.gearBoxTypes.create({
        data: {
          gearBoxName,
        },
      });
      res.status(201).json({ message: 'New GearBox was created!' });
    } catch (error) {
      next(error);
    }
  }

  public static async updateGearBoxType(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { gearBoxName } = req.body;
      if (!gearBoxName) return next(ApiError.badRequest(400, 'Please fill all inputs!'));
      const existGearBoxType = await prisma.gearBoxTypes.findUnique({ where: { id: id } });
      if (!existGearBoxType) return next(ApiError.badRequest(400, "GearBoxType didn't find!"));
      if (gearBoxName === existGearBoxType?.gearBoxName)
        return next(ApiError.badRequest(400, 'The name same as older!'));
      await prisma.gearBoxTypes.update({
        where: { id: id },
        data: {
          gearBoxName,
        },
      });
      res.status(200).json({ message: 'GearBox was updated!' });
    } catch (error) {
      next(error);
    }
  }

  public static async deleteGearBoxType(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.gearBoxTypes.delete({
        where: { id: id },
      });
      res.status(200).json({ message: 'Selected GearBox deleted!' });
    } catch (error) {
      next(error);
    }
  }
}
