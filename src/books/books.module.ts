import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/database/schemas/book.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './repository/books.repository';
import { MongooseBooksRepository } from './repository/mongoose-books.repository';

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    { provide: BooksRepository, useClass: MongooseBooksRepository },
  ],
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
})
export class BooksModule { }
