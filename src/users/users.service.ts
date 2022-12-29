import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserDTO: CreateUserDTO) {
    const isEmailInUse = await this.findOneByEmail(createUserDTO.email);

    if (isEmailInUse) {
      throw new HttpException(
        'O email desejado já se encontra em uso',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.usersRepository.create(createUserDTO);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneByEmail(email);
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new HttpException(
        'Não existe um usuário vinculado a esse id',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async findOneAndUpdateById(id: string, updateUserDTO: UpdateUserDTO) {
    const isValidUser = await this.usersRepository.findOneById(id);

    if (!isValidUser) {
      throw new HttpException(
        'O usuário que está tentando atualizar informações não existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.usersRepository.findOneAndUpdateById(id, updateUserDTO);
  }

  async findOneAndRemoveById(id: string) {
    const isValidUser = await this.usersRepository.findOneById(id);

    if (!isValidUser) {
      throw new HttpException(
        'O usuário que está tentando deletar não existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.usersRepository.findOneAndRemoveById(id);
  }
}
