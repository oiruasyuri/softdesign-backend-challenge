import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from 'src/controllers/books.controller';
import { BooksRepository } from 'src/repositories/books.repository';
import { MongooseBooksRepository } from 'src/repositories/mongoose/mongoose-books.repository';
import { BookSchema } from 'src/schemas/book.schema';
import { BooksService } from 'src/services/books.service';

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: BooksRepository,
      useClass: MongooseBooksRepository,
    },
  ],
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
})
export class BooksModule { }
