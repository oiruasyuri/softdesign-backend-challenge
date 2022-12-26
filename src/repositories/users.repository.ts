import { CreateUserDTO } from 'src/dtos/create-user.dto';
import { IUser } from 'src/interfaces/user.interface';

export abstract class UsersRepository {
  abstract create(createUserDTO: CreateUserDTO): Promise<IUser>;
}
