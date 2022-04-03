import jwt from 'jsonwebtoken';
import { iUser } from '@app/services/@types';

export const createAccessToken = (user: iUser) => {
  return jwt.sign({ id: user.id, role: user.role }, String(process.env.ACCESS_TOKEN_SECRET), {
    expiresIn: '10m',
  });
};

export const createRefreshToken = (user: iUser) => {
  return jwt.sign({ id: user.id, role: user.role }, String(process.env.REFRESH_TOKEN_SECRET), {
    expiresIn: '7d',
  });
};

export const verifyRefreshToken = (refreshToken: string) => {
  let error: string | null = null;
  let accessToken: string | null = null;
  jwt.verify(
    refreshToken,
    String(process.env.REFRESH_TOKEN_SECRET),
    (err: any, user: iUser | any) => {
      if (err) {
        // error = 'Token is invalid or expired!';
        error = err;
        return error;
      }
      accessToken = createAccessToken({ id: user.id });
      return accessToken;
    },
  );

  return { accessToken, error };
};
