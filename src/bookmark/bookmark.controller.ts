import { Controller, Get } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @Get()
  getAllBookmark(): Promise<Bookmark[]> {
    return this.bookmarkService.findAllBookmark();
  }
}
