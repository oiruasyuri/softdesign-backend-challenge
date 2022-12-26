import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/create-user.dto';
import { IUser } from 'src/interfaces/user.interface';
import { UsersRepository } from 'src/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) { }

  async create(createUserDTO: CreateUserDTO): Promise<IUser> {
    return await this.usersRepository.create(createUserDTO);
  }
}
