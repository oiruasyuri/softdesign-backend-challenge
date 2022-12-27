import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from 'src/interfaces/user.interface';

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  synopsis: string;

  @Prop({ type: Object })
  user: IUser;

  @Prop()
  user_id: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
