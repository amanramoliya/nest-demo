import { Global, Module } from '@nestjs/common';
import { PrismaSerivce } from './prisma.service';

@Global()
@Module({
  providers: [PrismaSerivce],
  exports: [PrismaSerivce],
})
export class PrismaModule {}
