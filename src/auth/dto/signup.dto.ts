import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'First name is required and must be at most 50 characters',
  })
  @ApiProperty({
    description: 'The first name',
    default: 'Brian',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'Last name is required and must be at most 50 characters',
  })
  @ApiProperty({
    description: 'The last name',
    default: 'Gitego',
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'The email',
    default: 'gitegob7@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 128, {
    message: 'Password must be between 6 and 128 characters',
  })
  @ApiProperty({
    description: 'The password',
    default: 'Password',
  })
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('RW', {
    message: 'Please provide a valid phone number',
  })
  @ApiProperty({
    description: 'Phone number',
    default: '788555777',
  })
  phone: string;
}
