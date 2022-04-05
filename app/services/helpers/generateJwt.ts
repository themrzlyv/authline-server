import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { iUser } from '@app/services/@types';

interface iGenerateJwtParams {
  user: iUser;
  secret: jwt.Secret;
  expiresIn: string;
}

export const generateJWT = ({ user, secret, expiresIn }: iGenerateJwtParams): string => {
  return jwt.sign({ id: user.id, role: user.role }, String(secret), { expiresIn });
};

export const verifyRefreshToken = (refreshToken: string) => {
  let error: string | null = null;
  let accessToken: string | null = null;
  jwt.verify(
    refreshToken,
    String(process.env.REFRESH_TOKEN_SECRET),
    (err: JsonWebTokenError | any, user: iUser | any) => {
      if (err) {
        error = err.message;
        return error;
      }
      accessToken = generateJWT({
        user,
        secret: process.env.ACCESS_TOKEN_SECRET as string,
        expiresIn: '10m',
      });
      return accessToken;
    },
  );

  return { accessToken, error };
};
