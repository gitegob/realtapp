import { LoginDto } from './dto/login.dto';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { RateLimit } from 'nestjs-rate-limiter';
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
  @RateLimit({
    keyPrefix: 'signUp',
    points: 3,
  })
  @ApiResponse({ status: 201, description: 'Sign up successful' })
  @ApiResponse({ status: 400, description: 'Bad entries' })
  @ApiResponse({ status: 429, description: 'Too may requests' })
  async signup(@Body() signupDto: SignupDto) {
    return { data: await this.authService.create(signupDto) };
  }

  /** Route: Log in a user
   *
   * @param loginDto
   * @returns access_token
   */
  @RateLimit({
    keyPrefix: 'signIn',
    points: 3,
  })
  @HttpCode(200)
  @Post('/login')
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 429, description: 'Too may requests' })
  async login(@Body() loginDto: LoginDto) {
    return { data: await this.authService.login(loginDto) };
  }
}
