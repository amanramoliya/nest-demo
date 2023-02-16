import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtPayload } from './../dto/jwt.payload';

@Injectable()
export class jwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  validate(payload: jwtPayload) {
    return payload;
  }
}
