import { prisma } from 'config/config';
import { NextFunction, Response } from 'express';
import { iReqAuth } from 'services/@types';

export const getAllUsers = async (req: iReqAuth, res: Response, next: NextFunction) => {
  try {
    const usersInDb = await prisma.user.findMany({
      select: { id: true, email: true, name: true, posts: true, role: true, createdAt: true },
    });

    const result = usersInDb.filter((item) => item?.id !== req.user?.id);

    return res.status(200).json({ users: result });
  } catch (error) {
    next(error);
  }
};
