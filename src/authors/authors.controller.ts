import { Controller, Get } from '@nestjs/common';
import { Book } from 'src/books/book';
import { BooksService } from 'src/books/books.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooksByAuthor(): string[] {
    // return this.booksService.getBooksUniqueByAuthor();
    return [];
  }
}
