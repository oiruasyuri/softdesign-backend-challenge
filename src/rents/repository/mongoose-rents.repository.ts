import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBook } from 'src/books/interface/book.interface';
import { IUser } from 'src/users/interface/user.interface';
import { RentsRepository } from './rents.repository';

@Injectable()
export class MongooseRentsRepository implements RentsRepository {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<IBook>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) { }

  async create(createRentDTO) {
    const { book_id, user_id } = createRentDTO;

    const rentedBook = await this.bookModel.findByIdAndUpdate(book_id, {
      user_id,
    });

    if (!rentedBook)
      throw new NotFoundException('Não foi possível encontrar o livro');

    const userWhoRented = await this.userModel.findByIdAndUpdate(user_id, {
      book_id,
    });

    if (!userWhoRented)
      throw new NotFoundException('Não foi possível encontrar o usuário');

    return { book: rentedBook, user: userWhoRented };
  }

  async checkIfTheBookIsRented(book_id: string): Promise<boolean> {
    const book = await this.bookModel.findById(book_id);

    const bookIsRented = book.user_id === null ? false : true;

    return bookIsRented;
  }
}
