import { Injectable } from '@nestjs/common';
import { Bookmark } from './../../node_modules/.prisma/client/index.d';
import { PrismaSerivce } from './../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private readonly prismaService: PrismaSerivce) {}

  findAllBookmark(): Promise<Bookmark[]> {
    return this.prismaService.bookmark.findMany();
  }
}
