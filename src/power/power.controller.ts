import { Controller, Get } from '@nestjs/common';
import { Power } from '@prisma/client';
import { PowerService } from './power.service';

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}
  @Get()
  getAllPower(): Promise<Power[]> {
    return this.powerService.findAllPower();
  }
}
