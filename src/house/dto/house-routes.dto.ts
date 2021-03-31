import { IsEnum, IsNumberString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../shared/dto/pagination.dto';

export class HouseRoutesDto extends PaginationDto {
  @ApiProperty({
    enum: ['all', 'mine'],
    default: 'all',
  })
  @IsNotEmpty()
  @IsEnum(['all', 'mine'], {
    message: 'Target must be either all or mine',
  })
  readonly target: string;
}

export type Target = 'all' | 'mine';
