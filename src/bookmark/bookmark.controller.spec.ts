import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

describe('BookmarkController', () => {
  let controller: BookmarkController;
  let service: BookmarkService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkController],
      providers: [
        {
          provide: BookmarkService,
          useFactory() {
            return {
              findAllBookmark: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<BookmarkController>(BookmarkController);
    service = module.get<BookmarkService>(BookmarkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be getAllBookmark', async () => {
    jest.spyOn(service, 'findAllBookmark').mockReturnValueOnce(Promise.all([]));
    const result = await controller.getAllBookmark();

    expect(service.findAllBookmark).toBeCalledTimes(1);

    expect(result).toMatchObject([]);
  });
});
