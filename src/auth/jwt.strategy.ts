import { JwtPayload } from './../shared/interfaces/payload.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import env from '../env';
import { User } from './entities/auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET,
    });
  }

  /** Validate payload
   * @param payload user payload
   * @returns Promise<User>
   */
  async validate(payload: JwtPayload): Promise<User> {
    return await this.authService.validateUser(payload);
  }
}
