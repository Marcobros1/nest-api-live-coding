import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { BooksService } from 'src/books/books.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorsController],
  providers: [BooksService]
})
export class AuthorsModule {}
