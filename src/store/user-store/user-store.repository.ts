import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../user/dto/user.dto';

@Injectable()
export class UserStoreRepository {
  users: UserDTO[] = [];

  save(user: UserDTO) {
    this.users.push(user);
    return user;
  }

  getAll() {
    return this.users;
  }

  findById(id: string) {
    return this.users.find((user) => user.id == id);
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email == email);
  }
}
