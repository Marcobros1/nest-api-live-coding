import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { Book, BookRow, buildBookRowToBook } from './book';
import { CreateAndUpdateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly pool: Pool) {} // NestJS nos da el Pool

  // GET /api/books   y   GET /api/books?author=gabriel
  async findAll(author?: string, maxPages?: number): Promise<Book[]> {
    const conditions: string[] = []; // trozos del WHERE
    const params: (string | number)[] = []; // valores para $1, $2...

    if (author) {
      params.push(author);
      // ILIKE: como LIKE, pero sin mirar mayúsculas
      conditions.push(`author ILIKE '%' || $${params.length} || '%'`);
    }

    if (maxPages !== undefined) {
      params.push(maxPages);
      conditions.push(`pages <= $${params.length}`);
    }

    // Solo añadimos WHERE si hay algún filtro
    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const result = await this.pool.query<BookRow>(
      `SELECT id, title, author, pages, created_at
       FROM books
       ${where}
       ORDER BY id`,
      params,
    );
    return result.rows.map(buildBookRowToBook);
  }

  // GET /api/books/:id
  async findOne(id: number): Promise<Book> {
    const result = await this.pool.query<BookRow>(
      'SELECT id, title, author, pages, created_at FROM books WHERE id = $1',
      [id],
    );
    if (result.rows.length === 0) {
      throw new NotFoundException('Libro no encontrado'); // ninguna fila → 404
    }
    return buildBookRowToBook(result.rows[0]);
  }

  // POST /api/books
  async create(dto: CreateAndUpdateBookDto): Promise<Book> {
    const result = await this.pool.query<BookRow>(
      `INSERT INTO books (title, author, pages)
       VALUES ($1, $2, $3)
       RETURNING id, title, author, pages, created_at`,
      [dto.title, dto.author, dto.pages],
    );
    return buildBookRowToBook(result.rows[0]); // RETURNING nos da el libro guardado, con su id
  }

  // PATCH /api/books/:id
  async update(id: number, dto: UpdateBookDto): Promise<Book> {
    if (dto.title === undefined && dto.author === undefined && dto.pages === undefined) {
      throw new BadRequestException('Envía al menos un campo');
    }
    const book = await this.findOne(id); // 404 si no existe

    const result = await this.pool.query<BookRow>(
      `UPDATE books
       SET title = $1, author = $2, pages = $3
       WHERE id = $4
       RETURNING id, title, author, pages, created_at`,
      // ?? = "el valor nuevo; si no ha llegado, el de antes"
      [dto.title ?? book.title, dto.author ?? book.author, dto.pages ?? book.pages, id],
    );
    return buildBookRowToBook(result.rows[0]);
  }

  // DELETE /api/books/:id
  async remove(id: number): Promise<Book> {
    const book = await this.findOne(id); // 404 si no existe
    await this.pool.query('DELETE FROM books WHERE id = $1', [id]);
    return book; // devolvemos el libro borrado
  }
}