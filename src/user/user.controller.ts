import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/jwt-auth-guard/jwt-auth.guard';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/users')
@UseGuards(JwtAuthGuard)
export class userController {
  constructor(private userService: UserService) {}
  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Post()
  createUser(@Body() user: UserDTO) {
    return this.userService.save(user);
  }
}
