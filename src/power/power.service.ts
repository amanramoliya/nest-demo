import { Injectable } from '@nestjs/common';
import { Power } from '@prisma/client';
import { PrismaSerivce } from './../prisma/prisma.service';

@Injectable()
export class PowerService {
  constructor(private readonly prismaService: PrismaSerivce) {}
  findAllPower(): Promise<Power[]> {
    return this.prismaService.power.findMany();
  }
}
