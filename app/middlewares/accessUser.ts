import { Request, Response, NextFunction } from 'express';
import ApiError from '@app/middlewares/ApiError';
import jwt from 'jsonwebtoken';
import { IDecodedToken, iReqAuth } from '@app/services/@types';
import { prisma } from '@app/config/config';

export const accessUser = async (req: iReqAuth, res: Response, next: NextFunction) => {
  try {
    // Is Token Included
    if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer:'))) {
      return next(ApiError.badRequest(403, 'You are not authorized to access this page'));
    }

    // Get Token From Header
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) return next(ApiError.badRequest(403, 'Invalid Authentication.'));

    const decoded = <IDecodedToken>jwt.verify(accessToken, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decoded) return next(ApiError.badRequest(403, 'Invalid Authentication.'));

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { posts: true },
    });
    if (!user) return next(ApiError.badRequest(403, 'User does not exist!'));

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      city: user.city,
      number: user.number,
      birthday: user.birthday,
      photo: user.photo,
      posts: user.posts,
      role: user.role,
      createdAt: user.createdAt,
    };

    next();
  } catch (error) {
    next(error);
  }
};
