import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, MinLength } from 'class-validator';

export class CreateHouseDto {
  @ApiProperty({
    type: 'string',
    description: 'House title',
    default: 'Beautiful house',
  })
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title should have more than 5 characters',
  })
  readonly title: string;

  @ApiProperty({
    type: 'string',
    description: 'House Description',
    default: "This is beautiful house, don't miss it",
  })
  @IsNotEmpty()
  @MinLength(10, { message: 'Description should have more than 10 characters' })
  readonly description: string;

  @ApiProperty({
    type: 'string',
    description: 'District',
    default: 'Nyarutarama',
  })
  @IsNotEmpty()
  readonly district: string;

  @ApiProperty({
    type: 'string',
    description: 'Street',
    default: 'KK 625 st',
  })
  @IsNotEmpty()
  readonly street: string;

  @ApiProperty({
    format: 'binary',
    description: 'House Pictures',
  })
  @Allow()
  pictures: string[];

  @ApiProperty({
    type: 'number',
    description: 'House Price',
    default: 150000000,
  })
  @IsNotEmpty()
  readonly price: number;
}
