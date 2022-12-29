import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/create-user.dto';
import { IUser } from 'src/interfaces/user.interface';
import { UsersRepository } from 'src/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserDTO: CreateUserDTO): Promise<IUser> {
    return await this.usersRepository.create(createUserDTO);
  }

  async findUnique(email: string) {
    return await this.usersRepository.findUnique(email);
  }
}
