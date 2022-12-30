import {
  Controller,
  HttpStatus,
  Param,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RentsService } from './rents.service';

@Controller('rents')
export class RentsController {
  constructor(private readonly rentsService: RentsService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':book_id')
  async create(
    @Request() request,
    @Response() response,
    @Param('book_id') book_id: string,
  ) {
    try {
      const { id: user_id } = await request.user;

      const rent = await this.rentsService.create({ book_id, user_id });

      return response.status(HttpStatus.CREATED).json({
        message: 'O contrato de aluguel foi efetuado',
        rent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Não foi possível alugar o livro',
        statusCode: 400,
        error: 'Bad Request',
      });
    }
  }
}
