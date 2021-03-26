import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max } from 'class-validator';

export class CreateBidDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'Price must be a number' })
  @Max(999999999999)
  @ApiProperty({
    description: 'Bidding price',
    default: 15000000,
  })
  price: number;
}
