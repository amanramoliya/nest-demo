import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { jwtPayload } from './../auth/dto/jwt.payload';
import { JwtAuthGuard } from './../auth/jwt-auth-guard/jwt-auth.guard';
import { UserDecorator } from './../decorator/user.decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';

@Controller('bookmark')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @Get()
  getAllBookmark(@UserDecorator() user: jwtPayload): Promise<Bookmark[]> {
    console.log(user);
    return this.bookmarkService.findAllBookmark();
  }

  @Post()
  createBookmark(
    @UserDecorator() user: jwtPayload,
    @Body() bookmark: CreateBookmarkDTO,
  ): Promise<Bookmark> {
    console.log(user);
    return this.bookmarkService.saveBookmark(bookmark, user.id);
  }
}
