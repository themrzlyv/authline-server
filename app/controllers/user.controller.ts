import { NextFunction, Response } from 'express';
import ApiError from 'middlewares/ApiError';
import { iReqAuth } from 'services/@types';
import { prisma } from 'config/config';
import bcrypt from 'bcrypt';

export const getUser = async (req: iReqAuth, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: iReqAuth, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return next(ApiError.badRequest(403, 'Invalid Authentication.'));
    const { name, email, city, birthday, number, oldPassword, newPassword } = req.body;

    const existedEmail = await prisma.user.findUnique({ where: { email } });
    if (existedEmail) return next(ApiError.badRequest(400, 'This email already registered!'));

    const currentUser = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!currentUser) return next(ApiError.badRequest(403, 'Invalid Authentication.'));

    if (newPassword === oldPassword)
      return next(ApiError.badRequest(400, 'New password can not be same old password!'));
    // control user password
    const isMatch: boolean = await bcrypt.compare(oldPassword, currentUser.password);
    if (!isMatch) return next(ApiError.badRequest(400, 'Old password is not valid!'));

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { name, email, password: hashedPassword, city, birthday, number },
    });

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        city: true,
        number: true,
        birthday: true,
        posts: true,
        role: true,
        createdAt: true,
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
