import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateHouseDto {
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title should have more than 5 characters',
  })
  readonly title: string;

  @IsNotEmpty()
  @MinLength(10, { message: 'Description should have more than 10 characters' })
  readonly description: string;

  @IsNotEmpty()
  readonly district: string;

  @IsNotEmpty()
  readonly street: string;

  pictures: string[];

  @IsNotEmpty()
  readonly price: number;
}
