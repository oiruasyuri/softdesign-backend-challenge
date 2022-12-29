import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Response() response, @Body() createBookDTO: CreateBookDTO) {
    await this.booksService.create(createBookDTO);

    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'O livro foi criado com sucesso',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneById(@Response() response, @Param('id') id: string) {
    const book = await this.booksService.findOneById(id);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'As informações do livro foram obtidas',
      book,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneAndUpdateById(
    @Response() response,
    @Param('id') id: string,
    @Body() updateBookDTO: UpdateBookDTO,
  ) {
    await this.booksService.findOneAndUpdateById(id, updateBookDTO);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'As informações do livro foram atualizadas',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneAndRemoveById(@Response() response, @Param('id') id: string) {
    await this.booksService.findOneAndRemoveById(id);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'O livro foi deletado com sucesso',
    });
  }
}
