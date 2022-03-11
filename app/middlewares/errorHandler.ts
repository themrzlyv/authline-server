import ApiError from './ApiError';
import { Request, Response, NextFunction } from 'express';

const errorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.code).send({ error: error.message });
  }

  return res.status(500).send({ error: 'Internal server error!' });
};

export default errorHandler;
