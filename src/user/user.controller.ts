import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/users')
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
