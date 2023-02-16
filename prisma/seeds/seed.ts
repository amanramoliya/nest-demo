import { PrismaClient } from '@prisma/client';
import { insertPower } from './power.seed';

async function main() {
  const prismaClient = new PrismaClient();
  try {
    await prismaClient.$connect();

    await insertPower(prismaClient);
  } catch (e) {
    console.log(e);
  }
  await prismaClient.$disconnect();
}

main();
