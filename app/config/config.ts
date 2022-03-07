import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const prismaConnect = async (): Promise<void> => {
  return await prisma.$connect();
};
