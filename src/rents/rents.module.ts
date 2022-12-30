import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/database/schemas/book.schema';
import { UserSchema } from 'src/database/schemas/user.schema';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';
import { MongooseRentsRepository } from './repository/mongoose-rents.repository';
import { RentsRepository } from './repository/rents.repository';

@Module({
  controllers: [RentsController],
  providers: [
    RentsService,
    { provide: RentsRepository, useClass: MongooseRentsRepository },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Book', schema: BookSchema },
    ]),
  ],
})
export class RentsModule { }
