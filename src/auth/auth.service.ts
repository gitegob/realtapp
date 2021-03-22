import { JwtPayload } from './../shared/interfaces/payload.interface';
import { User } from './entities/auth.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

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
    return newUser;
  }
  async findOne(options: any) {
    return await this.userRepo.findOne(options);
  }
  validateUser(payload: JwtPayload) {
    return null;
  }
}
