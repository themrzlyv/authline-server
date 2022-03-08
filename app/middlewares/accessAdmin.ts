import { Response, NextFunction } from 'express';
import ApiError from '@app/middlewares/ApiError';
import { iReqAuth } from '@app/services/@types';

export const accessAdmin = async (req: iReqAuth, res: Response, next: NextFunction) => {
  try {
    // Is Token Included
    if (req.user?.role !== 'Admin')
      return next(ApiError.badRequest(403, 'Only admins can access this route!'));

    next();
  } catch (error) {
    next(error);
  }
};
