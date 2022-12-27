import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  synopsis: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
