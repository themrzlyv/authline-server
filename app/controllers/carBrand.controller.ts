import { prisma } from '@app/config/config';
import { NextFunction, Request, Response } from 'express';
import ApiError from '@app/middlewares/ApiError';

export default class CarBrand {
  public static async allBrands(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, size } = req.query;

      // Pagination
      // take variable for take number of items
      // skip variable for skip number of items
      const take = size ? parseInt(size.toString(), 10) : 10;
      const skip = page ? (parseInt(page.toString(), 10) - 1) * take : 0;

      const carBrands = await prisma.carBrand.findMany({
        orderBy: [{ brandName: 'asc' }],
        take: size ? take : undefined,
        skip: page ? skip : undefined,
      });
      const pages = size ? Math.ceil(await prisma.carBrand.count() / take) : 1;
      res.status(200).json({ total: carBrands.length, pages, carBrands });
    } catch (error) {
      next(error);
    }
  }

  public static async singleBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const carBrand = await prisma.carBrand.findUnique({
        where: { id: id },
        include: {
          models: { include: { post: true } },
        },
      });
      res.status(200).json(carBrand);
    } catch (error) {
      next(error);
    }
  }

  public static async createBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const { brandName, image } = req.body;
      if (!brandName) return next(ApiError.badRequest(400, 'Please fill all inputs!'));
      const existBrand = await prisma.carBrand.findUnique({ where: { brandName } });
      if (existBrand) return next(ApiError.badRequest(400, 'This brand already exists!'));
      await prisma.carBrand.create({
        data: {
          brandName,
          image,
        },
      });
      res.status(201).json({ message: 'New brand was created!' });
    } catch (error) {
      next(error);
    }
  }

  public static async updateBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { brandName } = req.body;
      if (!brandName) return next(ApiError.badRequest(400, 'Please fill all inputs!'));
      const existNamedBrand = await prisma.carBrand.findUnique({ where: { id: id } });
      if (!existNamedBrand) return next(ApiError.badRequest(400, "Brand didn't find!"));
      if (brandName === existNamedBrand?.brandName)
        return next(ApiError.badRequest(400, 'The name same as older!'));
      await prisma.carBrand.update({
        where: { id: id },
        data: {
          brandName,
        },
      });
      res.status(200).json({ message: 'Brand was updated!' });
    } catch (error) {
      next(error);
    }
  }

  public static async deleteBrand(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        await prisma.carBrand.delete({
          where: { id: id },
        });
        res.status(200).json({ message: 'Selected brand deleted!' });
      } catch (error) {
        next(error);
      }
  }
}
