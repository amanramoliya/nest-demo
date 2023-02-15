import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { compareSync, hash } from 'bcrypt';
import { v4 as randomUUID } from 'uuid';
import { UserStoreRepository } from './../store/user-store/user-store.repository';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userStoreRepository: UserStoreRepository,
    private jwtService: JwtService,
  ) {}

  async signUpService(authData: AuthDTO) {
    const user = this.userStoreRepository.findByEmail(authData.email);

    if (user) {
      throw new Error('Email Already exists');
    }

    const hashedPassword = await hash(authData.password, 10);

    const id = randomUUID();
    this.userStoreRepository.save({
      id: id,
      email: authData.email,
      password: hashedPassword,
    });

    return {
      id: id,
      email: authData.email,
    };
  }

  async signInService(authData: AuthDTO) {
    const user = this.userStoreRepository.findByEmail(authData.email);

    if (!user) {
      throw new Error('Invalid email');
    }

    if (!compareSync(authData.password, user.password)) {
      throw new Error('Invalid password');
    }

    const accessToken = this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return accessToken;
  }
}
