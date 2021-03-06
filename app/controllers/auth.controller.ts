import { prisma } from '@app/config/config';
import ApiError from '@app/middlewares/ApiError';
import { iReqAuth, iUser } from '@app/services/@types';
import { generateJWT, verifyRefreshToken } from '@app/services/helpers/generateJwt';
import { loginValidator, regValidator } from '@app/services/helpers/validator';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

export const registrationUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, city, number, birthday, photo } = req.body;

    // validation request's data
    const error = regValidator({ ...req.body });
    if (error) return next(ApiError.badRequest(400, error));

    // chekc user if exists
    const existUser = await prisma.user.findUnique({ where: { email } });
    if (existUser) return next(ApiError.badRequest(400, 'This email is already registered!'));

    // hashing password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        city,
        number,
        birthday,
        photo:
          photo ??
          'https://res.cloudinary.com/themrzlyv/image/upload/v1648555054/Authline-media/default_user.png',
      },
    });

    // find user's id , generate token and send
    const user: iUser | null = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        city: true,
        number: true,
        birthday: true,
        photo: true,
        posts: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) return next(ApiError.badRequest(400, 'Something went wrong!'));

    const accessToken = generateJWT({
      user,
      secret: process.env.ACCESS_TOKEN_SECRET as string,
      expiresIn: '10m',
    });

    const refreshToken = generateJWT({
      user,
      secret: process.env.REFRESH_TOKEN_SECRET as string,
      expiresIn: '7d',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      domain: process.env.NODE_ENV === 'development' ? 'localhost' : '*.herokuapp.com',
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    return res.status(201).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) return next(ApiError.badRequest(401, 'Please login or register!'));

    const { accessToken, error } = verifyRefreshToken(String(refreshToken));
    if (error) return next(ApiError.badRequest(401, error));

    return res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // validation request's data
    const error = loginValidator({ ...req.body });
    if (error) return next(ApiError.badRequest(400, error));

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        posts: true,
      },
    });
    if (!user) return next(ApiError.badRequest(400, "This user doesn't exists"));

    // control user password
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(ApiError.badRequest(400, 'Password is not valid'));

    const accessToken = generateJWT({
      user,
      secret: process.env.ACCESS_TOKEN_SECRET as string,
      expiresIn: '10m',
    });

    const refreshToken = generateJWT({
      user,
      secret: process.env.REFRESH_TOKEN_SECRET as string,
      expiresIn: '7d',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
      maxAge: 7 * 24 * 60 * 60 * 10000, // 7d
      // domain: process.env.NODE_ENV === 'development' ? 'localhost' : '*.herokuapp.com',
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    res.status(200).json({
      accessToken,
      user: {
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
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req: iReqAuth, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return next(ApiError.badRequest(403, 'Invalid Authentication.'));
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Logged out!' });
  } catch (error) {
    next(error);
  }
};
