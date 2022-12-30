import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { RentsModule } from './rents/rents.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION, {
      dbName: process.env.MONGO_DATABASE,
    }),
    UsersModule,
    AuthModule,
    BooksModule,
    RentsModule,
  ],
})
export class AppModule { }
