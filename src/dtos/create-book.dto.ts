import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly synopsis: string;
}
