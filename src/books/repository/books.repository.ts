import { CreateBookDTO } from '../dto/create-book.dto';
import { UpdateBookDTO } from '../dto/update-book.dto';
import { IBook } from '../interface/book.interface';

export abstract class BooksRepository {
  abstract create(createBookDTO: CreateBookDTO): Promise<IBook>;

  abstract find(filter: string): Promise<IBook[]>;

  abstract findOneByTitle(title: string): Promise<IBook>;

  abstract findOneById(id: string): Promise<IBook>;

  abstract findOneAndUpdateById(
    id: string,
    updateBookDTO: UpdateBookDTO,
  ): Promise<IBook>;

  abstract findOneAndRemoveById(id: string): Promise<IBook>;
}
