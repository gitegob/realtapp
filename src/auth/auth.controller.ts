import { LoginDto } from './dto/login.dto';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  ParseUUIDPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { User } from '../shared/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../shared/interfaces/payload.interface';

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

  /** Route: Get all bids by a user
   * @param user
   * @returns Promise<Bid[]>
   */
  @Get('/bids')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'All Bids retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getBids(@User() user: JwtPayload) {
    return { data: await this.authService.getUserBids(user) };
  }

  /** Route: Get a single bid by a user
   * @param user
   * @param bidId
   * @returns Promise<Bid>
   */
  @Get('/bids/:bidId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'Bid retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getBid(
    @User() user: JwtPayload,
    @Param('bidId', ParseUUIDPipe)
    bidId: string,
  ) {
    return { data: await this.authService.getUserBid(user, bidId) };
  }
  /** Route: Cancel a bid
   * @param user
   * @param bidId
   * @returns success
   */
  @Delete('/bids/:bidId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'Bid retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async cancelBid(
    @User() user: JwtPayload,
    @Param('bidId', ParseUUIDPipe)
    bidId: string,
  ) {
    return { data: await this.authService.deleteUserBid(user, bidId) };
  }
}
