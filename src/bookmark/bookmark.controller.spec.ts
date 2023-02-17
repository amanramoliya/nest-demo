import { Test, TestingModule } from '@nestjs/testing';
import { Bookmark } from '@prisma/client';
import { jwtPayload } from 'src/auth/dto/jwt.payload';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';

describe('BookmarkController', () => {
  let controller: BookmarkController;
  let service: BookmarkService;
  let user: jwtPayload;

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
              findBookmarkById: jest.fn(),
              deleteBookmarkById: jest.fn(),
              updateB: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<BookmarkController>(BookmarkController);
    service = module.get<BookmarkService>(BookmarkService);
    user = { id: '1', email: 'test.io' };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be getAllBookmark', async () => {
    jest.spyOn(service, 'findAllBookmark').mockResolvedValueOnce([]);
    const result = await controller.getAllBookmark(user);

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
    const result = await controller.createBookmark(user, bookmark);

    expect(service.saveBookmark).toBeCalledTimes(1);

    expect(result).toMatchObject(bookmark);
  });

  it('should be getBookmarkById', async () => {
    const bookmark: Bookmark = {
      id: '1',
      name: 'test',
      url: 'test.png',
      userId: user.id,
      description: 'test description',
    };

    jest.spyOn(service, 'findBookmarkById').mockResolvedValueOnce(bookmark);
    const result = await controller.getBookmarkById(user, '1');

    expect(service.findBookmarkById).toBeCalledTimes(1);

    expect(result).toMatchObject(bookmark);
  });

  it('should be deleteBookmarkById', async () => {
    jest.spyOn(service, 'deleteBookmarkById').mockResolvedValueOnce();
    controller.removeBookmarkById(user, '1');

    expect(service.deleteBookmarkById).toBeCalledTimes(1);
  });

  it('should be updateBookmark', async () => {
    const bookmark: Bookmark = {
      id: '1',
      name: 'test',
      url: 'test.png',
      userId: user.id,
      description: 'test description',
    };
    jest.spyOn(service, 'updateB').mockResolvedValueOnce(bookmark);
    const result = await controller.updateBookmark('1', bookmark);

    expect(service.updateB).toBeCalledTimes(1);

    expect(result).toMatchObject(bookmark);
  });
});
