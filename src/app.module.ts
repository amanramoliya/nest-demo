import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { userModule } from './user/user.module';

@Module({
  imports: [userModule, AuthModule, StoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
