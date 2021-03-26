import { Bid } from './entities/bid.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBidDto } from './dto/create-bid.dto';
import { HouseService } from '../house/house.service';
import {
  sendNewBidEmail,
  sendApprovedEmail,
  sendRejectedEmail,
} from '../config/email.config';

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
    const house = await this.houseService.findOne({
      where: { id: houseId },
      relations: ['owner'],
    });
    let newBid = new Bid();
    newBid = { ...newBid, ...createDto, bidder: user, house };
    await this.bidRepo.save(newBid);
    await sendNewBidEmail(house.owner.email, 'new_bid', {
      name: house.owner.firstName,
      date: house.createdAt.toDateString(),
    });
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
      where: [
        { house, status: 'PENDING' },
        { house, status: 'APPROVED' },
      ],
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
      where: [
        { house, status: 'PENDING' },
        { house, status: 'APPROVED' },
      ],
      relations: ['bidder'],
    });
    delete bid.bidder.password;
    return bid;
  }

  /** Service: Approve one bid on the house
   * @param user
   * @param houseId
   * @param bidId
   * @returns success
   */
  async approve(user: any, houseId: string, bidId: string) {
    const house = await this.houseService.findOne({
      where: { owner: user, id: houseId },
    });
    const bid = await this.findOne({
      where: [{ id: bidId, house, status: 'PENDING' }],
      relations: ['bidder'],
    });
    bid.status = 'APPROVED';
    await this.bidRepo.save(bid);
    await this.houseService.updateTakenHouse(houseId);
    (
      await this.find({
        where: { house, status: 'PENDING' },
      })
    ).forEach(async (b) => {
      if (b) b.status = 'REJECTED';
      await this.bidRepo.save(b);
    });
    const result = await sendApprovedEmail(bid.bidder.email, 'approved_bid', {
      name: bid.bidder.firstName,
      date: bid.createdAt.toDateString(),
    });
    return { status: bid.status, email: result === 200 ? 'Sent' : 'Not sent' };
  }
  /** Service: Reject one bid on the house
   * @param user
   * @param houseId
   * @param bidId
   * @returns success
   */
  async reject(user: any, houseId: string, bidId: string) {
    const house = await this.houseService.findOne({
      where: { owner: user, id: houseId },
    });
    const bid = await this.findOne({
      where: { id: bidId, house, status: 'PENDING' },
      relations: ['bidder'],
    });
    bid.status = 'REJECTED';
    await this.bidRepo.save(bid);
    const result = await sendRejectedEmail(bid.bidder.email, 'rejected_bid', {
      name: bid.bidder.firstName,
      date: bid.createdAt.toDateString(),
    });
    return { status: bid.status, email: result === 200 ? 'Sent' : 'Not sent' };
  }

  /** Find bids
   *
   * @param options
   * @returns Promise<Bid[]>
   */
  async find(options: any) {
    const bids = await this.bidRepo.find(options);
    return bids;
  }

  /** Find one bid
   *
   * @param options
   * @returns Promise<Bid>
   */
  async findOne(options: any) {
    const bid = await this.bidRepo.findOne(options);
    if (!bid)
      throw new NotFoundException(
        'Sorry, That bid is not available. Kindly try with another',
      );
    return bid;
  }

  /** Delete bid
   *
   * @param options
   * @returns Promise<'Bid deleted'>
   */
  async delete(options: any) {
    const bid = await this.findOne(options);
    await this.bidRepo.delete(bid.id);
    return 'Bid deleted';
  }

  /** Service: Get all bids of a user
   * @param user
   * @returns Promise<Bid[]>
   */
  async getUserBids(user: any) {
    const bids = await this.find({
      where: { bidder: user },
      relations: ['house'],
    });
    return bids;
  }
  /** Service: Get one bid of a user
   * @param user
   * @param bidId
   * @returns Promise<Bid>
   */
  async getUserBid(user: any, bidId: string) {
    const bid = await this.findOne({
      where: { id: bidId, bidder: user },
      relations: ['house'],
    });
    return bid;
  }

  /** Service: Delete a bid
   * @param user
   * @param bidId
   * @returns Promise<Bid>
   */
  async deleteUserBid(user: any, bidId: string) {
    await this.delete({
      where: { id: bidId, status: 'PENDING', bidder: user },
    });
    return 'Bid cancelled';
  }
}
