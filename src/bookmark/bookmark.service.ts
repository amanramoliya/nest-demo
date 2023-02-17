import { Injectable } from '@nestjs/common';
import { Bookmark } from './../../node_modules/.prisma/client/index.d';
import { PrismaSerivce } from './../prisma/prisma.service';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly prismaService: PrismaSerivce) {}

  async findAllBookmark(userId: string): Promise<Bookmark[]> {
    return await this.prismaService.bookmark.findMany({
      where: {
        userId,
      },
    });
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

  async findBookmarkById(userId: string, id: string): Promise<Bookmark> {
    return await this.prismaService.bookmark.findFirst({
      where: {
        userId,
        id,
      },
    });
  }

  async deleteBookmarkById(userId: string, id: string) {
    await this.prismaService.bookmark.deleteMany({
      where: {
        userId,
        id,
      },
    });
  }

  async updateB(id: string, bookmark: CreateBookmarkDTO): Promise<Bookmark> {
    return await this.prismaService.bookmark.update({
      data: {
        ...bookmark,
      },
      where: {
        id,
      },
    });
  }
}
