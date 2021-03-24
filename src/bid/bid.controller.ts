import { CreateBidDto } from './dto/create-bid.dto';
import {
  Body,
  Controller,
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
@Controller('/houses/:houseId/bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  /** Route: Create a bid
   * @param createDto Bid details
   * @param user
   * @param houseId
   * @returns Promise<Bid>
   */
  @Post()
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
  @Get()
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
  @Get('/:bidId')
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
  @Patch('/:bidId/approve')
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
  @Patch('/:bidId/reject')
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
}
