/*import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from './book';
import { CreateAndUpdateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  // Los libros viven en memoria: se pierden al reiniciar
  private books: Book[] = [
    {
      id: 1,
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      pages: 471,
    },
    {
      id: 2,
      title: 'El principito',
      author: 'Antoine de Saint-Exupéry',
      pages: 96,
    },
    {
      id: 3,
      title: 'Crónica de una muerte anunciada',
      author: 'Gabriel García Márquez',
      pages: 122,
    },
    { id: 4, title: 'Rayuela', author: 'Julio Cortázar', pages: 526 },
  ];

  findAll(author?: string, maxPages?: number): Book[] {
    let booksFiltered = [...this.books];
    if (author) {
      booksFiltered = booksFiltered.filter((book) =>
        book.author.toLowerCase().includes(author.toLowerCase()),
      );
    }
    if (maxPages) {
      booksFiltered = booksFiltered.filter((book) => book.pages <= maxPages);
    }
    return booksFiltered;
  }

  getLength(): number {
    return this.books.length;
  }

  findOne(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException('Libro no encontrado'); // NestJS responde 404
    }
    return book;
  }

  create(dto: CreateAndUpdateBookDto): Book {
    const nextId =
      this.books.length > 0 ? Math.max(...this.books.map((b) => b.id)) + 1 : 1;
    const book: Book = { id: nextId, ...dto }; // id nuevo + datos del body
    this.books.push(book);
    return book;
  }

  update(id: number, dto: UpdateBookDto): Book {
    // Hay que enviar al menos un campo
    if (
      dto.title === undefined &&
      dto.author === undefined &&
      dto.pages === undefined
    ) {
      throw new BadRequestException('Envía al menos un campo'); // → 400
    }

    const book = this.findOne(id); // si no existe, findOne ya lanza el 404

    // Cambiamos solo los campos que han llegado
    if (dto.title !== undefined) book.title = dto.title;
    if (dto.author !== undefined) book.author = dto.author;
    if (dto.pages !== undefined) book.pages = dto.pages;

    return book;
  }

  remove(id: number): Book {
    const book = this.findOne(id);
    this.books = this.books.filter((b) => b !== book);

    return book;
  }

  updateWhole(id: number, dto: CreateAndUpdateBookDto): Book {
    const bookToUpdate = this.findOne(id); // si no existe, findOne ya lanza el 404
    const booksWithoutCurrent = this.books.filter(
      (b) => b.id !== bookToUpdate.id,
    );
    const updatedBook: Book = { id, ...dto }; // reemplaza el libro entero
    this.books = [...booksWithoutCurrent, updatedBook]; // reemplaza el libro entero
    return updatedBook;
  }

  getBooksUniqueByAuthor(): string[] {
    const authors = this.books.reduce((listaActual: string[], currentBook: Book) => {
        const author = currentBook.author;
        return listaActual.includes(author) ? listaActual : [...listaActual, author]
    },[]);
    return authors;
  }
}
*/
