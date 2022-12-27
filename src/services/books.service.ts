import { Injectable } from '@nestjs/common';
import { CreateBookDTO } from 'src/dtos/create-book.dto';
import { UpdateBookDTO } from 'src/dtos/update-book.dto';
import { IBook } from 'src/interfaces/book.interface';
import { BooksRepository } from 'src/repositories/books.repository';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) { }

  async create(createBookDTO: CreateBookDTO): Promise<IBook> {
    return await this.booksRepository.create(createBookDTO);
  }

  async findUnique(id: string): Promise<IBook> {
    return await this.booksRepository.findUnique(id);
  }

  async update(id: string, updateBookDTO: UpdateBookDTO): Promise<IBook> {
    return await this.booksRepository.update(id, updateBookDTO);
  }

  async delete(id: string): Promise<IBook> {
    return await this.booksRepository.delete(id);
  }

  async findMany(): Promise<IBook[]> {
    return await this.booksRepository.findMany();
  }
}
