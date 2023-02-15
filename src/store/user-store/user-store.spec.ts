import { Test, TestingModule } from '@nestjs/testing';
import { UserStoreRepository } from './user-store.repository';

describe('UserStore', () => {
  let provider: UserStoreRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStoreRepository],
    }).compile();

    provider = module.get<UserStoreRepository>(UserStoreRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
