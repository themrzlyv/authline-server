import jwt from 'jsonwebtoken';
import { iUser } from '@app/services/@types';

export const createAccessToken = (user: iUser) => {
  return jwt.sign({ id: user.id, role: user.role }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: '10m',
  });
};

export const createRefreshToken = (user: iUser) => {
  return jwt.sign({ id: user.id, role: user.role }, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: '7d',
  });
};

export const verifyRefreshToken = (refreshToken: any) => {
  return jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`, (error: any, user: iUser | any) => {
    if (error) return 'Please login or register!';
    const accesstoken = createAccessToken({ id: user.id });
    return accesstoken;
  });
};