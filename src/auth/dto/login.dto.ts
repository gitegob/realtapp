import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LogInDto {
  @IsNotEmpty({
    message: 'email is required',
  })
  @IsEmail()
  @ApiProperty({
    description: 'The email',
    default: 'gitegob7@gmail.com',
  })
  email: string;

  @IsNotEmpty({
    message: 'password is required',
  })
  @ApiProperty({
    description: 'The password',
    default: 'Password',
  })
  password: string;
}
