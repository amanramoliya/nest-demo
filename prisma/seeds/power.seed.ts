import { PrismaClient } from '@prisma/client';

export async function insertPower(prisma: PrismaClient) {
  await prisma.power.createMany({
    data: [
      {
        name: 'fire',
      },
      {
        name: 'water',
      },
      {
        name: 'thunder',
      },
    ],
  });
}
