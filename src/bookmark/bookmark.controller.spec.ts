import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';

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
              saveBookmark: jest.fn(),
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
    jest.spyOn(service, 'findAllBookmark').mockResolvedValueOnce([]);
    const result = await controller.getAllBookmark();

    expect(service.findAllBookmark).toBeCalledTimes(1);

    expect(result).toMatchObject([]);
  });
  it('should be createBookmark', async () => {
    const bookmark: CreateBookmarkDTO = {
      name: 'test',
      url: 'test.png',
      description: 'test description',
    };
    jest
      .spyOn(service, 'saveBookmark')
      .mockResolvedValueOnce({ ...bookmark, id: '1', userId: 'userid' });
    const result = await controller.createBookmark(bookmark);

    expect(service.saveBookmark).toBeCalledTimes(1);

    expect(result).toMatchObject(bookmark);
  });
});
