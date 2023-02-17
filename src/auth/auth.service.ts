import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { compareSync, hash } from 'bcrypt';
import { PrismaSerivce } from './../prisma/prisma.service';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaSerivce,
    private jwtService: JwtService,
  ) {}

  async signUpService(authData: AuthDTO) {
    const user = await this.prismaService.user.findFirst({
      where: { email: authData.email },
    });

    if (user) {
      throw new Error('Email Already exists');
    }

    const hashedPassword = await hash(authData.password, 10);

    await this.prismaService.user.create({
      data: {
        email: authData.email,
        password: hashedPassword,
      },
    });

    return {
      email: authData.email,
    };
  }

  async signInService(authData: AuthDTO) {
    const user = await this.prismaService.user.findFirst({
      where: { email: authData.email },
    });

    if (!user) {
      throw new Error('Invalid email');
    }

    if (!compareSync(authData.password, user.password)) {
      throw new Error('Invalid password');
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
