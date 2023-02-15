import { Global, Module } from '@nestjs/common';
import { UserStoreRepository } from './user-store/user-store.repository';

@Global()
@Module({
  providers: [UserStoreRepository],
  exports: [UserStoreRepository],
})
export class StoreModule {}
