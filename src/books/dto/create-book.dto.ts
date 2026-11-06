import { Transform } from 'class-transformer';
import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

// Lo que tiene que enviar el cliente para crear un libro
export class CreateAndUpdateBookDto {
  // Si llega un texto, le quita los espacios del principio y del final
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString() // tiene que ser texto
  @MinLength(1) // no puede estar vacío
  @MaxLength(200) // como mucho 200 caracteres
  title!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  author!: string;

  @IsInt() // número entero
  @Min(1, { message: 'El número de páginas debe ser un valor positivo' }) // al menos 1 página
  @Max(2000, { message: 'El número de páginas no puede exceder 2000' }) // como mucho 2000 páginas
  pages!: number;
}
