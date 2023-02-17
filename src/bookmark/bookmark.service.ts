import { Injectable } from '@nestjs/common';
import { Bookmark } from './../../node_modules/.prisma/client/index.d';
import { PrismaSerivce } from './../prisma/prisma.service';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly prismaService: PrismaSerivce) {}

  async findAllBookmark(): Promise<Bookmark[]> {
    return await this.prismaService.bookmark.findMany();
  }

  async saveBookmark(
    bookmark: CreateBookmarkDTO,
    userId: string,
  ): Promise<Bookmark> {
    return await this.prismaService.bookmark.create({
      data: {
        ...bookmark,
        userId,
      },
    });
  }
}
