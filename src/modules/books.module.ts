import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from 'src/controllers/books.controller';
import { BooksRepository } from 'src/repositories/books.repository';
import { MongooseBooksRepository } from 'src/repositories/mongoose/mongoose-books.repository';
import { MongooseRentsRepository } from 'src/repositories/mongoose/mongoose-rents.repository';
import { RentsRepository } from 'src/repositories/rents.repository';
import { BookSchema } from 'src/schemas/book.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { BooksService } from 'src/services/books.service';

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: BooksRepository,
      useClass: MongooseBooksRepository,
    },
    {
      provide: RentsRepository,
      useClass: MongooseRentsRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Book', schema: BookSchema },
    ]),
  ],
})
export class BooksModule { }
