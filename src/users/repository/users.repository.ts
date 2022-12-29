import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { IUser } from '../interface/user.interface';

export abstract class UsersRepository {
  abstract create(createUserDTO: CreateUserDTO): Promise<IUser>;

  abstract findOneByEmail(email: string): Promise<IUser>;

  abstract findOneById(id: string): Promise<IUser>;

  abstract findOneAndUpdateById(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<IUser>;

  abstract findOneAndRemoveById(id: string): Promise<IUser>;
}
