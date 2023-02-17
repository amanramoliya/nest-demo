import { Test, TestingModule } from '@nestjs/testing';
import { PrismaSerivce } from './../prisma/prisma.service';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';
describe('Bookmark', () => {
  let service: BookmarkService;
  let prismaService: PrismaSerivce;

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
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<BookmarkService>(BookmarkService);
    prismaService = module.get<PrismaSerivce>(PrismaSerivce);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be findAllBookmark', async () => {
    jest.spyOn(prismaService.bookmark, 'findMany').mockResolvedValue([]);
    const result = await service.findAllBookmark();

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
});
