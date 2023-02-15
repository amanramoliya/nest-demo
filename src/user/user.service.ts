import { Injectable } from '@nestjs/common';
import { UserStoreRepository } from './../store/user-store/user-store.repository';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private userStoreRepository: UserStoreRepository) {}

  getAllUser() {
    return this.userStoreRepository.getAll();
  }

  save(user: UserDTO) {
    user.id = crypto.randomUUID();
    return this.userStoreRepository.save(user);
  }
}
