import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [userController],
})
export class userModule {}
