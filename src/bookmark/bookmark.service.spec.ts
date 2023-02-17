import { Test, TestingModule } from '@nestjs/testing';
import { Bookmark } from '@prisma/client';
import { PrismaSerivce } from './../prisma/prisma.service';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';
describe('Bookmark', () => {
  let service: BookmarkService;
  let prismaService: PrismaSerivce;
  let id: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarkService,
        {
          provide: PrismaSerivce,
          useFactory() {
            return {
              bookmark: {
                findMany: jest.fn(),
                create: jest.fn(),
                findFirst: jest.fn(),
                deleteMany: jest.fn(),
                update: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<BookmarkService>(BookmarkService);
    prismaService = module.get<PrismaSerivce>(PrismaSerivce);
    id = '1';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be findAllBookmark', async () => {
    jest.spyOn(prismaService.bookmark, 'findMany').mockResolvedValue([]);
    const result = await service.findAllBookmark(id);

    expect(prismaService.bookmark.findMany).toBeCalledTimes(1);

    expect(result).toMatchObject([]);
  });

  it('should be createBookmark', async () => {
    const bookmarkDTO: CreateBookmarkDTO = {
      name: 'test',
      url: 'test.png',
      description: 'test description',
    };

    jest
      .spyOn(prismaService.bookmark, 'create')
      .mockResolvedValue({ ...bookmarkDTO, id: '1', userId: 'userid' });
    const result = await service.saveBookmark(bookmarkDTO, 'userid');

    expect(prismaService.bookmark.create).toBeCalledTimes(1);
    expect(prismaService.bookmark.create).toHaveBeenCalledWith({
      data: {
        ...bookmarkDTO,
        userId: 'userid',
      },
    });

    expect(result).toMatchObject({ ...bookmarkDTO, id: '1', userId: 'userid' });
  });

  it('should be findBookmarkById', async () => {
    const bookmark: Bookmark = {
      id: '1',
      name: 'test',
      url: 'test.png',
      userId: id,
      description: 'test description',
    };

    jest.spyOn(prismaService.bookmark, 'findFirst').mockResolvedValue(bookmark);
    const result = await service.findBookmarkById(id, '1');

    expect(prismaService.bookmark.findFirst).toBeCalledTimes(1);

    expect(prismaService.bookmark.findFirst).toHaveBeenCalledWith({
      where: {
        userId: id,
        id: '1',
      },
    });
    expect(result).toMatchObject(bookmark);
  });

  it('should be updateBookmark', async () => {
    const bookmark: Bookmark = {
      id: '1',
      name: 'test',
      url: 'test.png',
      userId: id,
      description: 'test description',
    };

    jest.spyOn(prismaService.bookmark, 'update').mockResolvedValue(bookmark);
    const result = await service.updateB(bookmark);

    expect(prismaService.bookmark.update).toBeCalledTimes(1);

    expect(prismaService.bookmark.update).toHaveBeenCalledWith({
      data: {
        ...bookmark,
      },
      where: {
        id: '1',
      },
    });

    expect(result).toMatchObject(bookmark);
  });

  it('should be deletedBookmarkById', async () => {
    jest.spyOn(prismaService.bookmark, 'deleteMany');
    await service.deleteBookmarkById(id, '1');

    expect(prismaService.bookmark.deleteMany).toBeCalledTimes(1);

    expect(prismaService.bookmark.deleteMany).toHaveBeenCalledWith({
      where: {
        userId: id,
        id: '1',
      },
    });
  });
});
