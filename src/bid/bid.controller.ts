import { CreateBidDto } from './dto/create-bid.dto';
import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
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
  @ApiResponse({ status: 400, description: 'Wrong entries' })
  async create(
    @Body() createDto: CreateBidDto,
    @User() user: JwtPayload,
    @Param('houseId', ParseUUIDPipe)
    houseId: string,
  ) {
    return { data: await this.bidService.createBid(createDto, user, houseId) };
  }
}
