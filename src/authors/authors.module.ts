import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { BooksService } from '../books/books.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorsController],
  providers: [BooksService]
})
export class AuthorsModule {}
