import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/controllers/users.controller';
import { MongooseUsersRepository } from 'src/repositories/mongoose/mongoose-users.repository';
import { UsersRepository } from 'src/repositories/users.repository';
import { UserSchema } from 'src/schemas/user.schema';
import { UsersService } from 'src/services/users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: MongooseUsersRepository,
    },
  ],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class UsersModule { }
