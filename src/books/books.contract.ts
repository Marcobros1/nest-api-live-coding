import { Book } from './book';
import { CreateAndUpdateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// El contrato: qué tiene que saber hacer un servicio de libros
export interface BooksContract {
  findAll(author?: string, maxPages?: number): Promise<Book[]>;
  getLength(): Promise<number>;
  findOne(id: number): Promise<Book>;
  create(dto: CreateAndUpdateBookDto): Promise<Book>;
  update(id: number, dto: UpdateBookDto): Promise<Book>;
  remove(id: number): Promise<Book>;
}