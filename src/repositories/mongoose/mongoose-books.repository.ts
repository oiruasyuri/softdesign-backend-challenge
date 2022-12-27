import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDTO } from 'src/dtos/create-book.dto';
import { UpdateBookDTO } from 'src/dtos/update-book.dto';
import { IBook } from 'src/interfaces/book.interface';
import { BooksRepository } from '../books.repository';

@Injectable()
export class MongooseBooksRepository implements BooksRepository {
  constructor(@InjectModel('Book') private bookModel: Model<IBook>) { }

  async create(createBookDTO: CreateBookDTO): Promise<IBook> {
    const book = new this.bookModel(createBookDTO);

    return book.save();
  }

  async findUnique(id: string): Promise<IBook> {
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('O livro não foi encontrado');
    }

    return book;
  }

  async update(id: string, updateBookDTO: UpdateBookDTO): Promise<IBook> {
    const editedBook = await this.bookModel.findByIdAndUpdate(
      id,
      updateBookDTO,
    );

    if (!editedBook) {
      throw new NotFoundException('O livro não foi encontrado');
    }

    return editedBook;
  }

  async delete(id: string): Promise<IBook> {
    return await this.bookModel.findByIdAndDelete(id);
  }

  async findMany(): Promise<IBook[]> {
    return this.bookModel.find();
  }
}
