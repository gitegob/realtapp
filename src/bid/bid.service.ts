import { Bid } from './entities/bid.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBidDto } from './dto/create-bid.dto';
import { JwtPayload } from '../shared/interfaces/payload.interface';
import { HouseService } from '../house/house.service';
import { realpathSync } from 'node:fs';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidRepo: Repository<Bid>,
    private readonly houseService: HouseService,
  ) {}

  /** Service: Create a bid
   *
   * @param createDto
   * @param user
   * @param houseId
   * @returns Promise<Bid>
   */
  async createBid(createDto: CreateBidDto, user: any, houseId: string) {
    const house = await this.houseService.findOne(houseId);
    let newBid = new Bid();
    newBid = { ...newBid, ...createDto, bidder: user, house };
    await this.bidRepo.save(newBid);
    return newBid;
  }
  /** Service: Get all bids on a house
   * @param user
   * @param houseId
   * @returns Promise<Bid[]>
   */
  async getAll(user: any, houseId: string) {
    const house = await this.houseService.findOne({
      where: { owner: user, id: houseId },
    });
    const bids = await this.bidRepo.find({
      where: { house },
      relations: ['bidder'],
    });
    return bids.map((bid) => {
      delete bid.bidder.password;
      return bid;
    });
  }
  /** Service: Get one bid on the house
   * @param user
   * @param houseId
   * @param bidId
   * @returns Promise<Bid>
   */
  async getOne(user: any, houseId: string, bidId: string) {
    const house = await this.houseService.findOne({
      where: { owner: user, id: houseId },
    });
    const bid = await this.bidRepo.findOne({
      where: { id: bidId, house },
      relations: ['bidder'],
    });
    delete bid.bidder.password;
    return bid;
  }

  async find(options: any) {
    const bids = await this.bidRepo.find(options);
    return bids;
  }
  async findOne(options: any) {
    const bid = await this.bidRepo.findOne(options);
    if (!bid)
      throw new NotFoundException(
        'Sorry, That bid is not here. Kindly try with another',
      );
    return bid;
  }
}
