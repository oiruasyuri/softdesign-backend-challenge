import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { IUser } from '../interface/user.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class MongooseUsersRepository implements UsersRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

  async create(createUserDTO: CreateUserDTO) {
    const newUser = new this.userModel({
      book_id: null,
      ...createUserDTO,
    });

    return newUser.save();
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findOneById(id: string) {
    const user = await this.userModel.findOne({ _id: id });

    return user;
  }

  async findOneAndUpdateById(id: string, updateUserDTO: UpdateUserDTO) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { ...updateUserDTO },
    );

    return updatedUser;
  }

  async findOneAndRemoveById(id: string) {
    const deletedUser = await this.userModel.findOneAndRemove({ _id: id });

    return deletedUser;
  }
}
