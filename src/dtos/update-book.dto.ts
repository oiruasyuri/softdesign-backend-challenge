import { IsOptional, IsString } from 'class-validator';

export class UpdateBookDTO {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly synopsis: string;
}
