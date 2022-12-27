import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateBookDTO } from 'src/dtos/create-book.dto';
import { UpdateBookDTO } from 'src/dtos/update-book.dto';
import { BooksService } from 'src/services/books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  async create(@Body() createBookDTO: CreateBookDTO, @Res() response) {
    try {
      const book = await this.booksService.create(createBookDTO);

      return response.status(HttpStatus.CREATED).json({
        message: 'O livro foi criado com sucesso.',
        book,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Não foi possível criar o livro',
        error: 'Bad Request',
      });
    }
  }

  @Get(':id')
  async findUnique(@Param('id') id: string, @Res() response) {
    try {
      const book = await this.booksService.findUnique(id);

      return response.status(HttpStatus.OK).json({
        message: 'O livro foi encontrado com sucesso',
        book,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Não foi possível encontrar o livro',
        error: 'Bad Request',
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDTO: UpdateBookDTO,
    @Res() response,
  ) {
    try {
      const editedBook = await this.booksService.update(id, updateBookDTO);

      Object.assign(editedBook, updateBookDTO);

      return response.status(HttpStatus.OK).json({
        message: 'As informações do livro foram atualizadas',
        book: editedBook,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Não foi possível atualizar as informações do livro',
        error: 'Bad Request',
      });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() response) {
    try {
      await this.booksService.delete(id);

      return response.status(HttpStatus.OK).json({
        message: 'O livro foi deletado com sucesso',
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async findMany(@Res() response) {
    try {
      const books = await this.booksService.findMany();

      return response.status(HttpStatus.OK).json({
        message: 'Os livros foram encontrados com sucesso',
        books,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Não foi possível encontrar os livros',
        error: 'Bad Request',
      });
    }
  }
}
