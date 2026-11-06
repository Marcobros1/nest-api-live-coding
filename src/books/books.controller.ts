import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateAndUpdateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books') // todas las rutas de esta clase: /api/books...
export class BooksController {
  constructor(private readonly booksService: BooksService) {} // pide el servicio

  @Get() // GET /api/books   y   GET /api/books?author=gabriel&maxPages=150
  findAll(
    @Query('author') author?: string,
    @Query('maxPages', new ParseIntPipe({ optional: true })) maxPages?: number,
  ) {
    return this.booksService.findAll(author, maxPages);
  }
  /*
  @Get('count')
  getCount() {
    return { total: this.booksService.getLength() };
  }

  @Get(':id') // GET /api/books/1
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Post() // POST /api/books → responde 201
  create(@Body() dto: CreateAndUpdateBookDto) {
    return this.booksService.create(dto);
  }

  @Patch(':id') // PATCH /api/books/1
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
    return this.booksService.update(id, dto);
  }

  @Put(':id') // PUT /api/books/1
  updateWhole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAndUpdateBookDto,
  ) {
    return this.booksService.updateWhole(id, dto);
  }

  @Delete(':id') // DELETE /api/books/1
  @HttpCode(204) // responde 204 (sin contenido) en vez de 200
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }*/
}
