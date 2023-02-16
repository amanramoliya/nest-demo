import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { validate } from './core/env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { StoreModule } from './store/store.module';
import { userModule } from './user/user.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    PrismaModule,
    userModule,
    AuthModule,
    StoreModule,
    BookmarkModule,
    PokemonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
