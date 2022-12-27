import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/dtos/create-user.dto';
import { IUser } from 'src/interfaces/user.interface';
import { UsersRepository } from '../users.repository';

@Injectable()
export class MongooseUsersRepository implements UsersRepository {
  constructor(@InjectModel('User') private userModel: Model<IUser>) { }

  async create(createUserDTO: CreateUserDTO): Promise<IUser> {
    const user = new this.userModel({
      book: null,
      book_id: null,
      ...createUserDTO,
    });

    return user.save();
  }

  async findUnique(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email });
  }
}
