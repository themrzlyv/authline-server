import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { prismaConnect } from './config/config';
import mainRoutes from './routes/mainRoutes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

// prisma connection
prismaConnect()
  .then(() => console.log('Prisma connection is successful'))
  .catch((error) => console.log(error));

const startServer = async (): Promise<void> => {
  const app: Application = express();

  // middlewares
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000', 'https://authline.herokuapp.com'],
    }),
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // app.set('trust proxy', 2);

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan logger is activated');
  }

  // routes
  app.use('/v1', mainRoutes);

  // global error handler
  app.use(errorHandler);

  const port: number = Number(process.env.PORT) || 4000;

  app.listen(port, () => console.log(`Server is running on ${port}`));
};

startServer().catch((err) => console.log(err));
