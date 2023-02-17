import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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
    return this.bookmarkService.findAllBookmark(user.id);
  }

  @Get('/:id')
  getBookmarkById(@UserDecorator() user: jwtPayload, @Param('id') id: string) {
    return this.bookmarkService.findBookmarkById(user.id, id);
  }

  @Post()
  createBookmark(
    @UserDecorator() user: jwtPayload,
    @Body() bookmark: CreateBookmarkDTO,
  ): Promise<Bookmark> {
    console.log(user);
    return this.bookmarkService.saveBookmark(bookmark, user.id);
  }

  @Put('/:id')
  updateBookmark(@Param('id') id: string, @Body() bookmark: Bookmark) {
    return this.bookmarkService.updateB(id, bookmark);
  }

  @Delete('/:id')
  removeBookmarkById(
    @UserDecorator() user: jwtPayload,
    @Param('id') id: string,
  ) {
    this.bookmarkService.deleteBookmarkById(user.id, id);
  }
}
