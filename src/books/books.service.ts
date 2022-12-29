import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { BooksRepository } from './repository/books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) { }

  async create(createBookDTO: CreateBookDTO) {
    const titleAlreadyExists = await this.findOneByTitle(createBookDTO.title);

    if (titleAlreadyExists) {
      throw new HttpException(
        'O titulo desejado já se encontra em uso',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.booksRepository.create(createBookDTO);
  }

  async findOneByTitle(title: string) {
    return await this.booksRepository.findOneByTitle(title);
  }

  async findOneById(id: string) {
    const book = await this.booksRepository.findOneById(id);

    if (!book) {
      throw new HttpException(
        'Não existe um livro vinculado a esse id',
        HttpStatus.BAD_REQUEST,
      );
    }

    return book;
  }

  async findOneAndUpdateById(id: string, updateBookDTO: UpdateBookDTO) {
    await this.verifyBookIsExistsById(
      id,
      'O livro que está tentando atualizar não existe',
    );

    await this.verifyBookIsRentedById(
      id,
      'O livro que está tentando atualizar está alugado',
    );

    return await this.booksRepository.findOneAndUpdateById(id, updateBookDTO);
  }

  async findOneAndRemoveById(id: string) {
    await this.verifyBookIsExistsById(
      id,
      'O livro que está tentando deletar não existe',
    );

    await this.verifyBookIsRentedById(
      id,
      'O livro que está tentando deletar está alugado',
    );

    return await this.booksRepository.findOneAndRemoveById(id);
  }

  async verifyBookIsRentedById(id: string, messageException: string) {
    const book = await this.booksRepository.findOneById(id);
    const bookIsRented = book.user_id === null ? false : true;

    if (bookIsRented) {
      throw new HttpException(messageException, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyBookIsExistsById(id: string, messageException: string) {
    const bookIsExists = await this.booksRepository.findOneById(id);

    if (!bookIsExists) {
      throw new HttpException(messageException, HttpStatus.BAD_REQUEST);
    }
  }
}
