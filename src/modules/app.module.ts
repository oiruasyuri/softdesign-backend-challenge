import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth.module';
import { BooksModule } from './books.module';
import { RentsModule } from './rents.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017', {
      dbName: 'mongodb',
    }),
    UsersModule,
    AuthModule,
    BooksModule,
    RentsModule,
  ],
})
export class AppModule { }
