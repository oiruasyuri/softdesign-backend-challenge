import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/create-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO, @Res() response) {
    try {
      const user = await this.usersService.create(createUserDTO);

      return response.status(HttpStatus.CREATED).json({
        message: 'O usuário foi criado com sucesso.',
        user,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Não foi possível criar o usuário',
        statusCode: 400,
        error: 'Bad Request',
      });
    }
  }
}
