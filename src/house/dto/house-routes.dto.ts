import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HouseRoutesDto {
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
