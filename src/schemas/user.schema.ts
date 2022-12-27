import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBook } from 'src/interfaces/book.interface';

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Object })
  book: IBook;

  @Prop()
  book_id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
