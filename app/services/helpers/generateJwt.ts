import jwt from 'jsonwebtoken';
import { iUser } from 'services/@types';

export const generateJwt = (user: iUser) => {
  return jwt.sign({ id: user.id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '30d' });
};
