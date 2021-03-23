import { LoginDto } from './dto/login.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({ status: 201, description: 'Sign up successful' })
  @ApiResponse({ status: 400, description: 'Bad entries' })
  async signup(@Body() signupDto: SignupDto) {
    return { data: await this.authService.create(signupDto) };
  }

  @Post('/login')
  @ApiResponse({ status: 201, description: 'Sign up successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto) {
    return { data: { access_token: await this.authService.login(loginDto) } };
  }
}
