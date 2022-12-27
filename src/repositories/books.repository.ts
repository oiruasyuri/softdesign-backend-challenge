import { CreateBookDTO } from 'src/dtos/create-book.dto';
import { UpdateBookDTO } from 'src/dtos/update-book.dto';
import { IBook } from 'src/interfaces/book.interface';

export abstract class BooksRepository {
  abstract create(createBookDTO: CreateBookDTO): Promise<IBook>;
  abstract findUnique(id: string): Promise<IBook>;
  abstract update(id: string, updateBookDTO: UpdateBookDTO): Promise<IBook>;
  abstract delete(id: string): Promise<IBook>;
  abstract findMany(filter: string): Promise<IBook[]>;
}
