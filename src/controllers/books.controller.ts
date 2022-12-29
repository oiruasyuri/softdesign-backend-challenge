import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDTO } from 'src/dtos/create-book.dto';
import { UpdateBookDTO } from 'src/dtos/update-book.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BooksService } from 'src/services/books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBookDTO: CreateBookDTO, @Response() response) {
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUnique(@Param('id') id: string, @Response() response) {
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDTO: UpdateBookDTO,
    @Response() response,
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Response() response) {
    try {
      await this.booksService.delete(id);

      return response.status(HttpStatus.OK).json({
        message: 'O livro foi deletado com sucesso',
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findMany(@Response() response, @Query('filter') filter: string) {
    try {
      const books = await this.booksService.findMany(filter);

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
