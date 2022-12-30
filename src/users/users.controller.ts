import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Response() response, @Body() createUserDTO: CreateUserDTO) {
    await this.usersService.create(createUserDTO);

    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'O usuário foi criado com sucesso',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOneById(@Request() request, @Response() response) {
    const { id } = request.user;

    const user = await this.usersService.findOneById(id);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'As informações do usuário foram obtidas',
      user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async findOneAndUpdateById(
    @Request() request,
    @Response() response,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const { id } = request.user;

    await this.usersService.findOneAndUpdateById(id, updateUserDTO);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'As informações do usuário foram atualizadas',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async findOneAndRemoveById(@Request() request, @Response() response) {
    const { id } = request.user;

    await this.usersService.findOneAndRemoveById(id);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'O usuário foi deletado com sucesso',
    });
  }
}
