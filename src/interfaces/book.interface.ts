import { Document } from 'mongoose';

export interface IBook extends Document {
  readonly title: string;
  readonly synopsis: string;
  readonly user: object;
  readonly user_id: string;
}
