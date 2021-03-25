import { CreateBidDto } from './dto/create-bid.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BidService } from './bid.service';
import { User } from '../shared/decorators/user.decorator';
import { JwtPayload } from '../shared/interfaces/payload.interface';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('Bids')
@Controller('/bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  /** Route: Create a bid
   * @param createDto Bid details
   * @param user
   * @param houseId
   * @returns Promise<Bid>
   */
  @Post('/house/:houseId')
  @ApiResponse({ status: 201, description: 'Bid created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Wrong entries' })
  async create(
    @Body() createDto: CreateBidDto,
    @User() user: JwtPayload,
    @Param('houseId', ParseUUIDPipe)
    houseId: string,
  ) {
    return { data: await this.bidService.createBid(createDto, user, houseId) };
  }
  /** Route: Get all bids on a house
   * @param user
   * @param houseId
   * @returns Promise<Bid[]>
   */
  @Get('/house/:houseId')
  @ApiResponse({ status: 200, description: 'All Bids retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getBids(
    @User() user: JwtPayload,
    @Param('houseId', ParseUUIDPipe)
    houseId: string,
  ) {
    return { data: await this.bidService.getAll(user, houseId) };
  }

  /** Route: Get a single bid on a house
   * @param user
   * @param houseId
   * @param bidId
   * @returns Promise<Bid>
   */
  @Get('/house/:houseId/:bidId')
  @ApiResponse({ status: 200, description: 'Bid retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getBid(
    @User() user: JwtPayload,
    @Param('houseId', ParseUUIDPipe)
    houseId: string,
    @Param('bidId', ParseUUIDPipe)
    bidId: string,
  ) {
    return { data: await this.bidService.getOne(user, houseId, bidId) };
  }
  /** Route: Approve a single bid on a house
   * @param user
   * @param houseId
   * @param bidId
   * @returns success
   */
  @Patch('/house/:houseId/:bidId/approve')
  @ApiResponse({ status: 200, description: 'Bid approved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async approveBid(
    @User() user: JwtPayload,
    @Param('houseId', ParseUUIDPipe)
    houseId: string,
    @Param('bidId', ParseUUIDPipe)
    bidId: string,
  ) {
    return { data: await this.bidService.approve(user, houseId, bidId) };
  }
  /** Route: Reject a single bid on a house
   * @param user
   * @param houseId
   * @param bidId
   * @returns success
   */
  @Patch('/house/:houseId/:bidId/reject')
  @ApiResponse({ status: 200, description: 'Bid rejected' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async rejectBid(
    @User() user: JwtPayload,
    @Param('houseId', ParseUUIDPipe)
    houseId: string,
    @Param('bidId', ParseUUIDPipe)
    bidId: string,
  ) {
    return { data: await this.bidService.reject(user, houseId, bidId) };
  }

  /** Route: Get all bids by a user
   * @param user
   * @returns Promise<Bid[]>
   */
  @Get('/user')
  @ApiResponse({ status: 200, description: 'All Bids retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserBids(@User() user: JwtPayload) {
    return { data: await this.bidService.getUserBids(user) };
  }

  /** Route: Get a single bid by a user
   * @param user
   * @param bidId
   * @returns Promise<Bid>
   */
  @Get('/user/bids/:bidId')
  @ApiResponse({ status: 200, description: 'Bid retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserBid(
    @User() user: JwtPayload,
    @Param('bidId', ParseUUIDPipe)
    bidId: string,
  ) {
    return { data: await this.bidService.getUserBid(user, bidId) };
  }

  /** Route: Cancel a bid
   * @param user
   * @param bidId
   * @returns success
   */
  @Delete('/user/bids/:bidId')
  @ApiResponse({ status: 200, description: 'Bid retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async cancelBid(
    @User() user: JwtPayload,
    @Param('bidId', ParseUUIDPipe)
    bidId: string,
  ) {
    return { data: await this.bidService.deleteUserBid(user, bidId) };
  }
}
