import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUpUser(@Body() authData: AuthDTO) {
    return this.authService.signUpService(authData);
  }

  @Post('/signin')
  signinUser(@Body() authData: AuthDTO) {
    return this.authService.signInService(authData);
  }
}
