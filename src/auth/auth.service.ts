import { LogInDto } from './dto/login.dto';
import { JwtPayload } from './../shared/interfaces/payload.interface';
import { User } from './entities/auth.entity';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /** Service: Create a user
   *
   * @param signupDto
   * @returns access_token
   */
  async create(signupDto: SignUpDto) {
    const user = await this.findOne({
      where: { email: signupDto.email },
    });
    if (user) throw new ConflictException('User already exists');
    const hash = await bcrypt.hash(signupDto.password, 10);
    let newUser = new User();
    newUser = { ...newUser, ...signupDto, password: hash };
    await this.userRepo.save(newUser);
    delete newUser.password;
    const access_token = this.jwtService.sign({ ...newUser });
    return { access_token };
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
  async login({ email, password }: LogInDto) {
    const user = await this.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
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
}
