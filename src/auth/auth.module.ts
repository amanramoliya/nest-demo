import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: '60mins',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
