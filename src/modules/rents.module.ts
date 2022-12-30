import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentsController } from 'src/controllers/rents.controller';
import { BookSchema } from 'src/database/schemas/book.schema';
import { UserSchema } from 'src/database/schemas/user.schema';
import { MongooseRentsRepository } from 'src/repositories/mongoose/mongoose-rents.repository';
import { RentsRepository } from 'src/repositories/rents.repository';
import { RentsService } from 'src/services/rents.service';

@Module({
  controllers: [RentsController],
  providers: [
    RentsService,
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
export class RentsModule { }
