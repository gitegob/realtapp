import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max } from 'class-validator';

export class CreateBidDto {
  @IsNotEmpty()
  @IsNumber({ allowInfinity: false }, { message: 'Price must be a number' })
  @Max(1000000000000)
  @ApiProperty({
    description: 'Bidding price',
    default: '15000000',
  })
  price: number;
}
