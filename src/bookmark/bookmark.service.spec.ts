import { Test, TestingModule } from '@nestjs/testing';
import { PrismaSerivce } from './../prisma/prisma.service';
import { BookmarkService } from './bookmark.service';
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
});
