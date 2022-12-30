import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDTO } from '../dto/create-book.dto';
import { UpdateBookDTO } from '../dto/update-book.dto';
import { IBook } from '../interface/book.interface';
import { BooksRepository } from './books.repository';

@Injectable()
export class MongooseBooksRepository implements BooksRepository {
  constructor(@InjectModel('Book') private readonly bookModel: Model<IBook>) { }

  async create(createBookDTO: CreateBookDTO) {
    const newBook = new this.bookModel({
      user_id: null,
      ...createBookDTO,
    });

    return newBook.save();
  }

  async find(filter: string) {
    const filterRegex = new RegExp(filter, 'i');

    const filteredBooks = await this.bookModel.find({
      $or: [
        { title: { $regex: filterRegex } },
        { synopsis: { $regex: filterRegex } },
      ],
    });

    return filteredBooks;
  }

  async findOneByTitle(title: string) {
    const book = await this.bookModel.findOne({ title });

    return book;
  }

  async findOneById(id: string) {
    const book = await this.bookModel.findOne({ _id: id });

    return book;
  }

  async findOneAndUpdateById(id: string, updateBookDTO: UpdateBookDTO) {
    const updatedBook = await this.bookModel.findOneAndUpdate(
      { _id: id },
      { ...updateBookDTO },
    );

    return updatedBook;
  }

  async findOneAndRemoveById(id: string) {
    const deletedBook = await this.bookModel.findOneAndRemove({ _id: id });

    return deletedBook;
  }
}
