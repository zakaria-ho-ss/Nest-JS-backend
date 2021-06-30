import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
} from '@nestjs/common';
import { diskStorage } from 'multer';

import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';

import { newBooksDTO, updateBooksDTO } from './books.models';
import { BooksService } from './books.service';
import { ApiConsumes } from '@nestjs/swagger';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/assets/booksImages',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  create(@UploadedFile() file, @Body() createBookDto: newBooksDTO) {
    createBookDto.image = file.filename;
    return this.booksService.create(createBookDto);
  }

  @Get('image/:imagename')
  findImage(@Param('imagename') imagename, @Res() res) {
    try {
      return of(
        res.sendFile(
          join(process.cwd(), 'src/assets/booksImages/' + imagename),
        ),
      );
    } catch (e) {
      return 'error';
    }
  }
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: updateBooksDTO) {
    return this.booksService.update(id, updateBookDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
