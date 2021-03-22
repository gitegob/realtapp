import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseDto {
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title should have more than 5 characters',
  })
  @ApiProperty({
    description: 'Title of the post',
    default: 'Beautiful house',
  })
  readonly title: string;

  @IsNotEmpty()
  @MinLength(10, { message: 'Description should have more than 10 characters' })
  @ApiProperty({
    description: 'Description of the post',
    default: "This is beautiful house, don't miss it",
  })
  readonly description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'District',
    default: 'KICUKIRO',
  })
  readonly district: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Street',
    default: 'KK 440',
  })
  readonly street: string;

  pictures: string[];

  @IsNotEmpty()
  @ApiProperty({
    description: 'Price of the house',
    default: '20000',
  })
  readonly price: number;

  createdBy: string;
}
