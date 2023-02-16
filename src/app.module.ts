import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { StoreModule } from './store/store.module';
import { userModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    userModule,
    AuthModule,
    StoreModule,
    BookmarkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
