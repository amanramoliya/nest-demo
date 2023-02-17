import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { jwtPayload } from './../auth/dto/jwt.payload';

export const UserDecorator = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): jwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
