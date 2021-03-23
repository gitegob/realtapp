import { LoginDto } from './dto/login.dto';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Route: Sign up a user
   *
   * @param signupDto
   * @returns access_token
   */
  @Post('/signup')
  @ApiResponse({ status: 201, description: 'Sign up successful' })
  @ApiResponse({ status: 400, description: 'Bad entries' })
  async signup(@Body() signupDto: SignupDto) {
    return { data: await this.authService.create(signupDto) };
  }

  /** Route: Log in a user
   *
   * @param loginDto
   * @returns access_token
   */
  @HttpCode(200)
  @Post('/login')
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return { data: await this.authService.login(loginDto) };
  }
}
