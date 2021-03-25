import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './../shared/interfaces/payload.interface';
import { User } from './entities/auth.entity';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BidService } from '../bid/bid.service';
import env from '../env';
import { sendEmail } from '../config/email.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly bidService: BidService,
  ) {}

  /** Service: Create a user
   *
   * @param signupDto
   * @returns access_token
   */
  async create(signupDto: SignupDto) {
    const user = await this.findOne({
      where: { email: signupDto.email },
    });
    if (user) throw new ConflictException('User already exists');
    const hash = await bcrypt.hash(signupDto.password, 10);
    let newUser = new User();
    newUser = { ...newUser, ...signupDto, password: hash };
    await this.userRepo.save(newUser);
    delete newUser.password;
    const token = this.jwtService.sign({ ...newUser });
    const verification_link = `${env.SERVER_URL}/api/auth/verify/${token}`;
    let sent: number;
    if (env.NODE_ENV === 'production') {
      sent = await sendEmail(newUser.email, 'verification', {
        name: newUser.firstName,
        verification_link,
      });
      if (sent === 200)
        return "We just sent you a verification email. Check your inbox or spam if you can't find it.";
      if (sent === 500)
        return "We couldn't send you a verification email. Please try that again.";
    } else {
      return verification_link;
    }
  }

  /** Find a single user
   *
   * @param options
   * @returns
   */
  async findOne(options: any) {
    return await this.userRepo.findOne(options);
  }

  /** Service: Find and login a user
   *
   * @param loginDto
   * @returns access_token
   */
  async login({ email, password }: LoginDto) {
    const user = await this.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.verified)
      throw new UnauthorizedException('Please verify your email');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    delete user.password;
    const access_token = this.jwtService.sign(
      { ...user },
      { expiresIn: '800s' },
    );
    return { access_token };
  }

  async confirmUser(token: string) {
    const payload = this.jwtService.verify(token);
    if (!payload) throw new UnauthorizedException('Unauthorized');
    const user = await this.userRepo.findOne({
      where: { email: payload.email },
    });
    if (!user) throw new UnauthorizedException('Unauthorized');
    user.verified = true;
    await this.userRepo.save(user);
    delete user.password;
    const access_token = this.jwtService.sign({ ...user });
    return { access_token };
  }
  /** Service: Find and validate a user by email
   *
   * @param payload
   * @returns Promise<User>
   */
  async validateUser(payload: JwtPayload) {
    const user = await this.findOne({
      where: { email: payload.email },
    });
    if (!user) throw new UnauthorizedException('Invalid token');
    delete user.password;
    return user;
  }

  /** Service: Get all bids of a user
   * @param user
   * @returns Promise<Bid[]>
   */
  async getUserBids(user: any) {
    const bids = await this.bidService.find({
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
    const bid = await this.bidService.findOne({
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
    await this.bidService.delete({
      where: { id: bidId, status: 'PENDING', bidder: user },
    });
    return 'Bid cancelled';
  }
}
